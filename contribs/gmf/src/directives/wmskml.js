goog.provide('gmf.wmskmlDirective');

goog.require('gmf');


/**
 * Directive used to add layers by adding a WMS URL or uploading a KML file.
 *
 * @ngInject
 * @ngdoc directive
 * @ngname gmfWmskml
 */
gmf.wmskmlDirective = function() {
  return {
    controller: 'GmfWmskmlController as wkCtrl',
    scope: {
      'active': '=gmfWmskmlActive',
      'map': '<gmfWmskmlMap',
      'importOptions': '=gmfWmskmlImportOptions',
      'wmsGetCap': '=gmfWmskmlWmsGetCap',
      'wmtsGetCap': '=gmfWmskmlWmtsGetCap'
    },
    bindToController: true,
    templateUrl: `${gmf.baseTemplateUrl}/wmskml.html`
  };
};

gmf.module.directive('gmfWmskml', gmf.wmskmlDirective);


/**
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDrawfeatureController
 */
gmf.WmskmlController = function() {
};


gmf.module.controller('GmfWmskmlController', gmf.WmskmlController);
