const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
module.exports = app

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())

//use ejs renderer in order to pass data html files
app.engine('html', require('ejs').renderFile);

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

const githubURL = process.env.GITHUB_CLIENT_ID ? `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}` : null;

app.get('/', (req, res)=> res.render(path.join(__dirname, '..', 'public/index.html'), { githubURL }));

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
  res.render(path.join(__dirname, '..', 'public/index.html'), { githubURL });
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
