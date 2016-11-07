goog.provide('ngeo.string');


/**
 * @param {*} str The string to url-encode.
 * @return {string} The encoded string.
 */
ngeo.string.urlEncode = function(str) {
  return encodeURIComponent(String(str));
};


/**
 * @param {string} str The string to url decode.
 * @return {string} The decoded string.
 */
ngeo.string.urlDecode = function(str) {
  return decodeURIComponent(str.replace(/\+/g, ' '));
};
