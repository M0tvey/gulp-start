import gulp from 'gulp';
import { filePaths } from '../config/paths.js';

import imagemin, {gifsicle, mozjpeg, optipng} from 'gulp-imagemin';
import webp from 'gulp-webp';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';

function image(serverInstance) {
  return gulp.src(filePaths.src.img) // Выберем наши картинки
    .pipe(imagemin([
      gifsicle({interlaced: true}),
      mozjpeg({progressive: true}),
      optipng({optimizationLevel: 5})
    ]))
    .pipe(webp())
    .pipe(gulp.dest(filePaths.build.img)) // И бросим в build
    .pipe(serverInstance.stream());
}

function svg(serverInstance) {
  return gulp.src(filePaths.src.svg) // Выберем наши svg
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(gulp.dest(filePaths.build.svg))
    .pipe(serverInstance.stream());
}

export {image, svg}
