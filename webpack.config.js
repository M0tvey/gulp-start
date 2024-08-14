import { resolve, join } from 'path';
import { readDir } from './gulp/config/read-dir.js';

export const webpackConfig = async (isBuild) => {
	const paths = {
		src: resolve('src/assets'),
		build: resolve('build'),
	};

	const context = join(paths.src, 'js');

	return {
		context,
		entry: await readDir(context),
		mode: isBuild ? 'development' : 'production',
		output: {
			path: join(paths.build, 'js'),
			filename: '[name].min.js',
      sourceMapFilename: '[file].map',
			publicPath: '/',
		},
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'esbuild-loader',
						options: { target: 'ES6' },
					},
					resolve: {
						fullySpecified: false,
					},
				},
			],
		},
	};
};