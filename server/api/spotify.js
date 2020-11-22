const spotifyApi = require('../auth/spotify-player')
const router = require('express').Router()
const {User} = require('../db/models')

// The base address of Web API is https://api.spotify.com.

router.get('/playlists/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        spotifyId: req.params.id
      }
    })
    spotifyApi.setCredentials({
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    })
    const {body} = await spotifyApi.getUserPlaylists(user.spotifyId)
    const result = await spotifyApi.refreshAccessToken()
    spotifyApi.setAccessToken(result.body.access_token)

    res.json(body.items)
  } catch (error) {
    next(error)
  }
})

module.exports = router
