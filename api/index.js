import config from './src/constants.js';
import Map from './src/Map.js';

config.themesUrl = 'https://geomapfish-demo-2-5.camptocamp.com/themes?' +
  'version=2&background=background&interface=api';

config.localeUrl = 'https://geomapfish-demo-2-5.camptocamp.com/locale.json'

const lib = {
  Map
};

export default lib;
