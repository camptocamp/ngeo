import {cypressBrowserPermissionsPlugin} from 'cypress-browser-permissions';

module.exports = (on, config) => {
  config = cypressBrowserPermissionsPlugin(on, config);
  return config;
};
