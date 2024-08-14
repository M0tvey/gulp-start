const buildFolder = './build'
  , srcFolder = './src'
  , filePaths = {
    build: { // Тут мы укажем куда складывать готовые после сборки файлы
      html: buildFolder + '/',
      js: buildFolder + '/assets/js/',
      json: buildFolder + '/',
      css: buildFolder + '/assets/css/',
      img: buildFolder + '/assets/img/',
      svg: buildFolder + '/assets/img/svg/',
      root: buildFolder + '/assets/',
      fonts: buildFolder + '/assets/fonts/'
    },
    src: { // Пути откуда брать исходники
      html: [srcFolder + '/*.njk', srcFolder + '/*.html'],
      js: srcFolder + '/assets/js/*.js',
      json: srcFolder + '/*.json',
      style: srcFolder + '/assets/style/**/*.scss',
      img: srcFolder + '/assets/img/**/*.*',
      svg: srcFolder + '/assets/img/svg/*.*',
      root: srcFolder + '/assets/root/**/*.*',
      fonts: srcFolder + '/assets/fonts/**/*.*'
    },
    watch: { // Тут мы укажем, за изменением каких файлов мы хотим наблюдать
      njk: srcFolder + '/**/*.njk',
      html: srcFolder + '/**/*.html',
      js: srcFolder + '/assets/**/*.js',
      json: srcFolder + '/*.json',
      style: srcFolder + '/assets/style/**/*.scss',
      img: srcFolder + '/assets/img/**/*.*',
      svg: srcFolder + '/assets/img/svg/*.*',
      root: srcFolder + '/assets/root/**/*.*',
      fonts: srcFolder + '/assets/fonts/**/*.*'
    }
    ,clean: buildFolder,
    buildFolder,
    srcFolder
  };

export { filePaths };
