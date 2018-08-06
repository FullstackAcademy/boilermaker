const ws = new WebSocket('ws://localhost:40510');

// event emmited when connected
ws.onopen = function () {
    console.log('websocket is connected ...')
    // sending a send event to websocket server
    ws.send('connected')
}
// event emmited when receiving message
ws.onmessage = function (ev) {
    console.log(ev);
}

export default ws
