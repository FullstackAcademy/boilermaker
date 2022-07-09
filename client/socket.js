import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!') // eslint-disable-line no-console
})

export default socket
