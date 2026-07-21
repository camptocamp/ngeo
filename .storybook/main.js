// Storybook Webpack configuration.

const path = require('path');
const {merge} = require('webpack-merge');

function increaseSaxEntityLimit() {
  try {
    const sax = require('sax');
    sax.MAX_ENTITY_COUNT = 20000;
  } catch (_e) {
    try {
      const svgoDir = path.dirname(require.resolve('svgo/package.json'));
      const saxPath = path.join(svgoDir, 'node_modules', 'sax', 'lib', 'sax.js');
      const sax = require(saxPath);
      sax.MAX_ENTITY_COUNT = 20000;
    } catch (_e2) {
      // Unable to set sax MAX_ENTITY_COUNT; rely on webpack rule exclusion instead.
    }
  }
}
increaseSaxEntityLimit();

module.exports = (env, args) => {
  const storybookConfig = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-essentials', '@storybook/preset-scss'],
    webpackFinal: (config) => {
      const projectConfig = require('../webpack.config.js')(env, args);

      // Merge some webpack config from the project into the storybook config.
      const mergedConfig = {
        ...config,
        module: {...config.module, rules: projectConfig.module.rules},
        resolve: {...config.resolve, alias: {...config.resolve.alias, ...projectConfig.resolve.alias}},
      };

      // Remove the existing css rule
      mergedConfig.module.rules = mergedConfig.module.rules.filter(
        (f) => f.test.toString() !== '/\\.css$/' && f.test.toString() !== '/\\.scss$/'
      );

      // And add back the storybook one.
      const cssRule = config.module.rules.filter((f) => f.test.toString() === '/\\.css$/')[0];
      mergedConfig.module.rules.push(cssRule);

      // Exclude fontawesome SVGs from svgo processing using oneOf to avoid cascading loaders.
      // svgo 2.8.3 uses sax which enforces a 10,000 entity limit that FontAwesome SVGs exceed.
      const currentRules = mergedConfig.module.rules;
      mergedConfig.module.rules = [
        {
          oneOf: [
            {
              test: /@fortawesome\/.*\.svg$/,
              use: 'file-loader',
            },
            ...currentRules,
          ],
        },
      ];

      return mergedConfig;
    },
  };
  return storybookConfig;
};
