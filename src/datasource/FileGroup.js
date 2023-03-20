import ngeoDatasourceFile from 'ngeo/datasource/File.js';
import ngeoDatasourceGroup from 'ngeo/datasource/Group.js';

/**
 * The options required to create a `FileGroup`.
 *
 * extends GroupOptions
 * @typedef {Object} FileGroupOptions
 * @property {!angular.auto.IInjectorService} injector Angular main injector.
 * @property {!Array.<!import('ngeo/datasource/DataSource.js').default>} dataSources (GroupOptions)
 * @property {string} title (GroupOptions)
 */

/**
 * @hidden
 */
export default class extends ngeoDatasourceGroup {
  /**
   * A FileGroup data source combines multiple `ngeo.datasource.File` objects.
   * Its main goal is to synchronize the added data source 'visible' properties
   * with the visibility of their layer 'visible' property.
   *
   * @param {FileGroupOptions} options Options.
   */
  constructor(options) {
    super(options);

    const injector = options.injector;

    // === PRIVATE properties ===

    /**
     * @type {!angular.IScope}
     * @private
     */
    this.rootScope_ = injector.get('$rootScope');

    /**
     * The functions to call to unregister the `watch` event on data sources
     * that are registered. Key is the id of the data source.
     * @type {!Object.<number, Function>}
     * @private
     */
    this.unregister_ = {};
  }

  /**
   * @inheritDoc
   */
  addDataSource(dataSource) {
    super.addDataSource(dataSource);
    console.assert(dataSource instanceof ngeoDatasourceFile);
    this.registerDataSource_(dataSource);
  }

  /**
   * @param {!import("ngeo/datasource/File.js").default} dataSource File data source to register.
   * @private
   */
  registerDataSource_(dataSource) {
    this.unregister_[dataSource.id] = this.rootScope_.$watch(
      () => dataSource.visible,
      this.handleDataSourceVisibleChange_.bind(this, dataSource)
    );
  }

  /**
   * @param {!import("ngeo/datasource/File.js").default} dataSource File data source.
   * @param {boolean|undefined} value Current visible property of the DS
   * @param {boolean|undefined} oldValue Old visible property of the DS
   * @private
   */
  handleDataSourceVisibleChange_(dataSource, value, oldValue) {
    if (value !== undefined) {
      dataSource.layer.setVisible(value);
    }
  }

  /**
   * @inheritDoc
   */
  removeDataSource(dataSource) {
    super.removeDataSource(dataSource);
    console.assert(dataSource instanceof ngeoDatasourceFile);
    this.unregisterDataSource_(dataSource);
  }

  /**
   * @param {!import("ngeo/datasource/File.js").default} dataSource File data source to unregister.
   * @private
   */
  unregisterDataSource_(dataSource) {
    this.unregister_[dataSource.id]();
    delete this.unregister_[dataSource.id];
  }
}
