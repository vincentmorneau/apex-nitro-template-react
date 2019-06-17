const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
const config = defaults.__get__('config');
const nitro = require('./apexnitro.config.json');

// Consolidate chunk files instead
config.optimization.splitChunks = {
  cacheGroups: {
    default: false,
  },
};
// Move runtime into bundle instead of separate file
config.optimization.runtimeChunk = false;

// JS
config.output.filename = `static/js/${nitro.projectName}.min.js`;
// CSS. "5" is MiniCssPlugin
config.plugins[5].options.filename = `static/css/${nitro.projectName}.min.css`;