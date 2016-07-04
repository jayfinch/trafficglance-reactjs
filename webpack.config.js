var path = require('path')

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    sourcemapFilename: '[name].bundle.js.map'
  },
  module: {
    loaders: [
      {test: /src\/.+.js$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
}
