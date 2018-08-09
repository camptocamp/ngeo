/**
 * @module ngeo.mainmodule
 */
import ngeoDatasourceModule from 'ngeo/datasource/module.js';
import ngeoDownloadModule from 'ngeo/download/module.js';
import ngeoDrawModule from 'ngeo/draw/module.js';
import ngeoEditingModule from 'ngeo/editing/module.js';
import ngeoFilterModule from 'ngeo/filter/module.js';
import ngeoGooglestreetviewModule from 'ngeo/googlestreetview/module.js';
import ngeoGridModule from 'ngeo/grid/module.js';
import ngeoLayertreeModule from 'ngeo/layertree/module.js';
import ngeoMapModule from 'ngeo/map/module.js';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';
import ngeoMeasureModule from 'ngeo/measure/module.js';
import ngeoPrintModule from 'ngeo/print/module.js';
import ngeoProfileModule from 'ngeo/profile/module.js';
import ngeoQueryModule from 'ngeo/query/module.js';
import ngeoSearchModule from 'ngeo/search/module.js';
import ngeoStatemanagerModule from 'ngeo/statemanager/module.js';
import ngeoStatemanagerWfsPermalink from 'ngeo/statemanager/WfsPermalink.js';
import ngeoMiscExtraModule from 'ngeo/misc/extraModule.js';

const exports = angular.module('ngeo', [
  ngeoDatasourceModule.name,
  ngeoDownloadModule.name,
  ngeoDrawModule.name,
  ngeoEditingModule.name,
  ngeoFilterModule.name,
  ngeoGooglestreetviewModule.name,
  ngeoGridModule.name,
  ngeoLayertreeModule.name,
  ngeoMapModule.name,
  ngeoMapLayerHelper.module.name,
  ngeoMeasureModule.name,
  ngeoPrintModule.name,
  ngeoProfileModule.name,
  ngeoQueryModule.name,
  ngeoSearchModule.name,
  ngeoStatemanagerModule.name,
  ngeoStatemanagerWfsPermalink.module.name,
  ngeoMiscExtraModule.name,
]);


export default exports;
