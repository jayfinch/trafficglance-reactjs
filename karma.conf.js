var webpackConfig = require('./webpack.config')
webpackConfig.devtool = 'inline-source-map'

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      'tests.webpack.js'
    ],
    frameworks: ['chai', 'mocha'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  })
}
