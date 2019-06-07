const { buildDev, buildProd, bundleDev, bundleProd, jsdoc, lint, test } = require('./build-phases');
const commander = require('commander');

if (process.argv.slice(2).length > 0) {
    // Define options
    commander
        .version('0.0.1')
        .option('-d --build-dev', 'Build the project in development mode')
        .option('-p --build-prod', 'Build the project in production mode')
        .option('-b --bundle-dev', 'Bundle the project in development mode')
        .option('-r --bundle-prod', 'Bundle the project in production mode')
        .option('-j --jsdoc', 'Create the JSDoc documentation')
        .option('-l --lint', 'Lint the project')
        .option('-t --test', 'Run tests')
        .parse(process.argv);

    // Take option specific action
    if (commander.buildDev) {
        (async () => {
            await buildDev();
        })();
    } else if (commander.buildProd) {
        (async () => {
            await buildProd();
        })();
    } else if (commander.bundleDev) {
        (async () => {
            await bundleDev();
        })();
    } else if (commander.bundleProd) {
        (async () => {
            await bundleProd();
        })();
    } else if (commander.jsdoc) {
        (async () => {
            await jsdoc();
        })();
    } else if (commander.lint) {
        (async () => {
            await lint();
        })();
    } else if (commander.test) {
        (async () => {
            await test();
        })();
    }
} else {
    // Default action, when no option is given
    (async () => {
        await launchBuild();
    })();
}
