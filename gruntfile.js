//wrapper function
module.exports = function(grunt) {

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-processhtml');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      release: ["dist"],
      externalResourcesDebug: ["src/external-resources"]
    },
    copy: {
      externalResourcesDebug: {
        files: [{
          src: 'node_modules/jquery/dist/jquery.js',
          dest: 'src/external-resources/scripts/jquery.js'
        }, {
          src: 'node_modules/bootstrap/dist/js/bootstrap.js',
          dest: 'src/external-resources/scripts/bootstrap.js'
        }, {
          src: 'node_modules/bootstrap/dist/css/bootstrap.css',
          dest: 'src/external-resources/css/bootstrap.css'
        }]
      },
      release: {
        files: [{
          expand: true,
          cwd: 'src/resources/images/',
          src: '*',
          dest: 'dist/resources/images'
        }]
      }
    },
    cssmin: {
      sitecss: {
        files: {
          'dist/resources/css/secretsanta.min.css': [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'src/resources/styles/style-main.css'
          ]
        }
      }
    },
    uglify: {
      options: {
        compress: true,
        banner:'/*!bootstrap + jquery + secretsanta*/'
      },
      applib: {
        src: [
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/bootstrap/dist/js/bootstrap.min.js',
          'src/resources/scripts/app.js'
        ],
        dest: 'dist/resources/js/secretsanta.min.js'
      }
    },
    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['src/index.html']
        }
      }
    }
  });

  //clean the release directory, minify and concat js, minify and concat css, process (update path) and copy html, and finally copy other resources like images
  grunt.registerTask('build', ['clean:release', 'uglify', 'cssmin', 'processhtml', 'copy:release']);
};
