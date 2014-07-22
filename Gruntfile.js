'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: {
        dot: true,
        src: ['tmp_remote', 'tmp']
      }
    },

    mkdir: {
      tests: {
        options: {
          create: ['tmp_remote']
        }
      }
    },

    setup_test_folder: {
      tests: {
        remote_folder: 'tmp_remote',
        folder: 'tmp'
      }
    },

    // Configuration to be run (and then tested).
    sg_release: {
      options: {
        developBranch: 'develop',
        masterBranch: 'master',
        files: [
          'package.json',
          'bower.json',
          'README.md'
        ],
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'], // '-a' for all files
        createTag: true,
        pushTo: 'origin'
      },
      tests: {
        developBranch: 'develop',
        masterBranch: 'master'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  grunt.loadTasks('test/tasks');

  grunt.registerTask('test', ['clean', 'mkdir', 'setup_test_folder', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};

