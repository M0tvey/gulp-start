import gulp from 'gulp';
import { filePaths } from './gulp/config/paths.js';
import browserSync from 'browser-sync';

import { reset } from './gulp/tasks/reset.js';
import { serv } from './gulp/tasks/serv.js';
import { html } from './gulp/tasks/html.js';
import { root } from './gulp/tasks/root.js';
import { style } from './gulp/tasks/style.js';
import { script } from './gulp/tasks/script.js';
import { image, svg } from './gulp/tasks/image.js';

const isBuild = process.argv.includes('--build')
  , serverInstance = browserSync.create()
  , server = serv.bind(null, serverInstance)
  , handleHtml = html.bind(null, serverInstance)
  , handleRoot = root.bind(null)
  , handleStyle = style.bind(null, serverInstance)
  , handleScript = script.bind(null, !isBuild, serverInstance)
  , handleImage = image.bind(null, serverInstance)
  , handleSvg = svg.bind(null, serverInstance);

function watcher() {
  gulp.watch(filePaths.watch.njk, handleHtml);
  gulp.watch(filePaths.watch.html, handleHtml);
  gulp.watch(filePaths.watch.root, handleRoot);
  gulp.watch(filePaths.watch.style, handleStyle);
  gulp.watch(filePaths.watch.js, handleScript);
  gulp.watch(filePaths.watch.img, handleImage);
  gulp.watch(filePaths.watch.svg, handleSvg);
}

const devTasks = gulp.parallel(handleHtml, handleRoot, handleStyle, handleScript, handleImage, handleSvg)
  , dev = gulp.series(reset, devTasks, gulp.parallel(watcher, server))
  , build = gulp.series(reset, devTasks);

gulp.task('default', dev);

export { dev, build };



// gulp.task('json:build', function () {
//   return gulp.src(filePaths.src.json) // Найдем наш main файл
//     .pipe(gulp.dest(filePaths.build.json)) // Выплюнем готовый файл в build
//     .pipe(reload({stream: true})); // И перезагрузим сервер
// });



// gulp.task('image:build', function () {
//   return gulp.src(filePaths.src.img) // Выберем наши картинки
//     .pipe(imagemin([
//       gifsicle({interlaced: true}),
//       mozjpeg({progressive: true}),
//       optipng({optimizationLevel: 5})
//     ]))
//     .pipe(webp())
//     .pipe(gulp.dest(filePaths.build.img)) // И бросим в build
//     .pipe(reload({stream: true}));
// });

// gulp.task('svg:build', function () {
//   return gulp.src(filePaths.src.svg) // Выберем наши svg
// 		.pipe(svgmin())
// 		.pipe(svgstore())
// 		.pipe(gulp.dest(filePaths.build.svg));
// });

// gulp.task('fonts:build', function (done) {
//   gulp.src(filePaths.src.fonts)
//     .pipe(gulp.dest(filePaths.build.fonts))
//   done();
// });

// gulp.task('root:build', function (done) {
//   gulp.src(filePaths.src.root)
//     .pipe(gulp.dest(filePaths.build.root))
//   done();
// });

// gulp.task('build', gulp.series([
//   'clean',
//   'html:build',
//   'js:build',
// 	'json:build',
//   'style:build',
//   'root:build',
//   'fonts:build',
//   'image:build',
//   'svg:build'
// ]));

// gulp.task('watch', function (done) {
// 	gulp.watch([filePaths.watch.njk], gulp.series('html:build'));
//   gulp.watch([filePaths.watch.html], gulp.series('html:build'));
//   gulp.watch([filePaths.watch.style], gulp.series('style:build'));
//   gulp.watch([filePaths.watch.js], gulp.series('js:build'));
//   gulp.watch([filePaths.watch.json], gulp.series('json:build'));
//   gulp.watch([filePaths.watch.root], gulp.series('root:build'));
//   gulp.watch([filePaths.watch.img], gulp.series('image:build'));
//   gulp.watch([filePaths.watch.svg], gulp.series('svg:build'));
//   gulp.watch([filePaths.watch.fonts], gulp.series('fonts:build'));
//   done();
// });
// gulp.task('webserver', function () {
//   browserSync({
//     server: {
//       baseDir: "./build"
//     },
//     host: 'localhost',
//     port: 9003,
//     logPrefix: 'Front-end',
//     middleware: [function (req, res, next) { // https://github.com/BrowserSync/browser-sync/issues/1458#issuecomment-417169447
//       if (/\.json|\.txt|\.html/.test(req.url) && req.method.toUpperCase() === 'POST') {
//         console.log('[POST => GET] : ' + req.url);
//         req.method = 'GET';
//       }
//       next();
//     }]
//   });
// });

// gulp.task('default', gulp.parallel(['build', 'webserver', 'watch']));
