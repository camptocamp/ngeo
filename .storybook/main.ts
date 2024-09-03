import type {StorybookConfig} from '@storybook/web-components-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],

  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/preset-scss',
  ],

  framework: {
    name: '@storybook/web-components-webpack5',
    options: {},
  },

  docs: {
    autodocs: true,
  },

  webpackFinal: (config) => {
    const projectConfig = require('../webpack.config.js')(null, {mode: config.mode});

    // Merge some webpack config from the project into the storybook config.
    const mergedConfig = {
      ...config,
      module: {...config.module, rules: projectConfig.module.rules},
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          ...projectConfig.resolve.alias,
        },
        fallback: {
          ...config.resolve.fallback,
          os: false,
          tty: false,
        },
      },
    };

    return mergedConfig;
  },
};
export default config;
