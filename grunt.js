module.exports = function(grunt) {
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '// <%= pkg.name %> <%= pkg.version %>\n// Build Date: <%= grunt.template.today("yyyy-mm-dd") %>\n\n// (c) 2012 Kristofer Joseph.\n// <%= pkg.name %> may be freely distributed under the MIT license.\n// For all details and documentation:\n// <%= pkg.url %>'
        },
        concat: {
            dist: {
                src: ['<banner>', '<file_strip_banner:src/crossbones.js>'],
                dest: 'bin/crossbones.js'
            }
        },
        min: {
            dist: {
                src: ['<banner>', 'bin/crossbones.js'],
                dest: 'bin/crossbones.min.js'
            }
        },
        qunit: {
            all: ['test/*.html']
        },
        lint: {
            all: ['src/**/*.js','test/*.js']
        },
        watch: {
            files: '<config:lint.all>',
            tasks: 'qunit'
        },
        docco: {
            app: {
                src: ['bin/crossbones.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-docco');
    grunt.registerTask('default', ['lint', 'qunit', 'concat', 'min', 'docco']);
};