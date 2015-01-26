/**
 * @fileoverview Provides a function that synchronizes two arrays, arr1 and
 * arr2. arr2 is a subset of arr1, it includes the elements of arr1 that passes
 * the filter. When elements are added to/removed from arr1, arr2 is updated to
 * include the elements of arr1 that pass the filter. When the order of
 * elements in arr2 changes, arr1 is reordered to have the same order as arr2.
 *
 * This can for example be used to synchronize the array of layers in the map
 * with the array of selected layers, where layers may be added to/removed from
 * the map, and the order of selected layers may change.
 *
 * Example:
 *
 * ngeoArraySync(map.getLayers().getArray(), selectedLayers, scope,
 *     function(layer) {
 *       // exclude the layer at index 0 in the map
 *       return map.getLayers().indexOf(layer) !== 0;
 *     });
 *
 */

goog.provide('ngeo.ArraySync');

goog.require('goog.asserts');
goog.require('ngeo');


/**
 * @typedef {function(Array.<*>, Array.<*>, angular.Scope,
 *     function(*):boolean)}
 */
ngeo.ArraySync;


/**
 * @param {Array.<T>} arr1 Array 1.
 * @param {Array.<T>} arr2 Array 2.
 * @param {angular.Scope} scope Angular scope. Used to watch arr1 and arr2
 *     using $watchCollection.
 * @param {function(T):boolean} filter Filter function.
 * @template T
 */
ngeo.arraySync = function(arr1, arr2, scope, filter) {


  // Update arr2 when elements are added to, or removed from, arr1.

  scope.$watchCollection(function() {
    return arr1;
  }, function() {
    var i, ii, j;
    for (i = 0, ii = arr1.length, j = 0; i < ii; ++i) {
      if (filter(arr1[i])) {
        arr2[j++] = arr1[i];
      }
    }
    arr2.length = j;
  });


  // Update arr1 when the order of elements changes in arr2.

  /**
   * @type {Array.<number>}
   */
  var indices = [];

  scope.$watchCollection(function() {
    return arr2;
  }, function() {
    // find the positions in arr1 of the elements that pass the
    // filter
    var i, ii, j;
    for (i = 0, ii = arr1.length, j = 0; i < ii; ++i) {
      if (filter(arr1[i])) {
        indices[j++] = i;
      }
    }
    indices.length = j;
    // now reorder arr1
    goog.asserts.assert(indices.length == arr2.length);
    for (i = 0, ii = arr2.length; i < ii; ++i) {
      arr1[indices[i]] = arr2[i];
    }
  });
};


ngeoModule.value('ngeoArraySync', ngeo.arraySync);
