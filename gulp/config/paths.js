const buildFolder = "./build",
	srcFolder = "./src";

export const filePaths = {
	build: {
		// Тут мы укажем куда складывать готовые после сборки файлы
		root: buildFolder + "/",
		html: buildFolder + "/",
		style: buildFolder + "/assets/css/",
		js: buildFolder + "/assets/js/",
		json: buildFolder + "/",
		img: buildFolder + "/assets/img/",
		svg: buildFolder + "/assets/img/svg/",
		fonts: buildFolder + "/assets/fonts/",
	},
	src: {
		// Пути откуда брать исходники
		root: srcFolder + "/assets/root/**/*.*",
		html: [
			srcFolder + "/**/*.njk",
			srcFolder + "/**/*.html",
			"!" + srcFolder + "/templates/**",
		],
		style: srcFolder + "/assets/style/**/*.scss",
		js: srcFolder + "/assets/js/**/*.js",
		json: srcFolder + "/*.json",
		img: srcFolder + "/assets/img/**/*.*",
		svg: srcFolder + "/assets/img/svg/*.*",
		fonts: srcFolder + "/assets/fonts/",
	},
	watch: {
		// Тут мы укажем, за изменением каких файлов мы хотим наблюдать
		root: srcFolder + "/assets/root/**/*.*",
		html: [srcFolder + "/**/*.njk", srcFolder + "/**/*.html"],
		style: srcFolder + "/assets/style/**/*.scss",
		js: srcFolder + "/assets/js/**/*.js",
		json: srcFolder + "/*.json",
		img: srcFolder + "/assets/img/**/*.*",
		svg: srcFolder + "/assets/img/svg/*.*",
	},
	clean: buildFolder,
	buildFolder,
	srcFolder,
};
