/**
 */
import angular from 'angular';
import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent.js';
import ngeoQueryKeyboard from 'ngeo/query/Keyboard.js';

import olInteractionDragBox from 'ol/interaction/DragBox.js';
import {platformModifierKeyOnly} from 'ol/events/condition.js';

const exports = angular.module('ngeoBboxQuery', [
  ngeoQueryMapQuerent.name,
]);


/**
 * Provides a "bbox query" directive.
 *
 * This directive is responsible of binding a map and the ngeo query service
 * together. While active, drawing a bbox while CTRL or the 'meta' key is pressed
 * issues a request to the query service.
 *
 * This directive doesn't require to be rendered in a visible DOM element, but
 * it could be used with a ngeo-btn to manage the activation of the directive.
 * See below an example without any use of UI:
 *
 * Example:
 *
 *      <span
 *        ngeo-bbox-query=""
 *        ngeo-bbox-query-map="::ctrl.map"
 *        ngeo-bbox-query-limit="50"
 *        ngeo-bbox-query-active="ctrl.queryActive">
 *        ngeo-bbox-query-autoclear="ctrl.queryAutoClear">
 *      </span>
 *
 * See the live example: [../examples/bboxquery.html](../examples/bboxquery.html)
 *
 * @param {import("ngeo/query/MapQuerent.js").default} ngeoMapQuerent The ngeo map querent service.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoBboxQuery
 */
function directive(ngeoMapQuerent) {
  return {
    restrict: 'A',
    scope: false,
    link: (scope, elem, attrs) => {
      /**
       * @type {import("ol/Map.js").default}
       */
      const map = scope.$eval(attrs['ngeoBboxQueryMap']);

      const interaction = new olInteractionDragBox({
        condition: platformModifierKeyOnly
      });

      /**
       * Called when a bbox is drawn while this controller is active. Issue
       * a request to the query service using the extent that was drawn.
       * @param {import("ol/interaction/DragBox/Event.js").default} evt Event.
       */
      const handleBoxEnd = function(evt) {
        const action = ngeoQueryKeyboard.action;
        const extent = interaction.getGeometry().getExtent();
        const limit = scope.$eval(attrs['ngeoBboxQueryLimit']);
        ngeoMapQuerent.issue({
          action,
          extent,
          limit,
          map
        });
      };
      interaction.on('boxend', handleBoxEnd);

      // watch 'active' property -> activate/deactivate accordingly
      scope.$watch(attrs['ngeoBboxQueryActive'],
        (newVal, oldVal) => {
          if (newVal) {
            // activate
            map.addInteraction(interaction);
          } else {
            // deactivate
            map.removeInteraction(interaction);
            if (scope.$eval(attrs['ngeoBboxQueryAutoclear']) !== false) {
              ngeoMapQuerent.clear();
            }
          }
        }
      );
    }
  };
}

module.directive('ngeoBboxQuery', directive);


export default module;
