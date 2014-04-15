'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var PowderGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Powder generator.'));

    var prompts = [{
      name: 'appName',
      message: 'What do you want to call your app?'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;

      done();
    }.bind(this));
  },

  scaffoldFolders: function(){
    this.mkdir('app');
    this.mkdir('bin');
    this.mkdir('controllers');
    this.mkdir('controllers/api');
    this.mkdir('controllers/auth');
    this.mkdir('controllers/main');
    this.mkdir('db');
    this.mkdir('gulp');
    this.mkdir('gulp/tasks');
    this.mkdir('lib');
    this.mkdir('modules');
    this.mkdir('public');
    this.mkdir('public/css');
    this.mkdir('public/img');
    this.mkdir('public/js');
    this.mkdir('public/templates');
    this.mkdir('tests');
    this.mkdir('views');
    this.mkdir('views/core');
    this.mkdir('views/errors');
    this.mkdir('views/helpers');
    this.mkdir('views/menu');
  },

  copyMainFiles: function(){
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_gulpfile.js', 'gulpfile.js');
  },

  app: function () {
    this.scaffoldFolders();
    this.copyMainFiles();
  },

  projectfiles: function () {
    // copy suplementary files
    this.copy('jshintrc', '.jshintrc');
    this.copy('nodemonignore', '.nodemonignore');

    // copy app
    this.copy('_app.js', 'app.js');

    // init config file
    this.template('_config.example.js', 'config.js');

    // app config
    this.directory('_app', 'app');
    // bin
    this.directory('_bin', 'bin');
    // controllers
    this.directory('_controllers/api', 'controllers/api');
    this.directory('_controllers/auth', 'controllers/auth');
    this.directory('_controllers/main', 'controllers/main');
    // db
    this.directory('_db', 'db');
    // gulp
    this.directory('_gulp', 'gulp');
    this.directory('_gulp/tasks', 'gulp/tasks');
    // lib
    this.directory('_lib', 'lib');
    // modules
    this.directory('_modules', 'modules');
    // client-side files
    this.directory('_public/css', 'public/css');
    this.directory('_public/img', 'public/img');
    this.directory('_public/js', 'public/js');
    this.directory('_public/js/controllers', 'public/js/controllers');
    this.directory('_public/js/data', 'public/js/data');
    this.directory('_public/js/directives', 'public/js/directives');
    this.directory('_public/js/filters', 'public/js/filters');
    this.directory('_public/js/modules', 'public/js/modules');
    this.directory('_public/js/services', 'public/js/services');
    this.directory('_public/templates', 'public/templates');
    // tests
    this.directory('_tests', 'tests');
    // views
    this.directory('_views', 'views');
    this.directory('_views/core', 'views/core');
    this.directory('_views/errors', 'views/errors');
    this.directory('_views/helpers', 'views/helpers');
    this.directory('_views/menu', 'views/menu');

    // readme
    this.template('_README.md', 'README.md');
  }
});

module.exports = PowderGenerator;