import 'jquery';
import 'angular';
import 'angular-gettext';
import '../utils/watchwatchers.js';

import 'openlayers/css/ol.css';
import 'bootstrap/dist/css/bootstrap.css';

/*
 * Auto redirect to https to prevent CORS exceptions
 */
if (window.location.protocol === 'http:' && window.location.host !== 'localhost') {
  const restOfUrl = window.location.href.substr(5);
  /** @type {Location} */
  window.location = `https:${restOfUrl}`;
}
