const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.log('Spotify client ID / secret not found. Skipping Spotify OAuth.')
} else {
  const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI
  }

  const strategy = new SpotifyStrategy(
    spotifyConfig,
    (accessToken, refreshToken, expires_in, profile, done) => {
      User.findOrCreate(
        {
          email: profile.email,
          spotifyId: profile.id
        },
        function(err, user) {
          return done(err, user)
        }
      )
    }
  )

  passport.use(strategy)

  router.get(
    '/spotify',
    passport.authenticate('spotify', {
      scope: ['user-read-email', 'user-read-private'],
      showDialog: true
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
      // Successful authentication, redirect home.
      res.redirect('/')
    }
  )
}
