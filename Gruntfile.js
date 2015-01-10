module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            userwebclient: {
                files: {
                    'statics/app/js/userwebclient/built.js': ['fitu/clients/userwebclient/app/js/*.js', 'fitu/clients/userwebclient/app/js/**/*.js']
                }
            },
            vendor: {
                files: {
                    'statics/app/js/vendorwebclient/built.js': ['fitu/clients/vendorwebclient/app/js/*.js', 'fitu/clients/vendorwebclient/app/js/**/*.js']
                }
            },
            admin: {
                files: {
                    'statics/app/js/adminwebclient/built.js': ['fitu/clients/adminwebclient/app/js/*.js', 'fitu/clients/adminwebclient/app/js/**/*.js']
                }
            },
            shared: {
                files: {
                    'statics/app/js/webclientshared/built.js': ['fitu/clients/webclientshared/app/js/*.js', 'fitu/clients/webclientshared/app/js/**/*.js', 'statics/app/js/webclientshared/fituhtml.js']
                }
            }
        },
        uglify: {
            user: {
                files: {
                    'statics/app/js/userwebclient/built.min.js': ['statics/app/js/userwebclient/built.js']
                }
            },
            shared: {
                files: {
                    'statics/app/js/webclientshared/built.min.js': ['statics/app/js/webclientshared/built.js']
                }
            },
            vendor: {
                files: {
                    'statics/app/js/vendorwebclient/built.min.js': ['statics/app/js/vendorwebclient/built.js']
                }
            },
            admin: {
                files: {
                    'statics/app/js/adminwebclient/built.min.js': ['statics/app/js/adminwebclient/built.js']
                }
            },
        },
        copy: {
            userjs: {
                files: [{
                    expand: true,
                    cwd: 'fitu/clients/userwebclient/app/js',
                    src: ['**'],
                    dest: 'statics/app/js/userwebclient',
                    filter: 'isFile'
                }]
            },
            vendorjs: {
                files: [{
                    expand: true,
                    cwd: 'fitu/clients/vendorwebclient/app/js',
                    src: ['**'],
                    dest: 'statics/app/js/vendorwebclient',
                    filter: 'isFile'
                }]
            },
            adminjs: {
                files: [{
                    expand: true,
                    cwd: 'fitu/clients/adminwebclient/app/js',
                    src: ['**'],
                    dest: 'statics/app/js/adminwebclient',
                    filter: 'isFile'
                }]
            },
            sharedjs: {
                files: [{
                    expand: true,
                    cwd: 'fitu/clients/webclientshared/app/js',
                    src: ['**'],
                    dest: 'statics/app/js/webclientshared',
                    filter: 'isFile'
                }]
            },
            sharedimg: {
                files: [{
                    expand: true,
                    cwd: 'fitu/clients/webclientshared/app/image',
                    src: ['**'],
                    dest: 'statics/app/image/webclientshared',
                    filter: 'isFile'
                }]
            },
            libsjs: {
                files: [
                    { expand: true, cwd: 'bower_components/moment/min', src: ['moment.min.js'], dest: 'statics/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/moment/locale', src: ['zh-cn.js'], dest: 'statics/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/jquery-cookie', src: ['jquery.cookie.js'], dest: 'statics/app/js/libs', filter: 'isFile' },
                    //{ expand: true, cwd: 'bower_components/jquery-md5', src: ['jquery.md5.js'], dest: 'statics/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/eonasdan-bootstrap-datetimepicker/build/js', src: ['bootstrap-datetimepicker.min.js'], dest: 'statics/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/eonasdan-bootstrap-datetimepicker/build/css', src: ['bootstrap-datetimepicker.min.css'], dest: 'statics/app/css/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/angular-ui-router.stateHelper', src: ['statehelper.min.js'], dest: 'statics/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/angular-ui-router/release', src: ['angular-ui-router.min.js'], dest: 'statics/app/js/libs', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/crypto.js/components', src: ['sha1.js'], dest: 'statics/app/js/libs', filter: 'isFile' }
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
                    cwd: 'fitu/clients/userwebclient/app/css',
                    src: ['*.scss'],
                    dest: 'statics/app/css/userwebclient',
                    ext: '.css'
                }]
            },
            vendor: {
                files: [{
                    expand: true,
                    cwd: 'fitu/clients/vendorwebclient/app/css',
                    src: ['*.scss'],
                    dest: 'statics/app/css/vendorwebclient',
                    ext: '.css'
                }]
            },
            admin: {
                files: [{
                    expand: true,
                    cwd: 'fitu/clients/adminwebclient/app/css',
                    src: ['*.scss'],
                    dest: 'statics/app/css/adminwebclient',
                    ext: '.css'
                }]
            },
            shared: {
                files: [{
                    expand: true,
                    cwd: 'fitu/clients/webclientshared/app/css',
                    src: ['*.scss'],
                    dest: 'statics/app/css/webclientshared',
                    ext: '.css'
                }]
            }
        },
        clean: {
            all: ['statics/app/css', 'statics/app/js', 'statics/app/image/webclientshared'],
            html2js: ['statics/app/js/webclientshared/fituhtml.js']
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
                dest: 'statics/app/js/webclientshared/fituhtml.js',
            }
        },
        watch: {
            user_css: {
                files: ['fitu/clients/userwebclient/app/css/*.scss'],
                tasks: ['sass:user']
            },
            user_js: {
                files: ['fitu/clients/userwebclient/app/js/**/*.js'],
                tasks: ['copy:userjs']
            },
            admin_css: {
                files: ['fitu/clients/adminwebclient/app/css/*.scss'],
                tasks: ['sass:admin']
            },
            admin_js: {
                files: ['fitu/clients/adminwebclient/app/js/**/*.js'],
                tasks: ['copy:adminjs']
            },
            vendor_css: {
                files: ['fitu/clients/vendorwebclient/app/css/*.scss'],
                tasks: ['sass:vendor']
            },
            vendor_js: {
                files: ['fitu/clients/vendorwebclient/app/js/**/*.js'],
                tasks: ['copy:vendorjs']
            },
            shared_css: {
                files: ['fitu/clients/webclientshared/app/css/*.scss'],
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
    grunt.registerTask('default', ['clean', 'sass', 'copy:libsjs', 'copy:sharedimg', 'html2js', 'concat', 'uglify', 'clean:html2js', 'copy:sharedjson']);
    grunt.registerTask('prod', ['default']);
    grunt.registerTask('dev', ['clean', 'sass', 'copy', 'html2js', 'copy:sharedjson']);
    grunt.registerTask('watchuser', ['concurrent:watchuser']);
    grunt.registerTask('watchvendor', ['concurrent:watchvendor']);
    grunt.registerTask('watchadmin', ['concurrent:watchadmin']);
};