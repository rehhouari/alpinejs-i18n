const fs = require('fs');
const brotliSize = require('brotli-size');

if (!fs.existsSync('./dist')) {
	fs.mkdirSync('./dist', '0744');
}

// Go through each file in the src's "build" directory
// and use the appropriate bundling strategy based on its name.
fs.readdirSync('./builds').forEach((file) => {
	bundleFile(file);
});

function bundleFile(file) {
	// Based on the filename, give esbuild a specific configuration to build.
	({
		// This output file is meant to be loaded in a browser's <script> tag.
		'cdn.js': () => {
			build({
				entryPoints: [`builds/${file}`],
				outfile: `dist/${file}`,
				bundle: true,
				platform: 'browser',
				define: { CDN: true },
			});

			// Build a minified version.
			build({
				entryPoints: [`builds/${file}`],
				outfile: `dist/${file.replace('.js', '.min.js')}`,
				bundle: true,
				minify: true,
				platform: 'browser',
				define: { CDN: true },
			}).then(() => {
				outputSize(`dist/${file.replace('.js', '.min.js')}`);
			});
		},
		// This file outputs two files: an esm module and a cjs module.
		// The ESM one is meant for "import" statements (bundlers and new browsers)
		// and the cjs one is meant for "require" statements (node).
		'module.js': () => {
			build({
				entryPoints: [`builds/${file}`],
				outfile: `dist/${file.replace('.js', '.esm.js')}`,
				bundle: true,
				platform: 'neutral',
				mainFields: ['main', 'module'],
			});

			// Minified ESM file
			build({
				entryPoints: [`builds/${file}`],
				outfile: `dist/${file.replace('.js', '.esm.min.js')}`,
				bundle: true,
				minify: true,
				platform: 'neutral',
				mainFields: ['main', 'module'],
			}).then(() => {
				outputSize(`dist/${file.replace('.js', '.esm.min.js')}`);
			});

			build({
				entryPoints: [`builds/${file}`],
				outfile: `dist/${file.replace('.js', '.cjs.js')}`,
				bundle: true,
				target: ['node10.4'],
				platform: 'node',
			});
		},
	})[file]();
}

function build(options) {
	options.define || (options.define = {});
	options.define['process.env.NODE_ENV'] = process.argv.includes(
		'--production',
	)
		? "'production'"
		: "'development'";

	return require('esbuild')
		.build({
			watch: process.argv.includes('--watch'),
			...options,
		})
		.catch(() => process.exit(1));
}

function outputSize(file) {
	const size = bytesToSize(brotliSize.sync(fs.readFileSync(file)));

	console.log('\x1b[32m', file + ' : ' + size);
}

function bytesToSize(bytes) {
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes === 0) return 'n/a';
	const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
	if (i === 0) return `${bytes} ${sizes[i]}`;
	return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]} `;
}
