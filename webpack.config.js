const isDev = process.env.NODE_ENV === 'development'
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    './public/scss/index.scss',
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
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { // setup to watch our SCSS files
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader",
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./public/style.css')
  ]
}
