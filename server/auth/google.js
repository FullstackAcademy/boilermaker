const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../db/models/user');

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
};

const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;

  User.find({ where: { googleId } })
    .then(user => user ?
      done(null, user) :
      User.create({ name, email, googleId })
        .then(user => done(null, user))
    )
    .catch(done);
});

passport.use(strategy);

module.exports = router
  .get('/', passport.authenticate('google', { scope: 'email' }))
  .get('/callback', passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }));
