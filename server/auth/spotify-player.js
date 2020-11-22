// import axios from 'axios'
// const ApiController = () =>{

//   const _getToken = async () => {
//     const {data} = await axios.post('/')
//   }
// }

//()

const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi()
module.exports = spotifyApi
