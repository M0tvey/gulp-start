export const root = () => {
  app.gulp.src(app.path.src.root)
    .pipe(app.gulp.dest(app.path.build.root))
}
