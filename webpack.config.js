const isDev = process.env.NODE_ENV === 'development'
const path = require('path')

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, '/public'),
    /*
      Filename and path, if within filename string below. is relative to the
      outputPath (defaults to / or root of the site) when using
      webpack-dev-server.
     */
     filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: { // Settings related to webpack-dev-server
    contentBase: path.join(__dirname, '/public'), // Serve your static files from here
    watchContentBase: true, // Refresh browser if static files change
    proxy: [ // allows redirect of requests to webpack-dev-server to another destination
      {
        context: ['/api', '/auth', '/socket.io'],  // can have multiple, can use wild cards
        target: 'http://localhost:8080', //server and port to redirect to
        secure: false,
      },
    ],
    /*
      ****************    Important     ***********
      when using the webpack-dev-server, you want to connect to it's port not
      the nodemon's port.
    */
    port: 3000, // port webpack-dev-server listens to, defaults to 8080
    overlay: { // Shows a full-screen overlay in the browser when there are compiler errors or warnings
      warnings: false, // defaults to false
      errors: true, // defaults to false
    },
  },
}
