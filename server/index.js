const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db');
const sessionStore = new SequelizeStore({ db });
const windowsMode = false;
const PORT = process.env.PORT || 8080 //|| windowsMode ? 443 : 8080;
const app = express();
const socketio = require('socket.io')
const https = require('https');
const http = require('http');
const fs = require('fs');

const options = {
  key: fs.readFileSync(path.join(__dirname, resolveURL('rtcmulticonnection/fake-keys/key.pem'))),
  cert: fs.readFileSync(path.join(__dirname, resolveURL('rtcmulticonnection/fake-keys/cert.pem')))
};

module.exports = app;
let server;

if(windowsMode && !process.env.HEROKU)server = https.createServer(options,app);
else server = http.createServer(app);

if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
    .then(user => done(null, user))
    .catch(done))

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())

  // session middleware with passport
  app.use(session({
    secret: process.env.SESSION_SECRET || 'my best friend is Cody',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const io = require('socket.io')(server);
const Room = require('./room')(io);

require('./rtcmulticonnection/Signaling-Server.js')(io, function (socket) {
  try {
    var params = socket.handshake.query;

    // "socket" object is totally in your own hands!
    // do whatever you want!

    // in your HTML page, you can access socket as following:
    // connection.socketCustomEvent = 'custom-message';
    // var socket = connection.getSocket();
    // socket.emit(connection.socketCustomEvent, { test: true });

    if (!params.socketCustomEvent) {
      params.socketCustomEvent = 'custom-message';
    }

    socket.on(params.socketCustomEvent, function (message) {
      try {
        socket.broadcast.emit(params.socketCustomEvent, message);
      } catch (e) { }
    });
  } catch (e) { }
  require('./socket')(io,socket,Room);
});

// const startListening = () => {
//   // start listening (and create a 'server' object representing our server)
//   const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))

//   // set up our socket control center
// }

const syncDb = () => db.sync()

function resolveURL(url) {
  var isWin = !!process.platform.match(/^win/);
  if (!isWin) return url;
  return url.replace(/\//g, '\\');
}


// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  sessionStore.sync()
    .then(syncDb)
    .then(createApp)
    .then(server.listen(PORT))
    .then(()=>console.log('starting a new server on '+PORT))
    .catch(console.error)
} else {
  createApp()
}
