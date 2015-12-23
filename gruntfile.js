//wrapper function
module.exports = function (grunt) {

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            release: ["dist"]
        },
        copy: {
            externalresources : {
                files: [{
                    src: 'node_modules/jquery/dist/jquery.js',
                    dest: 'src/external-resources/scripts/jquery.js'
                }, {
                    src : 'node_modules/bootstrap/dist/js/bootstrap.js',
                    dest: 'src/external-resources/scripts/bootstrap.js'
                },{
                    src: 'node_modules/bootstrap/dist/css/bootstrap.css',
                    dest: 'src/external-resources/css/bootstrap.css'
                }]
            },
            release: {
                    src: 'src/index.html',
                    dest: 'dist/index.html'
            }
        },
        cssmin: {
            sitecss: {
                options: {
                    banner: '/* My minified css file */'
                },
                files: {
                    'dist/css/site.min.css': [  
                        'node_modules/bootstrap/dist/css/bootstrap.min.css'
                    ]
                }
            }
        },
        uglify: {
            options: {
                compress: true
            },
            applib: {
                src: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/bootstrap/dist/js/bootstrap.min.js'
                ],
                dest: 'dist/js/everything.js'
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['clean:release', 'copy:release', 'uglify', 'cssmin']);
};
