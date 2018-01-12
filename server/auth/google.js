const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {

  console.log('Google client ID / secret not found. Skipping Google OAuth.')

} else {

  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }

  // when google sends ut he user (and everything is ok), we get tocken, refreshtocken and profile
  const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
    const googleId = profile.id
    const name = profile.displayName
    const email = profile.emails[0].value

    User.find({where: {googleId}})
      .then(foundUser => (foundUser
        ? done(null, foundUser)
        : User.create({name, email, googleId})
          .then(createdUser => done(null, createdUser))
      ))
      .catch(done)
  })

  passport.use(strategy)

  //Passport: when someone gones to this route, I wkl send them to google to authenticate
  router.get('/', passport.authenticate('google', {scope: 'email'}))

  //Passport: oh hey i see you back from google.  I am going to check with google to make sure you did indeed log in ok.
  // this call back route is set in the google api
  router.get('/callback', passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }))

}
