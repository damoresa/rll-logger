'use strict';

module.exports = function (config) {
  var webpackConfig = require('./webpack.test.js');
  var _config = {
    autoWatch: false,

    basePath: '',

    browsers: ['PhantomJS'],

    colors: true,

    coverageReporter: {
      dir: './../coverage/',
      includeAllSources: true,
      reporters: [
          { type: 'json', subdir: '.', file: 'coverage.json' },
          { type: 'text-summary' },
          { type: 'cobertura', file: 'coverage.xml' },
          { type: 'html', subdir: '.' },
          { type: 'lcovonly', subdir: '.' }
      ]
    },

    files: [
      { pattern: './karma-test-shim.js', watched: false }
    ],

    frameworks: ['jasmine'],

    logLevel: config.LOG_DEBUG,

    phantomJsLauncher: {
      exitOnResourceError: true
    },

    plugins: [
        'karma-webpack',
        'karma-jasmine',
        'karma-coverage',
        'karma-remap-coverage',
        'karma-remap-istanbul',
        'karma-spec-reporter',
        'karma-sourcemap-loader',
        'karma-phantomjs-launcher',
        'karma-jasmine-html-reporter'
    ],

    port: 9876,

    preprocessors: {
      './karma-test-shim.js': ['coverage', 'webpack', 'sourcemap']
    },

    singleRun: true,

    reporters: ['progress', 'coverage', 'karma-remap-istanbul'],  // 'remap-coverage'

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true  //please don't spam the console when running in karma!
    }
  };

  // Apply configuration
  config.set(_config);
};
