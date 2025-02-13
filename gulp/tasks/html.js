import nunjucksRender from "gulp-nunjucks-render";

export const html = () => {
	return app.gulp
		.src(app.path.src.html, { encoding: false }) // Выберем файлы по нужному пути
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: "HTML",
					message: "Error: <%= error.message %>",
				})
			)
		)
		.pipe(nunjucksRender())
		.pipe(app.gulp.dest(app.path.build.html)) // Выплюнем их в папку build
		.pipe(app.plugins.browserSync.stream());
};
