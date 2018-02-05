const passport = require('passport')
const Sequelize = require('sequelize')
const router = require('express').Router()
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../db/models');
const { generateUserName, randomNames } = require('./utils/generateUserName');
module.exports = router;


if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {

  console.log('Facebook client ID / secret not found. Skipping Facebook OAuth.')

} else {

  const facebookConfig = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['id', 'email', 'name', 'photos']
  }

  const redirect = {};

  const userName = generateUserName(randomNames);

  const strategy = new FacebookStrategy(facebookConfig, (token, refreshToken, profile, done) => {
    const facebookId = profile.id;
    const name = profile.name.givenName + ' ' + profile.name.familyName;
    const email = profile.emails[0].value;
    const photoURL = profile.photos[0].value;

    User.find({
      where: {
        [Sequelize.Op.or]: [{ facebookId }, { email }]
      }
    })
      .then(foundUser => {
        if (foundUser) {
          redirect['successRedirect'] = '/'
          redirect['failureRedirect'] = '/login'
          done(null, foundUser);
        } else {
          return User.create({ name, email, facebookId, photoURL, userName })
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

  router.get('/', passport.authenticate('facebook', { scope: 'email' }))

  router.get('/callback', passport.authenticate('facebook', redirect))
}
