const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('start', () => {
  nodemon({
    script: './src/daemon.js',
    ext: 'js',
    legacyWatch: true
  })
});

gulp.watch('./src');

gulp.task('default', gulp.series('start'));
