/*
 * Redirect to https
 */
if (window.location.protocol == 'http:' &&
    window.location.port != '3000') {
  var restOfUrl = window.location.href.substr(5);
  /** @type {Location} */
  window.location = 'https:' + restOfUrl;
}
