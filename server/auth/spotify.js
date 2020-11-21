const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy
const {User} = require('../db/models')
module.exports = router

// console.log(process.env)

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.log('Spotify client ID / secret not found. Skipping Spotify OAuth.')
} else {
  console.log(process.env.REDIRECT_URI)
  const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI
  }

  const strategy = new SpotifyStrategy(
    spotifyConfig,
    (accessToken, refreshToken, expires_in, profile, done) => {
      User.findOrCreate({
        defaults: {
          email: profile._json.email
        },
        where: {spotifyId: profile.id}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('spotify', {
      scope: ['user-read-email', 'user-read-private']
    }),
    (req, res) => {
      // The request will be redirected to spotify for authentication, so this
      // function will not be called.
    }
  )

  router.get(
    '/callback',
    passport.authenticate('spotify', {failureRedirect: '/login'}),
    (req, res) => {
      console.log(res)
      try {
        // Successful authentication, redirect home.
        res.redirect('/home')
      } catch (error) {
        console.log(error)
      }
    }
  )
}
