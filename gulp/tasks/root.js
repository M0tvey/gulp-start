import gulp from 'gulp';
import { filePaths } from '../config/paths.js';

export function root() {
  gulp.src(filePaths.src.root)
    .pipe(gulp.dest(filePaths.build.root))
}
