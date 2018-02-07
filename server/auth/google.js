const passport = require('passport')
const Sequelize = require('sequelize')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { User } = require('../db/models')
const { generateUserName, randomNames } = require('./utils/generateUserName');
module.exports = router

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {

  console.log('Google client ID / secret not found. Skipping Google OAuth.')

} else {

  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }

  const redirect = {};

  const userName = generateUserName(randomNames);

  const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;
    const photoURL = profile.photos[0].value;

    User.find({
      where: {
        [Sequelize.Op.or]: [{ googleId }, { email }]
      }
    })
      .then(foundUser => {
        if (foundUser) {
          redirect['successRedirect'] = '/'
          redirect['failureRedirect'] = '/login'
          done(null, foundUser);
        } else {
          return User.create({ name, email, googleId, photoURL, userName })
            .then(createdUser => {
              redirect['successRedirect'] = `/users/${createdUser.id}`
              redirect['failureRedirect'] = '/login'
              done(null, createdUser);
            })
        }
      })
      .catch(done)
  })

  passport.use(strategy)

  router.get('/', passport.authenticate('google', { scope: 'email' }))

  router.get('/callback', passport.authenticate('google', redirect))
}