module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            js: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    window: true
                }
            }
        },
        stylus: {
            compile: {
                options: {
                    define: {
                        DEBUG: true}
                    //paths: ['path/to/import', 'another/to/import'],
                    //urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
                    //use: [
                    //    require('fluidity') // use stylus plugin at compile time
                    //]
                    //,
                    //import: [      //  @import 'foo', 'bar/moo', etc. into every .styl file
                    //    'foo',       //  that is compiled. These might be findable based on values you gave
                    //    'bar/moo'    //  to `paths`, or a plugin you added under `use`
                    //]
                },
                files: {
                    //'path/to/result.css': 'path/to/source.styl', // 1:1 compile
                    'dist/pushdown.css': ['src/**/*.styl']
                }
            }
        },
        watch: {
            files: ['src/**/*'],
            tasks: ['jshint', 'concat', 'uglify', 'stylus']
        },
        connect: {
            server: {
                options: {
                    port: 8282,
                    base: '.'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-stylus');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'stylus']);
    grunt.registerTask('dev', ['connect', 'watch']);
};
