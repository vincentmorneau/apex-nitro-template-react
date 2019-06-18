const spawn = require('cross-spawn');
const chalk = require('chalk');

/**
 * @exports
 */
module.exports = {
	lint,
	test,
	buildDev,
	buildProd,
	bundleDev,
	bundleProd
};

async function lint() {
	try {
		console.log(chalk.cyan('=> linting source code'));
		await runCommand(
			'npx',
			['eslint', '-c', '.eslintrc.json', '--ignore-path', '.eslintignore', './src/'],
			'inherit'
		);

		await runCommand(
			'npx',
			['stylelint', 'src/css/**/*.{css,less,sass,scss}'],
			'inherit'
		);

		return true;
	} catch (error) {
		return false;
	}
}

async function test() {
	try {
		console.log(chalk.cyan('=> executing tests'));
		await runCommand('npx', ['ava'], 'inherit');
		return true;
	} catch (error) {
		return false;
	}
}

/**
 * @function buildDev
 * @returns {PromiseLike}
 * @description Entry point for apex-nitro for building the project
 */
async function buildDev() {
	let phaseValid = await lint();
	if (!phaseValid) {
		return false;
	}

	phaseValid = await bundleDev();
	return phaseValid;
}

/**
 * @function buildProd
 * @returns {PromiseLike}
 * @description Entry point for apex-nitro for building the project
 */
async function buildProd() {
	let phaseValid = await lint();
	if (!phaseValid) {
		return false;
	}

	phaseValid = await test();
	if (!phaseValid) {
		return false;
	}

	phaseValid = await bundleProd();
	return phaseValid;
}

/**
 * @function bundleDev
 * @returns {PromiseLike}
 * @description Builds the react project
 */
async function bundleDev() {
	try {
		console.log(chalk.cyan('=> bundling development files'));
		await runCommand('node', ['./.rescriptbuild.js']);
		console.log('');
		return true;
	} catch (error) {
		return false;
	}
}

/**
 * @function bundleProd
 * @returns {PromiseLike}
 * @description Builds the react project
 */
async function bundleProd() {
	try {
		console.log(chalk.cyan('=> bundling production files'));
		await runCommand('node', ['./.rescriptbuild.js']);
		console.log('');
		return true;
	} catch (error) {
		return false;
	}
}

function runCommand(command, args, stdioSetting = ['ignore', 'ignore', process.stderr]) {
	return new Promise((resolve, reject) => {
		const child = spawn(command, args, {
			cwd: process.cwd(),
			stdio: stdioSetting
		});
		child.on('close', code => {
			if (code !== 0) {
				reject({
					command: `${command} ${args.join(' ')}`
				});
				return;
			}

			resolve('done');
		});
	});
}
