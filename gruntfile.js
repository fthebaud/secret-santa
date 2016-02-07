//wrapper function
module.exports = function(grunt) {

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-replace');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      externalResourcesDebug: ["src/external-resources"],
      release: ['dist/']
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
          src: 'src/index.html',
          dest: 'dist/index.html'
        }, {
          expand: true,
          cwd: 'src/resources/images',
          src: '**',
          dest: 'dist/resources/images'
        }]

      }
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 20
      },
      source: {
        files: [{
          src: [
            'dist/**/*.js',
            'dist/**/*.css',
            'dist/**/*.png'
          ]
        }]
      }
    },
    //useminPrepare will generate the config for concat, uglify and cssmin
    useminPrepare: {
      html: 'src/index.html',
      options: {
        dest: 'dist'
      }
    },
    //usemin will update the path in the html file
    usemin: {
      html: ['dist/index.html']
    },
    //replace will insert a timestamp at the end of the build
    replace: {
      dist: {
        options: {
          patterns: [{
            match: 'timestamp',
            replacement: grunt.template.today('dd/mm/yyyy HH:MM:ss')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: 'dist/index.html',
          dest: 'dist/'
        }]
      }
    }
  });

  //build task. use --verbose for details.
  grunt.registerTask('build', ['clean:release', 'copy:release', 'useminPrepare', 'concat', 'uglify', 'cssmin',
    'filerev', 'usemin', 'replace'
  ]);
};
