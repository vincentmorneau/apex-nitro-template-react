const spawn = require('cross-spawn');

/**
 * @exports stages
 */
module.exports = {
    buildDev,
    buildProd,
    bundleDev,
    bundleProd,
    lint,
    jsdoc,
    test,
};

/**
 * @function buildDev
 * @returns {PromiseLike}
 * @description Entry point for apex-nitro for building the project
 */
async function buildDev() {
    await lint();
    await bundleDev();
    await bundleProd();
}

/**
 * @function buildProd
 * @returns {PromiseLike}
 * @description Entry point for apex-nitro for building the project
 */
async function buildProd() {
    await lint();
    await test();
    await jsdoc();
    await bundleDev();
    await bundleProd();
}

async function bundleDev() {
    try {
        await runCommand('npx', ['rollup', '-c', './rollup.config.js', '--environment', 'BUILD:dev']);
    } catch (err) {
        console.error(err);
        process.exit(0);
    }
}

async function bundleProd() {
    try {
        await runCommand('npx', ['rollup', '-c', './rollup.config.js', '--environment', 'BUILD:production']);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

async function lint() {
    try {
        await runCommand(
            'npx',
            ['eslint', '-c', '.eslintrc.json', '--ignore-path', '.eslintignore', './src/'],
            'inherit'
        );
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

async function jsdoc() {
    try {
        await runCommand('npx', ['jsdoc', '-c', './jsdoc.conf', '-d', './dist/doc', '-R', './README.md']);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

async function test() {
    try {
        await runCommand('npx', ['ava', './test/**/*.test.js'], 'inherit');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

function runCommand(command, args, stdioSetting = 'ignore') {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, {
            cwd: process.cwd(),
            stdio: stdioSetting,
        });
        child.on('close', code => {
            if (code !== 0) {
                reject({
                    command: `${command} ${args.join(' ')}`,
                });
                return;
            }
            resolve('done');
        });
    });
}
