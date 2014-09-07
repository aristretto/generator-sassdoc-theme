'use strict';

var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var isset = require('../../utils').isset;


var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.slugname = isset(this.options.slugname) ? this.options.slugname : '';
  this.useSass = isset(this.options.useSass) ? this.options.useSass : true;
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.buildViews = function createViewFiles() {
  this.sourceRoot(path.join(__dirname, '../../templates/gulp'));

  this.template('_Gulpfile.js', 'Gulpfile.js');
}

Generator.prototype.install = function install() {
  if (this.options['skip-install']) {
    return;
  }

  var pkgs = {
    dependencies: [],
    devDependencies: [
      'fs-extra',
      'q',
      'sassdoc',
      'gulp',
      'gulp-plumber',
      'gulp-autoprefixer',
      'gulp-uglify',
      'gulp-rename',
      'gulp-util',
      'browser-sync'
    ]
  };

  this.useSass && pkgs.devDependencies.push('gulp-ruby-sass');

  var done = this.async();

  this.npmInstall(pkgs.devDependencies, {
    'save-dev': true
  }, done);
};
