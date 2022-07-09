module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`) // eslint-disable-line no-console

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`) // eslint-disable-line no-console
    })
  })
}
