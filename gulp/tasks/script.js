import webpack from 'webpack-stream';
import { webpackConfig } from '../../webpack.config.js';

export const script = async () => {
	return app.gulp
		.src(app.path.src.js, {
			encoding: false,
			sourcemaps: !app.isBuild,
		})
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'JS',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(webpack({ config: await webpackConfig(!app.isBuild) }))
		.pipe(app.gulp.dest(app.path.build.js), { sourcemaps: !app.isBuild }) // Выплюнем готовый файл в build
		.pipe(app.plugins.browserSync.stream());
};
