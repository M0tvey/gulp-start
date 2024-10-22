import gulp from 'gulp';
import { filePaths } from './gulp/config/paths.js';
import browserSync from 'browser-sync';

import changed from 'gulp-changed';

global.app = {
	isBuild: process.argv.includes('--build'),
	path: filePaths,
	gulp: gulp,
	plugins: {
    changed: changed,
    browserSync: browserSync
  }
}

import { root } from './gulp/tasks/root.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { style } from './gulp/tasks/style.js';
import { script } from './gulp/tasks/script.js';
import { image, svg } from './gulp/tasks/image.js';
import { server } from './gulp/tasks/serv.js';

function watcher() {
  gulp.watch(filePaths.watch.root, root);
  gulp.watch(filePaths.watch.njk, html);
  gulp.watch(filePaths.watch.html, html);
  // gulp.watch(filePaths.watch.style, style);
  // gulp.watch(filePaths.watch.js, script);
  // gulp.watch(filePaths.watch.img, image);
  // gulp.watch(filePaths.watch.svg, svg);
}

const devTasks = (root, html)
  , dev = gulp.series(reset, gulp.parallel(devTasks, watcher, server))
  , build = gulp.series(reset, devTasks);

export { dev, build };

gulp.task('default', dev);
