import angular from 'angular';

import ngeoQueryModeSelector from 'ngeo/query/ModeSelector.js';

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoQueryPanel', [
  ngeoQueryModeSelector.name,
]);

module.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  $templateCache => {
    // @ts-ignore: webpack
    $templateCache.put(
      'ngeo/src/query/panelComponent',
      require('./panelComponent.html')
    );
  }
);

module.value(
  'ngeoQueryPanelTemplateUrl',
  /**
   * @param {angular.IAttributes} $attrs Attributes.
   * @return {string} The template url.
   */
  $attrs => {
    const templateUrl = $attrs.ngeoQueryPanelTemplateUrl;
    return templateUrl !== undefined ?
      templateUrl :
      'ngeo/src/query/panelComponent';
  }
);

/**
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(angular.IAttributes): string} ngeoQueryPanelTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function ngeoQueryPanelTemplateUrl($attrs, ngeoQueryPanelTemplateUrl) {
  return ngeoQueryPanelTemplateUrl($attrs);
}


/**
 * @private
 * @hidden
 */
class QueryPanelController {

  /**
   * @param {import("ngeo/query/ModeSelector.js").QueryModeSelector}
   *     ngeoQueryModeSelector The ngeo query modeSelector service.
   * @private
   * @ngInject
   * @ngdoc controller
   * @ngname NgeoQueryController
   */
  constructor(ngeoQueryModeSelector) {
    /**
     * @type {import("ngeo/query/ModeSelector.js").QueryModeSelector}
     */
    this.ngeoQueryModeSelector = ngeoQueryModeSelector;
  }
}

module.controller('ngeoQueryPanelController', QueryPanelController);

module.component('ngeoQueryPanel', {
  controller: 'ngeoQueryPanelController as qpCtrl',
  templateUrl: ngeoQueryPanelTemplateUrl
});

export default module;
