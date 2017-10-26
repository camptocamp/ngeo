goog.provide('ngeo.datasource.FileGroup');

goog.require('ngeo');
goog.require('ngeo.datasource.Group');


ngeo.datasource.FileGroup = class extends ngeo.datasource.Group {

  /**
   * A FileGroup data source combines multiple `ngeo.datasource.File` objects.
   * Its main goal is to synchronize the added data source 'visible' properties
   * with the visibility of their layer 'visible' property.
   *
   * @struct
   * @param {ngeox.datasource.FileGroupOptions} options Options.
   */
  constructor(options) {

    super(options);

    const injector = options.injector;


    // === PRIVATE properties ===

    /**
     * @type {!angular.Scope}
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
    goog.asserts.assertInstanceof(dataSource, ngeo.datasource.File);
    this.registerDataSource_(dataSource);
  }

  /**
   * @param {!ngeo.datasource.File} dataSource File data source to register.
   * @private
   */
  registerDataSource_(dataSource) {
    this.unregister_[dataSource.id] = this.rootScope_.$watch(
      () => dataSource.visible,
      this.handleDataSourceVisibleChange_.bind(this, dataSource)
    );
  }

  /**
   * @param {!ngeo.datasource.File} dataSource File data source.
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
    goog.asserts.assertInstanceof(dataSource, ngeo.datasource.File);
    this.unregisterDataSource_(dataSource);
  }

  /**
   * @param {!ngeo.datasource.File} dataSource File data source to unregister.
   * @private
   */
  unregisterDataSource_(dataSource) {
    this.unregister_[dataSource.id]();
    delete this.unregister_[dataSource.id];
  }
};
