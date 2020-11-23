const spotifyApi = require('../auth/spotify-player')
const router = require('express').Router()
const {User} = require('../db/models')
const axios = require('axios')

// The base address of Web API is https://api.spotify.com.

router.get('/', async (req, res, next) => {
  try {
    console.log('and the id? ', req.user.id)
    const user = await User.findByPk(req.user.id)

    spotifyApi.setCredentials({
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    })

    const devices = await axios.get(
      'https://api.spotify.com/v1/me/player/devices',
      {
        headers: {
          Authorization: 'Bearer ' + user.accessToken
        }
      }
    )
    console.log('did we get through', devices.data)
    const device = devices.data.devices.filter(item => item.is_active)
    const result = await spotifyApi.refreshAccessToken()
    spotifyApi.setAccessToken(result.body.access_token)

    res.json(device)
  } catch (error) {
    next(error)
  }
})

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

// GET https://api.spotify.com/v1/search

router.get('/search/:value', async (req, res, next) => {
  try {
    const searchValue = `meditation ${req.params.value}`
    const playlists = await spotifyApi.searchPlaylists(searchValue, {
      limit: 20,
      offset: 0
    })
    const result = await spotifyApi.refreshAccessToken()
    spotifyApi.setAccessToken(result.body.access_token)
    const num = Math.floor(Math.random() * 20)
    const returnValue = playlists.body.playlists.items[num]
    res.json(returnValue)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    // console.log('device', device)
    await spotifyApi.play(req.body)
    const result = await spotifyApi.refreshAccessToken()
    spotifyApi.setAccessToken(result.body.access_token)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router
