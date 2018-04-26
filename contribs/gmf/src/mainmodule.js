/**
 * @module gmf.mainmodule
 */
import gmfAuthenticationModule from 'gmf/authentication/module.js';
import gmfBackgroundlayerselectorModule from 'gmf/backgroundlayerselector/module.js';
import gmfContextualdataModule from 'gmf/contextualdata/module.js';
import gmfDatasourceModule from 'gmf/datasource/module.js';
import gmfDisclaimerModule from 'gmf/disclaimer/module.js';
import gmfDrawingModule from 'gmf/drawing/module.js';
import gmfEditingModule from 'gmf/editing/module.js';
import gmfFiltersModule from 'gmf/filters/module.js';
import gmfImportModule from 'gmf/import/module.js';
import gmfLayertreeModule from 'gmf/layertree/module.js';
import gmfMapModule from 'gmf/map/module.js';
import gmfObjecteditingModule from 'gmf/objectediting/module.js';
import gmfPermalinkModule from 'gmf/permalink/module.js';
import gmfPrintModule from 'gmf/print/module.js';
import gmfProfileModule from 'gmf/profile/module.js';
import gmfRasterModule from 'gmf/raster/module.js';
import gmfSearchModule from 'gmf/search/module.js';
import gmfThemeModule from 'gmf/theme/module.js';
import ngeoMainmodule from 'ngeo/mainmodule.js';

const exports = angular.module('gmf', [
  gmfAuthenticationModule.name,
  gmfBackgroundlayerselectorModule.name,
  gmfContextualdataModule.name,
  gmfDatasourceModule.name,
  gmfDisclaimerModule.name,
  gmfDrawingModule.name,
  gmfEditingModule.name,
  gmfFiltersModule.name,
  gmfImportModule.name,
  gmfLayertreeModule.name,
  gmfMapModule.name,
  gmfObjecteditingModule.name,
  gmfPermalinkModule.name,
  gmfPrintModule.name,
  gmfProfileModule.name,
  gmfRasterModule.name,
  gmfSearchModule.name,
  gmfThemeModule.name,
  ngeoMainmodule.name,
]);


export default exports;
