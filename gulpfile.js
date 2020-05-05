const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

//---------------------------------------------------
const paths = {
  img: {
    src: 'app/imgs/**/*.*',
    dest: 'app/img',
  },
};

// IMG tack
const imgMin = () => {
  return gulp
    .src(paths.img.src)
    .pipe(
      cache(
        imagemin(
          [
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
              plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
            }),
          ],
          {
            verbose: true,
          }
        )
      )
    )
    .pipe(gulp.dest(paths.img.dest));
};

const minImg = gulp.parallel(imgMin);

exports.default = minImg;
