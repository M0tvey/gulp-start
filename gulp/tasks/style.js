import gulp from 'gulp';
import { filePaths } from '../config/paths.js';

import * as sass from 'sass'
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import prefixer from 'gulp-autoprefixer';
import cssmin from 'gulp-clean-css';

const sas = gulpSass(sass)

export function style(serverInstance) {
  return gulp.src(filePaths.src.style) // Выберем наш main.scss
    .pipe(sas({ outputStyle: 'expanded' }, null)) // Скомпилируем
    .pipe(prefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    })) // Добавим вендорные префиксы
    .pipe(cleanCSS({
      level: 0,
    })) // Сожмем
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(filePaths.build.css)) // И в build
    .pipe(serverInstance.stream());
}
