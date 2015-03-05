module.exports = function (grunt) {
    grunt.initConfig({
        basepath: 'statics',
        concat: {
            userwebclient: {
                files: {
                    '<%= basepath %>/app/js/userwebclient/built.js': ['fitu/clients/userwebclient/app/js/*.js', 'fitu/clients/userwebclient/app/js/**/*.js']
                }
            },
            vendor: {
                files: {
                    '<%= basepath %>/app/js/vendorwebclient/built.js': ['fitu/clients/vendorwebclient/app/js/*.js', 'fitu/clients/vendorwebclient/app/js/**/*.js']
                }
            },
            admin: {
                files: {
                    '<%= basepath %>/app/js/adminwebclient/built.js': ['fitu/clients/adminwebclient/app/js/*.js', 'fitu/clients/adminwebclient/app/js/**/*.js']
                }
            },
            shared: {
                files: {
                    '<%= basepath %>/app/js/webclientshared/built.js': ['fitu/clients/webclientshared/app/js/*.js', 'fitu/clients/webclientshared/app/js/**/*.js', '<%= basepath %>/app/js/webclientshared/fituhtml.js']
                }
            }
        },
        uglify: {
            user: {
                files: {
                    '<%= basepath %>/app/js/userwebclient/built.min.js': ['<%= basepath %>/app/js/userwebclient/built.js']
                }
            },
            shared: {
                files: {
                    '<%= basepath %>/app/js/webclientshared/built.min.js': ['<%= basepath %>/app/js/webclientshared/built.js']
                }
            },
            vendor: {
                files: {
                    '<%= basepath %>/app/js/vendorwebclient/built.min.js': ['<%= basepath %>/app/js/vendorwebclient/built.js']
                }
            },
            admin: {
                files: {
                    '<%= basepath %>/app/js/adminwebclient/built.min.js': ['<%= basepath %>/app/js/adminwebclient/built.js']
                }
            },
        },
        copy: {
            userjs: {
                files: [{
                        expand: true,
                        cwd: 'fitu/clients/userwebclient/app/js',
                        src: ['**'],
                        dest: '<%= basepath %>/app/js/userwebclient',
                        filter: 'isFile'
                    }]
            },
            vendorjs: {
                files: [{
                        expand: true,
                        cwd: 'fitu/clients/vendorwebclient/app/js',
                        src: ['**'],
                        dest: '<%= basepath %>/app/js/vendorwebclient',
                        filter: 'isFile'
                    }]
            },
            adminjs: {
                files: [{
                        expand: true,
                        cwd: 'fitu/clients/adminwebclient/app/js',
                        src: ['**'],
                        dest: '<%= basepath %>/app/js/adminwebclient',
                        filter: 'isFile'
                    }]
            },
            sharedjs: {
                files: [{
                        expand: true,
                        cwd: 'fitu/clients/webclientshared/app/js',
                        src: ['**'],
                        dest: '<%= basepath %>/app/js/webclientshared',
                        filter: 'isFile'
                    }]
            },
            sharedimg: {
                files: [{
                        expand: true,
                        cwd: 'fitu/clients/webclientshared/app/image',
                        src: ['**'],
                        dest: '<%= basepath %>/app/image/webclientshared',
                        filter: 'isFile'
                    }]
            },
            libsjs: {
                files: [
                    { expand: true, cwd: 'bower_components/angular', src: ['angular.js'], dest: '<%= basepath %>/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/angular-animate', src: ['angular-animate.js'], dest: '<%= basepath %>/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/angular-i18n', src: ['angular-locale_zh-cn.js'], dest: '<%= basepath %>/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/angular-route', src: ['angular-route.js'], dest: '<%= basepath %>/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/angular-ui-router/release', src: ['angular-ui-router.js'], dest: '<%= basepath %>/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/angular-ui-router.stateHelper', src: ['statehelper.js'], dest: '<%= basepath %>/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components', src: ['bootstrap/**'], dest: '<%= basepath %>/app/css/libs' },
                    { expand: true, cwd: 'bower_components/crypto.js/components', src: ['sha1.js'], dest: '<%= basepath %>/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/eonasdan-bootstrap-datetimepicker/build/js', src: ['bootstrap-datetimepicker.min.js'], dest: '<%= basepath %>/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/eonasdan-bootstrap-datetimepicker/build/css', src: ['bootstrap-datetimepicker.min.css'], dest: '<%= basepath %>/app/css/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components', src: ['font-awesome/**'], dest: '<%= basepath %>/app/css/libs' },
                    { expand: true, cwd: 'bower_components', src: ['jquery/**'], dest: '<%= basepath %>/app/js/libs' },
                    { expand: true, cwd: 'bower_components/jquery-cookie', src: ['jquery.cookie.js'], dest: '<%= basepath %>/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/jquery-ui/ui/minified', src: ['autocomplete.min.js', 'widget.min.js', 'menu.min.js', 'core.min.js'], dest: '<%= basepath %>/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/jquery-ui/themes/base', src: ['*'], dest: '<%= basepath %>/app/css/libs/jquery-ui', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/markdown/lib', src: ['markdown.js'], dest: '<%= basepath %>/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/moment/min', src: ['moment.min.js'], dest: '<%= basepath %>/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/moment/locale', src: ['zh-cn.js'], dest: '<%= basepath %>/app/js/libs', filter: 'isFile' },
                ]
            },
            sharedjson: {
                files: [{
                        expand: true,
                        cwd: 'fitu/clients/webclientshared/app/json',
                        src: ['**'],
                        dest: 'fitu/clients/userwebclient/app/json',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        cwd: 'fitu/clients/webclientshared/app/json',
                        src: ['**'],
                        dest: 'fitu/clients/vendorwebclient/app/json',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        cwd: 'fitu/clients/webclientshared/app/json',
                        src: ['**'],
                        dest: 'fitu/clients/adminwebclient/app/json',
                        filter: 'isFile'
                    }]
            }
        },
        sass: {
            user: {
                files: [{
                        expand: true,
                        cwd: 'fitu/clients/webclientshared/app/css/userwebclient',
                        src: ['*.scss'],
                        dest: '<%= basepath %>/app/css/userwebclient',
                        ext: '.css'
                    }]
            },
            vendor: {
                files: [{
                        expand: true,
                        cwd: 'fitu/clients/webclientshared/app/css/vendorwebclient',
                        src: ['*.scss'],
                        dest: '<%= basepath %>/app/css/vendorwebclient',
                        ext: '.css'
                    }]
            },
            admin: {
                files: [{
                        expand: true,
                        cwd: 'fitu/clients/webclientshared/app/css/adminwebclient',
                        src: ['*.scss'],
                        dest: '<%= basepath %>/app/css/adminwebclient',
                        ext: '.css'
                    }]
            },
            shared: {
                files: [{
                        expand: true,
                        cwd: 'fitu/clients/webclientshared/app/css/webclientshared',
                        src: ['*.scss'],
                        dest: '<%= basepath %>/app/css/webclientshared',
                        ext: '.css'
                    }]
            }
        },
        clean: {
            all: ['<%= basepath %>/app/css', '<%= basepath %>/app/js', '<%= basepath %>/app/image/webclientshared'],
            html2js: ['<%= basepath %>/app/js/webclientshared/fituhtml.js']
        },
        html2js: {
            options: {
                module: 'fituhtml',
                rename: function (moduleName) {
                    return '/' + moduleName;
                },
                singleModule: true,
                base: 'fitu/clients/webclientshared',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            directives: {
                src: ['fitu/clients/webclientshared/app/html/directives/*.html'],
                dest: '<%= basepath %>/app/js/webclientshared/fituhtml.js',
            }
        },
        watch: {
            user_css: {
                files: ['fitu/clients/webclientshared/app/css/config/*.scss', 'fitu/clients/webclientshared/app/css/controls/*.scss', 'fitu/clients/webclientshared/app/css/extension/*.scss', 'fitu/clients/webclientshared/app/css/infra/*.scss', 'fitu/clients/webclientshared/app/css/userwebclient/*.scss'],
                tasks: ['sass:user']
            },
            user_js: {
                files: ['fitu/clients/userwebclient/app/js/**/*.js'],
                tasks: ['copy:userjs']
            },
            admin_css: {
                files: ['fitu/clients/webclientshared/app/css/config/*.scss', 'fitu/clients/webclientshared/app/css/controls/*.scss', 'fitu/clients/webclientshared/app/css/extension/*.scss', 'fitu/clients/webclientshared/app/css/infra/*.scss', 'fitu/clients/webclientshared/app/css/adminwebclient/*.scss'],
                tasks: ['sass:admin']
            },
            admin_js: {
                files: ['fitu/clients/adminwebclient/app/js/**/*.js'],
                tasks: ['copy:adminjs']
            },
            vendor_css: {
                files: ['fitu/clients/webclientshared/app/css/config/*.scss', 'fitu/clients/webclientshared/app/css/controls/*.scss', 'fitu/clients/webclientshared/app/css/extension/*.scss', 'fitu/clients/webclientshared/app/css/infra/*.scss', 'fitu/clients/webclientshared/app/css/vendorwebclient/*.scss'],
                tasks: ['sass:vendor']
            },
            vendor_js: {
                files: ['fitu/clients/vendorwebclient/app/js/**/*.js'],
                tasks: ['copy:vendorjs']
            },
            shared_css: {
                files: ['fitu/clients/webclientshared/app/css/config/*.scss', 'fitu/clients/webclientshared/app/css/controls/*.scss', 'fitu/clients/webclientshared/app/css/extension/*.scss', 'fitu/clients/webclientshared/app/css/infra/*.scss', 'fitu/clients/webclientshared/app/css/webclientshared/*.scss'],
                tasks: ['sass:shared']
            },
            shared_js: {
                files: ['fitu/clients/webclientshared/app/js/**/*.js'],
                tasks: ['copy:sharedjs']
            },
            shared_html: {
                files: ['fitu/clients/webclientshared/app/html/**/*.html'],
                tasks: ['html2js:directives']
            },
            shared_json: {
                files: ['fitu/clients/webclientshared/app/json/*.json'],
                tasks: ['copy:sharedjson']
            },
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            watchuser: {
                tasks: ['watch:user_js', 'watch:user_css', 'watch:shared_js', 'watch:shared_html', 'watch:shared_css', 'watch:shared_json']
            },
            watchvendor: {
                tasks: ['watch:vendor_js', 'watch:vendor_css', 'watch:shared_js', 'watch:shared_html', 'watch:shared_css', 'watch:shared_json']
            },
            watchadmin: {
                tasks: ['watch:admin_js', 'watch:admin_css', 'watch:shared_js', 'watch:shared_html', 'watch:shared_css', 'watch:shared_json']
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.registerTask('prod', ['clean', 'sass', 'copy:libsjs', 'copy:sharedimg', 'html2js', 'concat', 'uglify', 'clean:html2js', 'copy:sharedjson']);
    grunt.registerTask('nonprod', ['clean', 'sass', 'copy', 'html2js']);
    grunt.registerTask('watchuser', ['dev', 'concurrent:watchuser']);
    grunt.registerTask('watchvendor', ['dev', 'concurrent:watchvendor']);
    grunt.registerTask('watchadmin', ['dev', 'concurrent:watchadmin']);
    grunt.registerTask('test', function () {
        grunt.config('basepath', 'statics_test');
        grunt.task.run('nonprod');
    });
    grunt.registerTask('dev', function () {
        grunt.config('basepath', 'statics_dev');
        grunt.task.run('nonprod');
    });
};