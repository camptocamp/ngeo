import {includes as olArrayIncludes} from 'ol/array.js';


/**
 * Push an object in an array, unless already there.
 * @param {Array.<*>} arr The array to push the element.
 * @param {*} obj The object for which to test.
 * @return {boolean} The object has been pushed in the array.
 */
export function pushUnlessIncluded(arr, obj) {
  let ret = false;
  if (!olArrayIncludes(arr, obj)) {
    arr.push(obj);
    ret = true;
  }
  return ret;
}
