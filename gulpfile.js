const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const imageminJpeg = require('imagemin-jpeg-recompress');
const pngquant = require('pngquant');

//---------------------------------------------------
const paths = {
	img: {
		src: 'app/imgs/**/*.*',
		dest: 'app/img'
	}
};

// IMG tack
const imgMin = () => {
	return gulp.src(paths.img.src)
		.pipe(cache(imagemin([
			imagemin.gifsicle({
				interlaced: true
			}),
			imagemin.jpegtran({
				progressive: true
			}),
			imageminJpeg({
				loops: 4,
				min: 50,
				max: 95,
				quality: 'medium'
			}),
			imagemin.svgo(),
			imagemin.optipng({
				optimizationLevel: 3
			}),
			pngquant({
				quality: '65-70',
				speed: 5
			})
		], {
			verbose: true
		})))
		.pipe(gulp.dest(paths.img.dest))
}

const minImg = gulp.parallel(imgMin);

exports.default = minImg;