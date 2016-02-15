goog.provide('ngeo.SyncArrays');

goog.require('goog.asserts');
goog.require('ngeo');


/**
 * Provides a function that synchronizes two arrays, arr1 and
 * arr2. arr2 is a subset of arr1, it includes the elements of arr1 that passes
 * the filter. When elements are added to/removed from arr1, arr2 is updated to
 * include the elements of arr1 that pass the filter. When the order of
 * elements in arr2 changes, arr1 is reordered to have the same order as arr2.
 *
 * This can for example be used to synchronize the array of layers in the map
 * with the array of selected layers, where layers may be added to/removed from
 * the map, and the order of selected layers may change.
 *
 *     var dereg = ngeoSyncArrays(map.getLayers().getArray(), selectedLayers,
 *         true, scope, function(layer) {
 *           // exclude the layer at index 0 in the map
 *           return map.getLayers().indexOf(layer) !== 0;
 *         });
 *
 * This will return a function that can be called to cancel synchronization.
 *
 * @typedef {function(Array, Array, boolean, angular.Scope,
 *     function(?):boolean)}
 * @ngdoc service
 * @ngname ngeoSyncArrays
 */
ngeo.SyncArrays;


/**
 * @param {Array.<T>} arr1 Array 1.
 * @param {Array.<T>} arr2 Array 2.
 * @param {boolean} reverse `true` if arr2 is in reverse order, `false`
 *     otherwise.
 * @param {angular.Scope} scope Angular scope. Used to watch arr1 and arr2
 *     using $watchCollection.
 * @param {function(T):boolean} filter Filter function.
 * @return {function()} Function to call to stop synchronization
 * @template T
 */
ngeo.syncArrays = function(arr1, arr2, reverse, scope, filter) {


  // Update arr2 when elements are added to, or removed from, arr1.

  var dereg1 = scope.$watchCollection(function() {
    return arr1;
  }, function() {
    var i, ii, j;
    if (reverse) {
      for (i = arr1.length - 1, j = 0; i >= 0; --i) {
        if (filter(arr1[i])) {
          arr2[j++] = arr1[i];
        }
      }
    } else {
      for (i = 0, ii = arr1.length, j = 0; i < ii; ++i) {
        if (filter(arr1[i])) {
          arr2[j++] = arr1[i];
        }
      }
    }
    arr2.length = j;
  });


  // Update arr1 when the order of elements changes in arr2.

  var dereg2 = scope.$watchCollection(function() {
    return arr2;
  }, function() {
    var i, ii, j;
    if (reverse) {
      for (i = 0, ii = arr1.length, j = arr2.length - 1; i < ii; ++i) {
        if (filter(arr1[i])) {
          arr1[i] = arr2[j--];
        }
      }
      goog.asserts.assert(j == -1);
    } else {
      for (i = 0, ii = arr1.length, j = 0; i < ii; ++i) {
        if (filter(arr1[i])) {
          arr1[i] = arr2[j++];
        }
      }
      goog.asserts.assert(j == arr2.length);
    }
  });

  return function() {
    dereg1();
    dereg2();
  };
};


ngeo.module.value('ngeoSyncArrays', ngeo.syncArrays);
