goog.provide('ngeo.draw.text');

goog.require('ngeo');
goog.require('ngeo.GeometryType');
goog.require('ol.events');
goog.require('ol.interaction.Draw');

/**
 * @type {!angular.Module}
 */
ngeo.draw.text = angular.module('ngeoDrawtext', []);

ngeo.module.requires.push(ngeo.draw.text.name);


/**
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDrawtext
 */
ngeo.draw.text.directive_ = function() {
  return {
    restrict: 'A',
    require: '^^ngeoDrawfeature',
    /**
     * @param {!angular.Scope} $scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @param {ngeo.draw.Controller} drawFeatureCtrl Controller.
     */
    link: ($scope, element, attrs, drawFeatureCtrl) => {

      const drawText = new ol.interaction.Draw({
        type: /** @type {ol.geom.GeometryType} */ ('Point')
      });

      drawFeatureCtrl.registerInteraction(drawText);
      drawFeatureCtrl.drawText = drawText;

      ol.events.listen(
        drawText,
        'drawend',
        drawFeatureCtrl.handleDrawEnd.bind(
          drawFeatureCtrl, ngeo.GeometryType.TEXT),
        drawFeatureCtrl
      );
      ol.events.listen(
        drawText,
        'change:active',
        drawFeatureCtrl.handleActiveChange,
        drawFeatureCtrl
      );
    }
  };
};


ngeo.draw.text.directive('ngeoDrawtext', ngeo.draw.text.directive_);
