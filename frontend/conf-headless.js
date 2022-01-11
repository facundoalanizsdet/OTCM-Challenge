var glob = require("glob"), // path-finder
  path = require('path'),
  failFast = require('protractor-fail-fast'), // fail all tests at first fail
  yamlLoader = require('./helpers/yaml-loader'), // yaml loader
  ptorYml = new yamlLoader('frontend/config/ptor-config.yml'), // protractor test conf.
  Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  // ---------------------------------------------------------------------------
  // ----- How to connect to Browser Drivers -----------------------------------
  // ---------------------------------------------------------------------------
  //
  // Protractor needs to know how to connect to Drivers for the browsers
  // it is testing on. This is usually done through a Selenium Server.
  // There are five options - specify one of the following:
  //
  // 1. seleniumServerJar - to start a standalone Selenium Server locally.
  // 2. seleniumAddress - to connect to a Selenium Server which is already
  //    running.
  // 3. sauceUser/sauceKey - to use remote Selenium Servers via Sauce Labs.
  // 4. browserstackUser/browserstackKey - to use remote Selenium Servers via BrowserStack.
  // 5. directConnect - to connect directly to the browser Drivers.
  //    This option is only available for Firefox and Chrome.
  // seleniumAddress: ,
  // ---------------------------------------------------------------------------
  // ----- To connect directly to Drivers --------------------------------------
  // ---------------------------------------------------------------------------
  // Boolean. If true, Protractor will connect directly to the browser Drivers
  // at the locations specified by chromeDriver and firefoxPath. Only Chrome
  // and Firefox are supported for direct connect.

  directConnect: ptorYml.browser.directConnect,

  seleniumAddress: ptorYml.browser.seleniumAddress,

  seleniumServerJar: glob.sync(ptorYml.browser.seleniumServerJarPath)[0],

  chromeDriver: glob.sync(ptorYml.browser.chromeDriverPath)[0],

  // Path to the firefox application binary. If null, will attempt to find
  // firefox in the default locations.
  firefoxPath: ptorYml.browser.firefoxPath,

  // ---------------------------------------------------------------------------
  // ----- How to set up browsers ----------------------------------------------
  // ---------------------------------------------------------------------------
  //
  // Protractor can launch your tests on one or more browsers. If you are
  // testing on a single browser, use the capabilities option. If you are
  // testing on multiple browsers, use the multiCapabilities array.

  // For a list of available capabilities, see
  // https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
  //
  // In addition, you may specify count, shardTestFiles, and maxInstances.

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      prefs: {
            'download': {
            'directory_upgrade': true,
            'prompt_for_download': false,
            'default_directory': 'frontend/downloads/'
            }
        },
      args: [ "--headless", "--disable-gpu", "--window-size=800,600"] 
    }
  },

  // ---------------------------------------------------------------------------
  // ----- What tests to run ---------------------------------------------------
  // ---------------------------------------------------------------------------
  // Use default globals: 'protractor', 'browser', '$', '$$', 'element', 'by'.
  // These also exist as properties of the protractor namespace:
  // 'protractor.browser', 'protractor.$', 'protractor.$$', 'protractor.element',
  // 'protractor.by', and 'protractor.By'.
  // When no globals is set to true, the only available global variable will be
  // 'protractor'.
  noGlobals: false,

  // Spec patterns are relative to the location of this config.
  specs: [ 'specs/*.js'],

  // If you would like protractor to use a specific suite by default instead of
  // all suites, you can put that in the config file as well.
  suite: 'login',

  suites: {
    all: 'specs/*.js',
    detail: 'specs/detailSpecs.js',
    homePage: 'specs/HomePageSpec.js',
    security: 'specs/SecuritySpec.js',
    loginElements: 'specs/loginElementsSpec.js',
    loginNegative: 'specs/loginSpecNegativeScenarios.js',
    loginPositive: 'specs/loginSpecPositiveScenarios.js',
    logout: 'specs/logoutSpec.js',
    profile: 'specs/profileSpecs.js',
    signupElements: 'specs/signUpElementsSpec.js',
    signUpPositive: 'specs/signUpspecPositiveScenarios.js',
    signUpNegative: 'specs/signUpSpecNegativeScenarios.js',
  },

  // ---------------------------------------------------------------------------
  // ----- Global test information ---------------------------------------------
  // ---------------------------------------------------------------------------
  //
  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be resolved against this URL (via url.resolve)
  //baseUrl: 'http://www.despegar.com',

  // CSS Selector for the element housing the angular app - this defaults to
  // body, but is necessary if ng-app is on a descendant of <body>.
  rootElement: 'body',

  // The timeout in milliseconds for each script run on the browser. This should
  // be longer than the maximum time your application needs to stabilize between
  // tasks.
  allScriptsTimeout: ptorYml.timeouts.allScriptsTimeout,

  // How long to wait for a page to load.
  getPageTimeout: ptorYml.timeouts.getPageTimeout,

  // A callback function called once configs are read but before any environment
  // setup. This will only run once, and before onPrepare.
  // You can specify a file containing code to run by setting beforeLaunch to
  // the filename string.
  beforeLaunch: function() {},

  // At this point, global variable 'protractor' object will NOT be set up,
  // and globals from the test framework will NOT be available. The main
  // purpose of this function should be to bring up test dependencies.
  onPrepare: function() {
    // set angular/non angular testing
    global.isAngularSite = function(flag){
      browser.ignoreSynchronization = !flag;
      browser.waitForAngularEnabled(flag);
    };    

    // set jasmine reporters
    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
        savePath: 'reports/frontend'
    }));

    // Displays formatted jasmine results
    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter(
      {
      displayStacktrace: 'none',      // display stacktrace for each failed assertion, values: (all|specs|summary|none) 
      displaySuccessesSummary: false, // display summary of all successes after execution 
      displayFailuresSummary: true,   // display summary of all failures after execution 
      displayPendingSummary: false,    // display summary of all pending specs after execution 
      displaySuccessfulSpec: true,    // display each successful spec 
      displayFailedSpec: true,        // display each failed spec 
      displayPendingSpec: false,      // display each pending spec 
      displaySpecDuration: false,     // display each spec duration 
      displaySuiteNumber: false,      // display each suite number (hierarchical) 
      colors: {
        success: 'green',
        failure: 'red',
        pending: 'yellow'
      },
      prefixes: {
        success: '✓ ',
        failure: '✗ FAIL! ',
        pending: '* '
      },
      customProcessors: []
      } 
      
))

    // if specific window size is required: use the following command line
    browser.driver.manage().window()
    .setSize(ptorYml.browser.width, ptorYml.browser.height);

  },

  // A callback function called once tests are finished.
  // onComplete can optionally return a promise, which Protractor will wait for
  // before shutting down webdriver.
  onComplete: function(exitCode) {
    browser.ignoreSynchronization = false;
    browser.waitForAngularEnabled(true);
  },

  // A callback function called once the tests have finished running and
  // the WebDriver instance has been shut down. It is passed the exit code
  // (0 if the tests passed). This is called once per capability.
  onCleanUp: function(exitCode) {},

  // A callback function called once all tests have finished running and
  // the WebDriver instance has been shut down. It is passed the exit code
  // (0 if the tests passed). afterLaunch must return a promise if you want
  // asynchronous code to be executed before the program exits.
  // This is called only once before the program exits (after onCleanUp).
  afterLaunch: function(exitCode) {},

  // If set, protractor will save the test output in json format at this path.
  // The path is relative to the location of this config.
  resultJsonOutputFile: null,

  // If true, protractor will restart the browser between each test.
  // CAUTION: This will cause your tests to slow down drastically.
  restartBrowserBetweenTests: false,

  // Protractor will track outstanding $timeouts by default, and report them in
  // the error message if Protractor fails to synchronize with Angular in time.
  // In order to do this Protractor needs to decorate $timeout.
  // CAUTION: If your app decorates $timeout, you must turn on this flag. This
  // is false by default.
  untrackOutstandingTimeouts: true,


  // ---------------------------------------------------------------------------
  // ----- The test framework --------------------------------------------------
  // ---------------------------------------------------------------------------

  // Test framework to use. This may be one of:
  // jasmine, mocha or custom.
  //
  // When the framework is set to "custom" you'll need to additionally
  // set frameworkPath with the path relative to the config file or absolute
  //  framework: 'custom',
  //  frameworkPath: './frameworks/my_custom_jasmine.js',
  // See github.com/angular/protractor/blob/master/lib/frameworks/README.md
  // to comply with the interface details of your custom implementation.
  //
  // Jasmine is fully supported as test and assertion frameworks.
  // Mocha has limited support. You will need to include your
  // own assertion framework (such as Chai) if working with Mocha.
  framework: ptorYml.framework,

  // Options to be passed to jasmine.
  //
  // See https://github.com/jasmine/jasmine-npm/blob/master/lib/jasmine.js
  // for the exact options available.
  jasmineNodeOpts: {
    print: function () {},
    showColors: true,
    defaultTimeoutInterval: ptorYml.timeouts.defaultTimeoutInterval,
    isVerbose: true
  },

  // See docs/plugins.md
  plugins: [],

  // Turns off WebDriver's environment variables overrides to ignore any
  // environment variable and to only use the configuration in this file.
  // Defaults to `false`
  disableEnvironmentOverrides: false,


};
