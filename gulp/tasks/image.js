import imagemin, { gifsicle, mozjpeg, optipng } from 'gulp-imagemin';
import webp from 'gulp-webp';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';
import fs from 'fs';
import deleteAsync from 'del';
import { parse, stringify } from 'svgson';
import elementToPath from 'element-to-path';

function image() {
	return app.gulp
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
		.pipe(app.gulp.src('./src/assets/img/*.svg'))
		.pipe(app.gulp.dest(app.path.build.img)) // И бросим в build
		.pipe(app.plugins.browserSync.stream());
}

function svg() {
	return app.gulp
		.src(app.path.src.svg, {
			encoding: false,
			since: app.gulp.lastRun(svg),
		}) // Выберем наши svg
		.pipe(app.gulp.dest(app.path.build.svg))
		.pipe(svgmin())
		.pipe(svgstore())
		.pipe(app.gulp.dest(app.path.build.svg))
		.pipe(app.plugins.browserSync.stream());
}

function svgToScssIcons() {
	const svgsPath = app.path.src.svg.replace('*.*', ''),
		filesObj = {},
		scssFile = app.path.srcFolder + '/assets/style/modules/_icons.scss';

	let fileIndex = 0;

	fs.readdir(svgsPath, function (err, svgFiles) {
		for (var i = 0; i < svgFiles.length; i++) {
			const fileName = svgFiles[i].split('.')[0];

			fs.readFile(svgsPath + svgFiles[i], (err, input) => {
				const elemToPath = (svgJson) => {
					if (/(rect|circle|ellipse|polygon|polyline|line|path)/.test(svgJson.name)) {
						filesObj[fileName].path.push(elementToPath(svgJson));
						Object.keys(svgJson.attributes).forEach((attrKey) => {
							/(fill-rule|clip-rule)/.test(attrKey) && filesObj[fileName].parameters.push(attrKey + '="' + svgJson.attributes[attrKey] + '"')
						});
					} else if (svgJson.children && Array.isArray(svgJson.children)) {
						svgJson.children.forEach((child) => {
							elemToPath(child);
						});
					}
				};

				parse(input).then((json) => {
					const viewBoxArray = json.attributes.viewBox.split(' ');

					filesObj[fileName] = {
						path: [],
						size: `(${viewBoxArray[2]},${viewBoxArray[3]})`,
						parameters: [],
					};

					elemToPath(json);

					if (++fileIndex === svgFiles.length) {
						let iconsText = [];

						for (let iconName in filesObj) {
							const { path, size, parameters } = filesObj[iconName];
							iconsText.push(
								`${iconName}: functions.buildIconPath((1: '${path.join(
									' '
								)}'), $parameters, '${parameters.join(' ')}') ${size}`
							);
						}

						deleteAsync([scssFile]).then(function (paths) {
							fs.writeFile(
								scssFile,
								`@use 'sass:map';
@use 'sass:list';
@use 'functions';

@function icon(
	$icon-name,
	$fill,
	$stroke-color: transparent,
	$stroke-width: 0,
	$css: '',
	$size: ''
) {
	$parameters: (
		'fill': $fill,
		'stroke-color': $stroke-color,
		'stroke-width': $stroke-width,
		'css': $css,
		'size': $size,
	);

	$icons: (
		${iconsText.join(',\n\t\t')}
	);

	@if map.has-key($icons, $icon-name) {
		$icon: map.get($icons, $icon-name);
		$listSize: list.length($icon);
		$path: list.nth($icon, 1);
		$icon_size: list.nth($icon, 2);
		@if map.get($parameters, size) != '' {
			$icon_size: map.get($parameters, size);
		}

		$icon: functions.buildIcon($path, list.nth($icon, 2), $icon_size);
		@return url('data:image/svg+xml;utf8,#{$icon}');
	} @else {
		@return null;
	}
}\n`,
								cb
							);
						});
					}
				});
			});
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`);
	function cb() {}
}

export { image, svg, svgToScssIcons };
