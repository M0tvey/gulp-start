import imagemin, { gifsicle, mozjpeg, optipng } from "gulp-imagemin";
import webp from "gulp-webp";
import svgstore from "gulp-svgstore";
import fs from "fs";
import { parse, stringify } from "svgson";
import elementToPath from "element-to-path";

function image() {
	return (
		app.gulp
			.src(app.path.src.img, {
				encoding: false,
				since: app.gulp.lastRun(image),
			}) // Выберем наши картинки
			// .pipe(
			// 	imagemin([
			// 		gifsicle({ interlaced: true }),
			// 		mozjpeg({ quality: 75, progressive: true }),
			// 		optipng({ optimizationLevel: 5 })
			// 	])
			// )
			.pipe(webp({ quality: 80 }))
			.pipe(app.gulp.src("./src/assets/img/*.svg"))
			.pipe(app.gulp.dest(app.path.build.img)) // И бросим в build
			.pipe(app.plugins.browserSync.stream())
	);
}

function svg() {
	return app.gulp
		.src(app.path.src.svg, {
			encoding: false
		}) // Выберем наши svg
		.pipe(app.gulp.dest(app.path.build.svg))
		.pipe(cheerio({
			run: ($, file) => {
				$('[fill]').removeAttr('fill');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(svgstore())
		.pipe(app.gulp.dest(app.path.build.svg))
		.pipe(app.plugins.browserSync.stream());
}

function svgToScssIcons(cb) {
	const svgsPath = app.path.src.svg.replace('*.svg', '')
		, elemToPath = (svgJson, object) => {
				const obj = object || { path: [], parameters: [] };

				if (/(rect|circle|ellipse|polygon|polyline|line|path)/.test(svgJson.name)) {
					obj.path.push(elementToPath(svgJson));

					Object.keys(svgJson.attributes).forEach((attrKey) => {
						/(fill-rule|clip-rule)/.test(attrKey) && obj.parameters.push(attrKey + '="' + svgJson.attributes[attrKey] + '"');
					});
				}

				if (svgJson.children && Array.isArray(svgJson.children)) {
					svgJson.children.forEach((child) => elemToPath(child, obj) );
				}

				return obj;
			}

	fs.readdir(svgsPath, function (err, svgFiles) {
		let iconsText = [], fileI = 0;

		for (var i = 0; i < svgFiles.length; i++) {
			const [fileName, fileExtension] = svgFiles[i].split('.');

			if (fileExtension.toLowerCase() != 'svg' || fileName.includes('sprite')) continue;

			fs.readFile(svgsPath + svgFiles[i], (err, data) => {
				++fileI;

				parse(data).then((json) => {
					const viewBoxArray = json.attributes.viewBox.split(' ')
						, { path, parameters } = elemToPath(json);

					iconsText.push(`${ fileName }: functions.buildIconPath((1: '${path.join(' ')}'), $parameters, '${parameters.join(' ')}') (${ viewBoxArray[2] },${ viewBoxArray[3] })`);

					fileI === svgFiles.length && fs.writeFile(app.path.srcFolder + '/assets/style/modules/_icons.scss', `@use 'sass:map';\n@use 'sass:list';\n@use 'functions';\n\n@function icon(\n\t$icon-name,\n\t$fill,\n\t$stroke-color: transparent,\n\t$stroke-width: 0,\n\t$css: '',\n\t$size: ''\n) {\n\t$parameters: (\n\t\t'fill': $fill,\n\t\t'stroke-color': $stroke-color,\n\t\t'stroke-width': $stroke-width,\n\t\t'css': $css,\n\t\t'size': $size,\n\t);\n\n\t$icons: (\n\t\t${iconsText.join(',\n\t\t')} \n\t);\n\n\t@if map.has-key($icons, $icon-name) {\n\t\t$icon: map.get($icons, $icon-name);\n\t\t$listSize: list.length($icon);\n\t\t$path: list.nth($icon, 1);\n\t\t$icon_size: list.nth($icon, 2);\n\t\t@if map.get($parameters, size) != '' {\n\t\t\t$icon_size: map.get($parameters, size);\n\t\t}\n\n\t\t$icon: functions.buildIcon($path, list.nth($icon, 2), $icon_size);\n\t\t@return url('data:image/svg+xml;utf8,#{$icon}');\n\t} @else {\n\t\t@return null;\n\t}\n}\n`, () => {
						cb();
						return app.gulp.src(`${app.path.srcFolder}`);
					});
				});
			});
		}
	});
}

export { image, svg, svgToScssIcons };
