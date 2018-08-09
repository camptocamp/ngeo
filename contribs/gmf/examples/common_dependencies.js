import 'gmf/sass/vars.scss'
import 'jquery';
import 'angular';
import 'angular-gettext';

import 'ol/ol.css';
import 'bootstrap/dist/css/bootstrap.css';

/*
 * Auto redirect to https to prevent CORS exceptions
 */
if (window.location.protocol == 'http:' && window.location.hostname != 'localhost') {
  const restOfUrl = window.location.href.substr(5);
  /** @type {Location} */
  window.location = `https:${restOfUrl}`;
}
