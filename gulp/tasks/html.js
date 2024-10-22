import nunjucksRender from 'gulp-nunjucks-render';

export const html = () => {
  return app.gulp.src(app.path.src.html) // Выберем файлы по нужному пути
    .pipe(app.plugins.changed(app.path.src.html, { hasChanged: app.plugins.changed.compareContents }))
    .pipe(nunjucksRender())
    .pipe(app.gulp.dest(app.path.build.html)) // Выплюнем их в папку build
    .pipe(app.plugins.browserSync.stream());
}
