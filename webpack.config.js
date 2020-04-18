const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
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
        include: path.resolve(__dirname, 'client'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
