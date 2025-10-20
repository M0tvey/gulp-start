import gulp from 'gulp';
import { filePaths } from './gulp/config/paths.js';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

global.app = {
	isBuild: process.argv.includes('--build'),
	path: filePaths,
	gulp: gulp,
	plugins: {
		browserSync: browserSync.create(),
		plumber,
		notify,
	},
};

import { server } from './gulp/tasks/serv.js';
import { reset } from './gulp/tasks/reset.js';
import { root } from './gulp/tasks/root.js';
import { html } from './gulp/tasks/html.js';
import { style } from './gulp/tasks/style.js';
import { script } from './gulp/tasks/script.js';
import { image, svg, svgToScssIcons } from './gulp/tasks/image.js';
import { convertFonts,	fontsStyle, fontsCopy} from './gulp/tasks/fonts.js';

function watcher() {
	server();

	gulp.watch(filePaths.watch.root, root);
	gulp.watch(filePaths.watch.html, html);
	gulp.watch(filePaths.watch.style, style);
	gulp.watch(filePaths.watch.js, script);
	gulp.watch(filePaths.watch.img, image);
	gulp.watch(filePaths.watch.svg, svg);
	gulp.watch(filePaths.watch.svg, svgToScssIcons);
}

const mondatory = gulp.series(convertFonts, fontsStyle, svgToScssIcons)
	, devTasks = gulp.series(mondatory, gulp.parallel(root, html, script, image, svg, fontsCopy), style)
	, dev = gulp.series(reset, devTasks, watcher)
	, build = gulp.series(reset, devTasks);

export { dev, build };

gulp.task('default', dev);
