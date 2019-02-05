import angular from 'angular';
import * as olArray from 'ol/array.js';

export class SavedFilter {

  /**
   * The GeoMapFish service responsible of storing filters that can be applied
   * to data sources. A filter consists of:
   *
   * - a condition
   * - a list of directed rules
   * - a list of custom rules
   * - a data source
   * - a name
   *
   * The filters are saved in the browser local storage, if available.
   * Otherwise, they are kept in this service for the duration of the visit.
   *
   * @param {!angular.IScope} $rootScope Angular rootScope.
   * @ngInject
   * @ngdoc service
   * @ngname gmfSavedFilters
   */
  constructor($rootScope) {

    /**
     * @type {!angular.IScope}
     * @private
     */
    this.rootScope_ = $rootScope;

    /**
     * This service can have a data source id bound to it, which automatically
     * populates an array of items that are only bound to this data source.
     * @type {?number}
     * @private
     */
    this.currentDataSourceId_ = null;

    /**
     * @type {!Array.<!SavedFilterItem>}
     * @private
     */
    this.currentDataSourceItems_ = [];

    /**
     * The used by this service to save in the local storage.
     * @type {string}
     * @private
     */
    this.localStorageKey_ = 'gmf_savedfilters';

    /**
     * @type {boolean}
     * @private
     */
    this.useLocalStorage_ = true;

    try {
      if ('localStorage' in window) {
        window.localStorage['test'] = '';
        delete window.localStorage['test'];
      } else {
        this.useLocalStorage_ = false;
      }
    } catch (err) {
      console.error(err);
      this.useLocalStorage_ = false;
    }

    /**
     * @type {!Array.<!SavedFilterItem>}
     * @private
     */
    this.items_ = [];

    this.rootScope_.$watchCollection(
      () => this.items,
      () => {
        this.rePopulateCurrentDataSourceItems_();
      }
    );

    if (this.useLocalStorage_) {
      this.loadItemsFromLocalStorage_();
    }

  }

  /**
   * @return {!Array.<!SavedFilterItem>} Items
   * @export
   */
  get currentDataSourceItems() {
    return this.currentDataSourceItems_;
  }

  /**
   * @param {?number} id Current data source id.
   * @export
   */
  set currentDataSourceId(id) {
    this.currentDataSourceId_ = id;
    this.rePopulateCurrentDataSourceItems_();
  }

  /**
   * @return {!Array.<!SavedFilterItem>} Items
   * @export
   */
  get items() {
    return this.items_;
  }

  /**
   * Read the filter items that are saved in the local storage and set them
   * as this service's items.
   * @private
   */
  loadItemsFromLocalStorage_() {
    if (window.localStorage[this.localStorageKey_]) {
      const items = JSON.parse(window.localStorage[this.localStorageKey_]);
      console.assert(Array.isArray(items));
      this.items_ = items;
    }
  }

  /**
   * Search for an item using a given name and data source id. Returns the
   * index if it exists, otherwise -1 is returned.
   * @param {string} name Name.
   * @param {number} id Data source id.
   * @return {number} The index of the item, if it exists.
   * @export
   */
  indexOfItem(name, id) {

    let item;
    let idx = -1;
    for (let i = 0, ii = this.items_.length; i < ii; i++) {
      item = this.items[i];
      if (item.dataSourceId === id && item.name === name) {
        idx = i;
        break;
      }
    }

    return idx;
  }

  /**
   * @param {!SavedFilterItem} item Item.
   * @export
   */
  save(item) {

    // (1) Add or replace item
    const idx = this.indexOfItem(item.name, item.dataSourceId);
    if (idx !== -1) {
      this.items[idx] = item;
    } else {
      this.items.push(item);
    }

    // (2) Update local storage
    if (this.useLocalStorage_) {
      this.saveItemsInLocalStorage_();
    }
  }

  /**
   * @param {!SavedFilterItem} item Item.
   * @export
   */
  remove(item) {

    // (1) Remove the item
    const found = olArray.remove(this.items, item);

    // (2) Update local storage
    if (found && this.useLocalStorage_) {
      this.saveItemsInLocalStorage_();
    }
  }

  /**
   * Save all items in the local storage.
   * @private
   */
  saveItemsInLocalStorage_() {
    window.localStorage[this.localStorageKey_] = JSON.stringify(this.items);
  }

  /**
   * @private
   */
  rePopulateCurrentDataSourceItems_() {
    // (1) Clear existing items
    this.currentDataSourceItems_.length = 0;

    // (2) Populate
    if (this.currentDataSourceId_ !== null) {
      for (const item of this.items) {
        if (item.dataSourceId === this.currentDataSourceId_) {
          this.currentDataSourceItems_.push(item);
        }
      }
    }
  }

}


const module = angular.module('gmfSavedFilters', []);

module.service('gmfSavedFilters', SavedFilter);


/**
 * The definition of a saved filter item.
 * @constructor
 * @export
 */
export function SavedFilterItem() {}


/**
 * The condition of the saved filter item.
 * @type {string}
 * @export
 */
SavedFilterItem.prototype.condition;


/**
 * The list of custom rules of the saved filter item.
 * @type {!Array.<!import("ngeo/filter/RuleHelper.js").AnyOptions>}
 * @export
 */
SavedFilterItem.prototype.customRules;


/**
 * The data source id related to the filter.
 * @type {number}
 * @export
 */
SavedFilterItem.prototype.dataSourceId;


/**
 * The list of directed rules of the saved filter item.
 * @type {!Array.<!import("ngeo/filter/RuleHelper.js").AnyOptions>}
 * @export
 */
SavedFilterItem.prototype.directedRules;


/**
 * A human-readable name given to the saved filter item.
 * @type {string}
 * @export
 */
SavedFilterItem.prototype.name;


export default module;
