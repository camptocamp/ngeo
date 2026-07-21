// Storybook Webpack configuration.

const {merge} = require('webpack-merge');

// Increase sax entity count limit for FontAwesome SVGs with many entities.
// svgo 2.8.1+ migrated from @trysound/sax to upstream sax which enforces a 10,000 entity limit.
const sax = require('sax');
sax.MAX_ENTITY_COUNT = 20000;

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

      return mergedConfig;
    },
  };
  return storybookConfig;
};
