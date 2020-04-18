const pathLib = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    chunkFilename: '[name].bundle.js',
    filename: 'bundle.js',
    path: pathLib.join(__dirname, 'public'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'cheap-module-eval-source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: pathLib.resolve(__dirname, 'client'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
