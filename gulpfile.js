// npm i --save-dev gulp
// npm i --save-dev gulp-autoprefixer
// npm i --save-dev gulp-minify-css
// npm i --save-dev browser-sync
// npm i --save-dev gulp-imagemin
// npm i --save-dev gulp-sass
// npm i --save-dev gulp-watch
// npm i --save-dev gulp-rename
// npm i --save-dev gulp-concat
// npm i --save-dev gulp-svgstore
// npm i --save-dev gulp-svgmin

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  terser = require('gulp-terser'),
  sass = require('gulp-sass'),
  cssmin = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  imagemin = require('gulp-imagemin'),
  browserSync = require("browser-sync"),
  concat = require('gulp-concat'),
  del = require('del'),
  reload = browserSync.reload,
  isDebug = true,
  njkRender = require('gulp-nunjucks-render'),
	svgstore = require('gulp-svgstore'),
	svgmin = require('gulp-svgmin');
// isDebug = process.env.NODE_ENV !== 'production';

var path = {
  build: { //Тут мы укажем куда складывать готовые после сборки файлы
    html: 'build/',
    js: 'build/assets/js/',
    json: 'build/',
    css: 'build/assets/css/',
    img: 'build/assets/img/',
    svg: 'build/assets/img/svg/',
    root: 'build/assets/',
    fonts: 'build/assets/fonts/'
  },
  src: { //Пути откуда брать исходники
    html: ['src/*.njk', 'src/translate/**/*.njk', 'src/assets/**/*.njk'], //Синтаксис src/*.njk говорит gulp что мы хотим взять все файлы с расширением .njk
    js: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
      'node_modules/svg4everybody/dist/svg4everybody.min.js',
      'node_modules/parsleyjs/dist/parsley.min.js',
      'node_modules/jquery.cookie/jquery.cookie.js',
      'node_modules/inputmask/dist/jquery.inputmask.min.js',
      'node_modules/select2/dist/js/select2.min.js',
      'node_modules/select2/dist/js/i18n/ru.js',
			'node_modules/gsap/dist/gsap.js',
      'node_modules/swiper/swiper-bundle.min.js',
      'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js', // http://manos.malihu.gr/jquery-custom-content-scroller/
      'src/assets/js/main.js',
    ],
    json: 'src/*.json',
    style: 'src/assets/style/**/*.scss',
    img: 'src/assets/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
    svg: 'src/assets/img/svg/*.*',
    root: 'src/assets/root/**/*.*',
    fonts: 'src/assets/fonts/**/*.*'
  },
  watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
		njk: 'src/**/*.njk',
    html: 'src/**/*.html',
    js: 'src/assets/**/*.js',
    json: 'src/*.json',
    style: 'src/assets/style/**/*.scss',
    img: 'src/assets/img/**/*.*',
    svg: 'src/assets/img/svg/*.*',
    root: 'src/assets/root/**/*.*',
    fonts: 'src/assets/fonts/**/*.*'
  },
  clean: './build'
};
// https://github.com/BrowserSync/browser-sync/issues/1458#issuecomment-417169447
const postSupport = function (req, res, next) {
  if (/\.json|\.txt|\.html/.test(req.url) && req.method.toUpperCase() === 'POST') {
    console.log('[POST => GET] : ' + req.url);
    req.method = 'GET';
  }
  next();
};
var config = {
  server: {
    baseDir: "./build"
  },
  // tunnel: true,
  host: 'localhost',
  port: 9003,
  logPrefix: 'Front-end',
  middleware: [postSupport]
};
gulp.task('clean', function (cb) {
  del.sync('build'); // Удаляем папку dist перед сборкой
  cb();
});
gulp.task('html:build', function () {
  return gulp.src(path.src.html) //Выберем файлы по нужному пути
		.pipe(njkRender())
    .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
    .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});
gulp.task('js:build', function () {
  return gulp.src(path.src.js) //Найдем наш main файл
    .pipe(concat('main.js'))
    .pipe(terser())//Сожмем наш js
    .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
    .pipe(reload({stream: true})); //И перезагрузим сервер
});
gulp.task('json:build', function () {
  return gulp.src(path.src.json) //Найдем наш main файл
    .pipe(gulp.dest(path.build.json)) //Выплюнем готовый файл в build
    .pipe(reload({stream: true})); //И перезагрузим сервер
});
gulp.task('style:build', function () {
  return gulp.src(path.src.style) //Выберем наш main.scss
    .pipe(sass()) //Скомпилируем
    .pipe(prefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    })) //Добавим вендорные префиксы
    .pipe(cssmin()) //Сожмем
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.build.css)) //И в build
    .pipe(reload({stream: true}));
});
gulp.task('image:build', function () {
  return gulp.src(path.src.img) //Выберем наши картинки
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest(path.build.img)) //И бросим в build
    .pipe(reload({stream: true}));
});
gulp.task('svg:build', function () {
  return gulp.src(path.src.svg) //Выберем наши svg
		.pipe(svgmin())
		.pipe(svgstore())
		.pipe(gulp.dest(path.build.svg));
});
gulp.task('fonts:build', function (done) {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
  done();
});

gulp.task('root:build', function (done) {
  gulp.src(path.src.root)
    .pipe(gulp.dest(path.build.root))
  done();
});
gulp.task('build', gulp.series([
  'clean',
  'html:build',
  'js:build',
	'json:build',
  'style:build',
  'root:build',
  'fonts:build',
  'image:build',
  'svg:build'
]));
gulp.task('watch', function (done) {
	watch([path.watch.njk], gulp.series('html:build'));
  watch([path.watch.html], gulp.series('html:build'));
  watch([path.watch.style], gulp.series('style:build'));
  watch([path.watch.js], gulp.series('js:build'));
  watch([path.watch.json], gulp.series('json:build'));
  watch([path.watch.root], gulp.series('root:build'));
  watch([path.watch.img], gulp.series('image:build'));
  watch([path.watch.svg], gulp.series('svg:build'));
  watch([path.watch.fonts], gulp.series('fonts:build'));
  done();
});
gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('default', gulp.parallel(['build', 'webserver', 'watch']));
// gulp.task('build', gulp.parallel(['build', 'webserver', 'watch']));
