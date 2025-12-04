const root = () => {
	return app.gulp
		.src(app.path.src.root, {
			encoding: false,
			since: app.gulp.lastRun(root),
		})
		.pipe(app.gulp.dest(app.path.build.root));
};

const json = () => {
	return app.gulp
		.src(app.path.src.json, {
			encoding: false,
			since: app.gulp.lastRun(json),
		})
		.pipe(app.gulp.dest(app.path.build.json));
};

export { root, json };
