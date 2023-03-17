import angular from 'angular';
import ngeoQueryAction from 'ngeo/query/Action.js';
import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent.js';
import ngeoQueryKeyboard from 'ngeo/query/Keyboard.js';

import olInteractionDragBox from 'ol/interaction/DragBox.js';
import {platformModifierKeyOnly} from 'ol/events/condition.js';
import {VOID} from 'ol/functions.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoBboxQuery', [ngeoQueryKeyboard.name, ngeoQueryMapQuerent.name]);

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
 * @param {angular.IScope} $rootScope The root scope.
 * @param {import("ngeo/query/MapQuerent.js").MapQuerent} ngeoMapQuerent The ngeo map querent service.
 * @param {import("ngeo/query/Keyboard.js").QueryKeyboard} ngeoQueryKeyboard The ngeo query keyboard service.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoBboxQuery
 */
function queryBboxComponent($rootScope, ngeoMapQuerent, ngeoQueryKeyboard) {
  return {
    restrict: 'A',
    scope: false,
    link: (scope, elem, attrs) => {
      /**
       * @type {import("ol/Map.js").default}
       */
      const map = scope.$eval(attrs['ngeoBboxQueryMap']);

      let active;

      const interaction = new olInteractionDragBox({
        condition: platformModifierKeyOnly,
        onBoxEnd: VOID,
      });

      /**
       * Called when a bbox is drawn while this controller is active. Issue
       * a request to the query service using the extent that was drawn.
       * @param {!olInteractionDragBox} interaction Drag box interaction
       */
      const handleBoxEnd = function (interaction) {
        const action = ngeoQueryKeyboard.action;
        const extent = interaction.getGeometry().getExtent();
        const limit = scope.$eval(attrs['ngeoBboxQueryLimit']);
        ngeoMapQuerent.issue({
          action,
          extent,
          limit,
          map,
        });
      };
      interaction.on('boxend', handleBoxEnd.bind(this, interaction));

      // watch 'active' property -> activate/deactivate accordingly
      scope.$watch(attrs['ngeoBboxQueryActive'], (newVal, oldVal) => {
        active = newVal;

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
      });

      // This second interaction is not given any condition and is
      // automatically added to the map while the user presses the
      // keys to either ADD or REMOVE
      const interactionWithoutCondition = new olInteractionDragBox({
        onBoxEnd: VOID,
      });
      interactionWithoutCondition.on('boxend', handleBoxEnd.bind(this, interactionWithoutCondition));
      let added = false;
      $rootScope.$watch(
        () => ngeoQueryKeyboard.action,
        (newVal, oldVal) => {
          // No need to do anything if directive is not active
          if (!active) {
            return;
          }
          if (newVal === ngeoQueryAction.REPLACE) {
            if (added) {
              map.removeInteraction(interactionWithoutCondition);
              added = false;
            }
          } else {
            if (!added) {
              map.addInteraction(interactionWithoutCondition);
              added = true;
            }
          }
        }
      );
    },
  };
}

module.directive('ngeoBboxQuery', queryBboxComponent);

export default module;
