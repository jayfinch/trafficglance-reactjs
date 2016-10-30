'use strict'
let path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/index.html' },
      { from: 'src/config-example.json' },
      {
        from: 'src/images',
        to: 'images'
      },
      {
        from: 'src/styles/bootstrap.min.css',
        to: 'styles/bootstrap.min.css'
      }
    ])
  ],
  devtool: 'cheap-source-map',
  module: {
    noParse: ['react'],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}
