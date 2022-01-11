module.exports = function (grunt) {
  process.execArgv = [];

  // Params helper setter
  function setParams(env) {
    let configJson = grunt.file.readJSON('frontend/config/parameterConfig.json');

    configJson.headless = grunt.option('headless') || configJson.headless;

    grunt.config.set('params', configJson);
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'frontend/specs/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    protractor: {
      options: {
        configFile: "frontend/conf.js",
        directConnect: true
      },
      elements: {
        options: {
          configFile: "frontend/conf.js",
          directConnect: true,
          args: {
            suite: "frontend/conf.js",
            params: '<%= params %>'
          }
        }
      },
      login: {
        options: {
          configFile: "frontend/conf.js",
          directConnect: true,
          args: {
            suite: "frontend/conf.js",
            params: '<%= params %>'
          }
        }
      },
      logout: {
        options: {
          configFile: "frontend/conf.js",
          directConnect: true,
          args: {
            suite: "logout",
            params: '<%= params %>'
          }
        }
      },
      signup: {
        options: {
          configFile: "frontend/conf.js",
          directConnect: true,
          args: {
            suite: "signup",
            params: '<%= params %>'
          }
        }
      },
      testFrontend: {
        options: {
          configFile: "frontend/conf.js",
          directConnect: true,
          args: {
            suite: ['homePage', 'download', 'loginPositive', 'loginNegative', 'logout', 'loginElements', 'loginNegative', 'loginPositive', 'signupElements', 'signUpPositive', 'signUpNegative', 'profile', 'detail', 'signupElements'],
            params: '<%= params %>'
          }
        }
      },
      
      testFrontendHeadless: {
        options: {
          configFile: "frontend/conf-headless.js",
          directConnect: true,
          args: {
            suite: ['homePage', 'loginPositive', 'loginNegative', 'logout', 'loginElements', 'loginNegative', 'loginPositive', 'signupElements', 'signUpPositive', 'signUpNegative', 'profile', 'detail', 'signupElements'],
            params: '<%= params %>'
          }
        }
      },

    },

    shell: {
      options: {
        stdout: true
      },
      install: {
        command: 'npm install'
      },
      testBackend: {
        command: 'npm test'
      },
      webdriver_update: {
        command: './node_modules/webdriver-manager/bin/webdriver-manager update'
      }
    },

  });


  /// GRUNT PLUGIN LOAD ///

  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-shell');


  /// SHELL TASKS ///

  grunt.registerTask('install', ['shell:install']);
  grunt.registerTask('update', ['shell:webdriver_update']);


  /// INDIVIDUAL TASKS ///

  grunt.registerTask('default', ['protractor:full']);

  grunt.registerTask('elements', function (env) {
    setParams(env);
    grunt.task.run(['protractor:elements']);
  });

  grunt.registerTask('test', function (env) {
    setParams(env);
      if (grunt.config.data.params.headless == true) {
        console.log("DESKTOP HEADLESS")
        grunt.task.run(['protractor:testFrontendHeadless']);
      } else {
        console.log("DESKTOP")
        grunt.task.run(['protractor:testFrontend']);
      }
  });

  grunt.registerTask('test-headless', function (env) {
    setParams(env);
    grunt.task.run(['protractor:testFrontendHeadless']);
  });
};
