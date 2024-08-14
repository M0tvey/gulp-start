import gulp from 'gulp';
import { filePaths } from '../config/paths.js';
import { webpackConfig } from '../../webpack.config.js';

import webpack from 'webpack-stream';
import concat from 'gulp-concat';

export async function script(isDev, serverInstance) {
  return gulp.src(filePaths.src.js) // Найдем наш main файл
    .pipe(concat('main.js'))
    .pipe(webpack({ config: await webpackConfig(isDev) }))
    .pipe(gulp.dest(filePaths.build.js)) // Выплюнем готовый файл в build
    .pipe(serverInstance.stream());
}
