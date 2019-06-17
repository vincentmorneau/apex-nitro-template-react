const inquirer = require('inquirer');

/**
 * @exports init
 */
module.exports = init;

/**
 * @function init
 * @param appDetails
 * @param {string} appDetails.appName
 * @param {string} appDetails.appPath
 * @param {boolean} appDetails.suppressInquiry
 * @returns {PromiseLike}
 * @description Entry point for creating a new app with the template
 */
async function init(appDetails) {
    // Create template config with defaults
    const config = {
        projectName: appDetails.appName,
        srcFolder: './src',
        version: '1.0.0'
    };

    if (appDetails.suppressInquiry) {
        return config;
    }

    // Ask questions
    const answers = await inquirer.prompt(getTemplateQuestions(appDetails));

    // Set main answers
    config.projectName = answers['projectName'];

    return config;
}

/**
 * @private
 */
function getTemplateQuestions(appDetails) {
    return [
        {
            name: 'projectName',
            type: 'input',
            default: appDetails.appName,
            message: 'Project name:',
            validate: (input) => {
                if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
                else return 'The project name may only include letters, numbers, underscores and hashes.';
            }
        }
    ];
}