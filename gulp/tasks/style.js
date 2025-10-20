import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import prefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import gulpIf from 'gulp-if';

const sass = gulpSass(dartSass);

export const style = () => {
	return app.gulp.src(app.path.src.style, { encoding: false }) // Выберем наши scss файлы
		.pipe(gulpIf(!app.isBuild, sourcemaps.init()))
		.pipe(sass({
			style: app.isBuild ? 'compressed' : 'expanded',
			includePaths: ['node_modules'],
		},null ).on('error', sass.logError)) // Скомпилируем
		.pipe(prefixer({
			overrideBrowserslist: ['last 5 versions'],
			cascade: false,
		})) // Добавим вендорные префиксы
		.pipe(rename({
			suffix: '.min',
		}))
		.pipe(gulpIf(!app.isBuild, sourcemaps.write('.')))
		.pipe(app.gulp.dest(app.path.build.style)) // И в build
		.pipe(app.plugins.browserSync.stream());
};
