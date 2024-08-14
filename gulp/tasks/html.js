import gulp from 'gulp';
import { filePaths } from '../config/paths.js';

import nunjucksRender from 'gulp-nunjucks-render';

export function html(serverInstance) {
  return gulp.src(filePaths.src.html) // Выберем файлы по нужному пути
    .pipe(nunjucksRender())
    .pipe(gulp.dest(filePaths.build.html)) // Выплюнем их в папку build
    .pipe(serverInstance.stream());
}
