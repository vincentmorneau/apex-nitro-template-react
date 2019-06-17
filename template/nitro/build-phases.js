const spawn = require('cross-spawn');

/**
 * @exports
 */
module.exports = {
    lint,
    test,
    bundleDev,
    bundleProd
};

async function lint() {
    try {
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
    } catch (err) {
        return false;
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

/**
 * @function bundleDev
 * @returns {PromiseLike}
 * @description Builds the react project
 */
async function bundleDev() {
    try {
        // await runCommand('node', ["./.rescriptbuild.js"]);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

/**
 * @function bundleProd
 * @returns {PromiseLike}
 * @description Builds the react project
 */
async function bundleProd() {
    try {
        await runCommand('node', ["./.rescriptbuild.js"]);
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
