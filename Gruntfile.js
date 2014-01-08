module.exports = function (grunt) {

    var banner = '/*!\n' +
        ' * <%= pkg.name %> v<%= pkg.version %><%= pkg.versionQualifier %> <%= grunt.template.today("yyyy-mm-dd") %> (http://github.com/ivaynberg/pushdown)\n' +
        ' * Copyright 2013 Igor Vaynberg\n' +
        ' * Licensed under http://opensource.org/licenses/MIT\n' +
        ' */\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: banner,
                separator: ';'
            },
            js: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: banner,
                sourceMap: 'dist/<%= pkg.name %>.js.map'
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
                options: {},
                files: {
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
    grunt.registerTask('dev', ['jshint', 'concat', 'uglify', 'stylus', 'connect', 'watch']);
};
