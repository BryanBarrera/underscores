// var fs = require('fs');

// Commands = grunt build//dev - watches all files

module.exports = function(grunt) {

  // A very basic default task.
  // grunt.registerTask('running', 'Log some stuff.', function() {
  //   grunt.log.write('Logging some stuff...').ok();
  // });

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

      // Watch File
      // Watches my sass files and html files inside the root
      // for any changes; then it reloads my document
      watch: {
        options: {
          livereload: true,
        },
        scripts: {
          files: ['js/*.js'],
          tasks: ['jshint', 'uglify'],
        },
        sass: {
          files: ['sass/style.scss', 'sass/**/*.scss '],
          tasks: ['sass:dev']
        },
        // html: {
        //   files: ['*.php'],
        //   tasks: ['htmlbuild:dev']  // Works with htmlbuild:dist
        //   },
        images: {
          files: ['assets/*.{png,jpg,jpeg,gif,svg}'],
          tasks: ['imagemin']
        },
        livereload: {
          files: ['*.html', '*.php', 'assets/images/*.{png,jpg,jpeg,gif,svg}']
        }
      },
      // jsHint File
      // == detects any js errors
      jshint: {
        files: {
          src: ['js/**/*.js', '!js/vendor/require.js', '!js/vendor/jquery-latest.js']
        }
      },
      sass: {
        dev:{
          files:{
            'style.css':'sass/style.scss'
          }
        },
        options: {
          sourceMap:true
        }
      },
      // Uglify
      // == Minifies/packages all js files to my dist folder
      uglify:{
        dev: {
          files: {
            'dev/js/package.min.js': 'js/**/*.js',
            'dev/js/app.js':  'js/app.js',
          }
        }
      },
      // CSSmin
      // == minifies my stylesheets to my dist css folder
      cssmin: {
        dev: {
          files: {
            'dev/css/style.min.css' : 'dev/css/style.css'
          }
        },
        options: {
          sourceMap: true
        }
      },
      scsslint: {
        allFiles: [
          'sass/style.scss'
        ],
        options: {
          bunldeExec: true,
          config: 'node_modules/grunt-scss-lint/config.yml',
          compact:true,
          reporterOutput: 'reports/scsslint/scss-lint-report.xml',
          // colorizeOutput: true
        }
      },
      // HTML Build
      // == Builds out two different versions of my html structure
      // == grunt build//dev & grunt build//dist
      htmlbuild: {
        dev: {
          src: 'index.html',
          dest: 'dev/index.html',
          options: {
            prefix: 'dev/',
            relative: true,
            scripts: {
              'package': 'dev/js/package.js',
            },
            styles: {
              css: 'dev/css/styles.css'
            }
          }

        }
      },
      // Minify Images
      // Optimzes Images
      imagemin: {
            dist: {
              files: [{
                expand: true,
                cwd:  'assets/',
                src: ['**/*.{png,jpg,gif,svg}'],
                dest: 'images/'
              }]
            },
            options: {
              optimizationLevel: 7,
              progressive: true,
              cache: false
          }
      },
      // Connect
      // == Connects me to a server
      connect: {
          dev: {
            options: {
              port:1234,
              hostname:'localhost',
              base:'./dev/',
              // keepalive: true,
              livereload: true,
              open: {
                  target: 'http://localhost:1234'
              }
            }
          }
        }
    });

  // // Compresses images inside the dist folder
  // grunt.registerTask('compressImages', ['newer:imagemin']);

  // grunt.registerTask('watch', ['watch']);

  // removed 'gitadd', 'gitcommit',
  grunt.registerTask('default', ['watch']);

  grunt.registerTask('minimizeimages', ['imagemin']);

  grunt.registerTask('pre-build:dev', ['jshint',  'sass:dev']);
  // compresses files
  grunt.registerTask('compress:dev', ['uglify:dev', 'cssmin:dev']);

  grunt.registerTask('build//dev', [ 'pre-build:dev', 'compress:dev', 'copy:dev', 'htmlbuild:dev', 'connect:dev', 'watchfiles']);


}
