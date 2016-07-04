var webpackConfig = require('./webpack.config')
webpackConfig.devtool = 'inline-source-map'

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['chai', 'mocha'],
    files: [
      'tests.webpack.js'
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-reporter',
      'karma-coverage'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
      '**/src/*.js': 'coverage'
    },
    reporters: ['mocha', 'coverage'],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  })
}
