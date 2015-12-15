//wrapper function
module.exports = function (grunt) {
    
    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Project configuration.  
    grunt.initConfig({  
        pkg: grunt.file.readJSON('package.json'),  
        copy: {
            externalresources : {
                files: [{
                    src: 'node_modules/jquery/dist/jquery.min.js',
                    dest: 'src/external-resources/scripts/jquery.min.js'
                }, {
                    src : 'node_modules/bootstrap/dist/js/bootstrap.min.js',
                    dest: 'src/external-resources/scripts/bootstrap.min.js'
                },{
                    src: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
                    dest: 'src/external-resources/css/bootstrap.min.css'
                }],           
                dist: {
                    src: 'src/index.html',
                    dest: 'dist/index.html'
                }
            },
        },
        cssmin: {  

        },  
        uglify: {  

        }  
    });  
    
    // Default task.  
    grunt.registerTask('default', ['copy:dist']);  
};
