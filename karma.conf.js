var webpackConfig = require('./webpack.config.js')

webpackConfig.module.postLoaders = [
  {
    test: /\.js$/,
    exclude: /(test|node_modules|bower_components)\//,
    loader: 'istanbul-instrumenter'
  }
]

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
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
      'karma-coverage',
      'karma-threshold-reporter'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage', 'threshold'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }
  })
}
