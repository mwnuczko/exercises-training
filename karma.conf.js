const path = require('path');

const webpackConfig = {
  devtool: 'inline-source-map',
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      { enforce: "pre", test: /\.(js|ts)$/, loader: "source-map-loader" }
    ]
  }
};

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jasmine'
    ],

    mime: {
      'text/x-typescript': ['ts','tsx']
    },

    // list of files / patterns to load in the browser
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'src/root.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    preprocessors: {
      'src/root.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],

    // (!) IMPORTANT
    // uncomment the following, not print information about skipped tests:
    //
    specReporter: {
    //   suppressErrorSummary: false,  // do not print error summary 
    //   suppressFailed: false,  // do not print information about failed tests 
    //   suppressPassed: true,  // do not print information about passed tests 
      suppressSkipped: true,  // do not print information about skipped tests 
    //   showSpecTiming: false  // print the time elapsed for each spec 
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    browserConsoleLogOptions: {
      level: 'log',
      terminal: true
    },

    // (!) IMPORTANT
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      // 'Chrome',
      'ChromeHeadless',
      // 'Firefox',
      // 'IE',
      // 'PhantomJS'
    ],

    //==========================================
    // in case you want to use PhantomJS:
    // 1. uncomment PhantomJS above
    // 2. add following dependencies to package.json and make sure you install them:
    // "karma-phantomjs-launcher": "^1.0.4",
    //==========================================

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
