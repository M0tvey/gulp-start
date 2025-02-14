import fs from 'fs';
import fonter from 'gulp-fonter-2';
import deleteAsync from 'del';

function convertFonts() {
	// Ищем файлы шрифтов .otf
	return (app.gulp.src([
		app.path.src.fonts + '*.otf',
		app.path.src.fonts + '*.ttf'
	], { encoding: false })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'FONTS',
				message: 'Error: <%= error.message %>',
			})
		))
		.pipe(fonter({
			formats: ['ttf', 'woff', 'eot'],
		}))
		// Выгружаем в исходную папку
		.pipe(app.gulp.dest(app.path.build.fonts))
	);
}

function fontsStyle() {
	// Файл стилей подключения шрифтов
	let fontsFile = app.path.srcFolder + '/assets/style/layout/_fonts.scss';
	// Проверяем существуют ли файлы шрифтов
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) {

			// Если файл стилей для подключения шрифтов есть то удаляем его
			deleteAsync([fontsFile]).then(function (paths) {
				// Создаем файл
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				const fontsNames = new Set();

				for (var i = 0; i < fontsFiles.length; i++) {
					// Записываем подключения шрифтов в файл стилей
					const fontFileName = fontsFiles[i].split('.')[0];

					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0]
								? fontFileName.split('-')[0]
								: fontFileName,
							fontWeight = fontFileName.split('-')[1]
								? fontFileName.split('-')[1]
								: fontFileName;

						fontsNames.add(fontName);

						if (fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100;
						} else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200;
						} else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300;
						} else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500;
						} else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600;
						} else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700;
						} else if (
							fontWeight.toLowerCase() === 'extrabold' ||
							fontWeight.toLowerCase() === 'heavy'
						) {
							fontWeight = 800;
						} else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900;
						} else {
							fontWeight = 400;
						}

						fs.appendFile(fontsFile, `@font-face {
	font-family: '${ fontName }';
	font-display: swap;
	src: url('../fonts/${ fontFileName }.eot?#iefix') format('embedded-opentype'),
    	 url('../fonts/${ fontFileName }.ttf') format('truetype'),
			 url('../fonts/${ fontFileName }.woff') format('woff');
	font-weight: ${ fontWeight };
	font-style: ${ fontFileName.toLocaleLowerCase().includes('italic') ? 'italic' : 'normal' };
}\n\n`, cb);

						newFileOnly = fontFileName;
					}
				}

				[...fontsNames].forEach((fontName, fontNameIndex) => {
					fs.appendFile(
						fontsFile,
						`$font_${fontNameIndex + 1}: '${fontName}';\r\n\n`,
						cb
					);
				});
			});
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`);
	function cb() {}
}

function fontsCopy() {
	return app.gulp
		.src(app.path.src.fonts)
		.pipe(app.gulp.dest(app.path.build.fonts));
}

export { convertFonts, fontsStyle, fontsCopy };
