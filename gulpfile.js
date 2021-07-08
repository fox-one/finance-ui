'use strict';
const gulp = require('gulp');

module.exports = function (config) {
  const { task, params } = config;

  const [ compileCJS, compileES, compileSFC, ...rest ] = task;
  return [ gulp.series(compileCJS, compileES, compileSFC), ...rest ];
}
