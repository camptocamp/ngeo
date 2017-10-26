goog.provide('gmf.datasource.DataSourcesHelper');

goog.require('gmf');
goog.require('gmf.EnumerateAttribute');
goog.require('ngeo.datasource.DataSourcesHelper');


gmf.datasource.DataSourcesHelper = class {

  /**
   * A service that provides utility methods to manipulate or get GMF data
   * sources.
   *
   * @struct
   * @param {angular.$q} $q The Angular $q service.
   * @param {gmf.EnumerateAttribute} gmfEnumerateAttribute The Gmf enumerate
   *     attribute service.
   * @param {ngeo.datasource.DataSourcesHelper} ngeoDataSourcesHelper Ngeo data
   *     source helper service.
   * @ngdoc service
   * @ngname gmfDataSourcesHelper
   * @ngInject
   */
  constructor($q, gmfEnumerateAttribute, ngeoDataSourcesHelper) {

    // === Injected properties ===

    /**
     * @type {angular.$q}
     * @private
     */
    this.q_ = $q;

    /**
     * @type {gmf.EnumerateAttribute}
     * @private
     */
    this.gmfEnumerateAttribute_ = gmfEnumerateAttribute;

    /**
     * @type {ngeo.datasource.DataSourcesHelper}
     * @private
     */
    this.ngeoDataSourcesHelper_ = ngeoDataSourcesHelper;


    // === Other properties ===

    /**
     * @type {gmf.datasource.DataSources}
     * @protected
     */
    this.collection_;

    /**
     * @type {Object.<number, gmf.datasource.OGC>}
     * @protected
     */
    this.cache_;
  }

  /**
   * @return {gmf.datasource.DataSources} Data sources collection.
   * @export
   */
  get collection() {
    return /** @type {gmf.datasource.DataSources} */ (
      this.ngeoDataSourcesHelper_.collection
    );
  }

  /**
   * Return a data source using its id.
   * @param {number} id Data source id.
   * @return {?gmf.datasource.OGC} Data source.
   * @export
   */
  getDataSource(id) {
    return /** @type {?gmf.datasource.OGC} */ (
      this.ngeoDataSourcesHelper_.getDataSource(id)
    );
  }

  /**
   * @param {gmf.datasource.OGC} dataSource Filtrable data source.
   * @return {angular.$q.Promise} Promise.
   * @export
   */
  prepareFiltrableDataSource(dataSource) {

    const prepareFiltrableDataSourceDefer = this.q_.defer();

    // (1) Get the attributes. The first time, they will be asynchronously
    //     obtained using a WFS DescribeFeatureType request.
    this.ngeoDataSourcesHelper_.getDataSourceAttributes(
      dataSource
    ).then((attributes) => {
      // (2) The attribute names that are in the `enumeratedAttributes`
      //     metadata are the ones that need to have their values fetched.
      //     Do that once then set the type to SELECT and the choices.
      const meta = dataSource.gmfLayer.metadata || {};
      const enumAttributes = meta.enumeratedAttributes;
      if (enumAttributes && enumAttributes.length) {
        const promises = [];
        for (const attribute of attributes) {
          if (ol.array.includes(enumAttributes, attribute.name) &&
             attribute.type !== ngeo.AttributeType.SELECT &&
             (!attribute.choices || !attribute.choices.length)) {
            promises.push(
              this.gmfEnumerateAttribute_.getAttributeValues(
                dataSource, attribute.name
              ).then((values) => {
                const choices = values.map(choice => choice.value);
                attribute.type = ngeo.AttributeType.SELECT;
                attribute.choices = choices;
              })
            );
          }
        }
        return this.q_.all(promises).then(
          prepareFiltrableDataSourceDefer.resolve(dataSource)
        );
      } else {
        prepareFiltrableDataSourceDefer.resolve(dataSource);
      }
    });

    return prepareFiltrableDataSourceDefer.promise;
  }

};


gmf.module.service('gmfDataSourcesHelper', gmf.datasource.DataSourcesHelper);


/**
 * @typedef {ol.Collection.<gmf.datasource.OGC>}
 */
gmf.datasource.DataSources;
