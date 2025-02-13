export const root = () => {
	return app.gulp
		.src(app.path.src.root, {
			encoding: false,
			since: app.gulp.lastRun(root),
		})
		.pipe(app.gulp.dest(app.path.build.root));
};
