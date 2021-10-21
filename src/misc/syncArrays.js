// The MIT License (MIT)
//
// Copyright (c) 2015-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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
 *     let dereg = ngeoSyncArrays(map.getLayers().getArray(), selectedLayers,
 *         true, scope, function(layer) {
 *           // exclude the layer at index 0 in the map
 *           return map.getLayers().indexOf(layer) !== 0;
 *         });
 *
 * This will return a function that can be called to cancel synchronization.
 *
 * @param {T[]} arr1 Array 1.
 * @param {T[]} arr2 Array 2.
 * @param {boolean} reverse `true` if arr2 is in reverse order, `false`
 *     otherwise.
 * @param {angular.IScope} scope Angular scope. Used to watch arr1 and arr2
 *     using $watchCollection.
 * @param {function(T):boolean} filter Filter function.
 * @returns {function()} Function to call to stop synchronization
 * @template T
 * @hidden
 */
function syncArrays(arr1, arr2, reverse, scope, filter) {
  // Update arr2 when elements are added to, or removed from, arr1.

  const dereg1 = scope.$watchCollection(
    () => arr1,
    () => {
      let i, ii, j;
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
    }
  );

  // Update arr1 when the order of elements changes in arr2.

  const dereg2 = scope.$watchCollection(
    () => arr2,
    () => {
      let i, ii, j;
      if (reverse) {
        for (i = 0, ii = arr1.length, j = arr2.length - 1; i < ii; ++i) {
          if (filter(arr1[i])) {
            arr1[i] = arr2[j--];
          }
        }
        console.assert(j == -1);
      } else {
        for (i = 0, ii = arr1.length, j = 0; i < ii; ++i) {
          if (filter(arr1[i])) {
            arr1[i] = arr2[j++];
          }
        }
        console.assert(j == arr2.length);
      }
    }
  );

  return function () {
    dereg1();
    dereg2();
  };
}

export default syncArrays;
