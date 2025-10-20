import webpack from 'webpack-stream';
import { webpackConfig } from '../../webpack.config.js';
import sourcemaps from 'gulp-sourcemaps';

export const script = async () => {
	return app.gulp.src(app.path.src.js, {
			encoding: false,
			sourcemaps: !app.isBuild,
		})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'JS',
				message: 'Error: <%= error.message %>',
			})
		))
		.pipe(sourcemaps.init())
		.pipe(webpack({ config: await webpackConfig(!app.isBuild) }))
		.pipe(sourcemaps.write())
		.pipe(app.gulp.dest(app.path.build.js), { sourcemaps: !app.isBuild }) // Выплюнем готовый файл в build
		.pipe(app.plugins.browserSync.stream());
};
