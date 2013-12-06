/*----------------------------------------------------
 * Module Setting
 *-----------------------------------------------------*/
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
          files: ['src/js/*.js'],  
          // configure JSHint (documented at http://www.jshint.com/docs/)  
          options: {  
              // more options here if you want to override JSHint defaults  
            globals: {  
              jQuery: true,  
              console: true,  
              module: true  
            }  
          }  
        },        
        // Task htmlmin
        htmlmin: {      
            dist: {
                options: {
                    removeComments: true,       //去注析
                    collapseWhitespace: true    //去换行
                },
                files: { // Dictionary of files
                    'dist/index.html': ['src/index.html']
                }
            }
        },

        // Task jsmin
        uglify: {
            options: {
                report: 'gzip',
                mangle: true, // Specify mangle: false to prevent changes to your variable and function names.
                banner: '/** \n' +
                        ' * @name: <%= pkg.name%>  \n' +
                        ' * @author: <%= pkg.author%> \n' +
                        ' * @time: <%= grunt.template.today("yyyy-mm-dd") %> \n' +
                        ' */ \n\n'
            },
            build: {
                files: {
                    'dist/js/index.js': ['src/js/index.js']
                }
            }
        },

        // Task cssmin
        cssmin: {
            /*
            compress: {
                files: {
                  'assets/all.min.css': ['css/a.css', 'css/b.css']
                }
            }, */
            
            /*
            smeite: {
                files: {
                    'assets/smeite.all.css': ['/play21/smeite.com/public/assets/css/**.css']
                }
            },*/
            with_banner: {         
                options: {
                    report: 'gzip',
                    banner: '/** \n' +
                            ' * @name: <%= pkg.name%>  \n' +
                            ' * @author: <%= pkg.author%> \n' +
                            ' * @time: <%= grunt.template.today("yyyy-mm-dd") %> \n' +
                            ' */ \n\n'
                },
                files: {
                    'dist/css/style.css': ['src/css/style.css']
                }
            }
        }
    });

    // Load the plugin HTML/CSS/JS/IMG min
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    // Build task(s).
    //grunt.registerTask('build', ['htmlmin', 'uglify', 'cssmin', 'imagemin']);
    grunt.registerTask('build', ['jshint', 'htmlmin', 'uglify', 'cssmin']);
};