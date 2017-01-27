const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () => {
  gulp.src(['style.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', function () {
  gulp.watch('*.scss', ['sass']);
});

// Default gulp Task
gulp.task('default', ['sass']);
