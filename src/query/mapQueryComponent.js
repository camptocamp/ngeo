/**
 */
import angular from 'angular';
import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent.js';
import ngeoQueryKeyboard from 'ngeo/query/Keyboard.js';

import {
  listen as olEventsListen,
  unlistenByKey as olEventsUnlistenByKey
} from 'ol/events.js';

const exports = angular.module('ngeoMapQuery', [
  ngeoQueryMapQuerent.module.name,
]);


/**
 * Provides a "map query" directive.
 *
 * This directive is responsible of binding a map and the ngeo query service
 * together. While active, clicks made on the map are listened by the directive
 * and a request gets issued to the query service.
 *
 * This directive doesn't require to be rendered in a visible DOM element, but
 * it could be used with a ngeo-btn to manage the activation of the directive.
 * See below an example without any use of UI:
 *
 * Example:
 *
 *      <span
 *        ngeo-map-query=""
 *        ngeo-map-query-map="::ctrl.map"
 *        ngeo-map-query-active="ctrl.queryActive"
 *        ngeo-map-query-autoclear="ctrl.queryAutoClear">
 *      </span>
 *
 * See our live example: [../examples/mapquery.html](../examples/mapquery.html)
 *
 * @param {import("ngeo/query/MapQuerent.js").default} ngeoMapQuerent The ngeo map querent service.
 * @param {angular.auto.IInjectorService} $injector Main injector.
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoMapQuery
 */
function directive(ngeoMapQuerent, $injector) {
  return {
    restrict: 'A',
    scope: false,
    link: (scope, elem, attrs) => {
      const map = scope.$eval(attrs['ngeoMapQueryMap']);
      const listenerKeys_ = [];

      /**
       * Called when the map is clicked while this controller is active. Issue
       * a request to the query service using the coordinate that was clicked.
       * @param {import("ol/MapBrowserEvent.js").default} evt The map browser event being fired.
       */
      const handleMapClick_ = function(evt) {
        const action = ngeoQueryKeyboard.action;
        const coordinate = evt.coordinate;
        ngeoMapQuerent.issue({
          action,
          coordinate,
          map
        });
      };

      /**
       * Called when the pointer is moved while this controller is active.
       * Change the mouse pointer when hovering a non-transparent pixel on the
       * map.
       * @param {import("ol/MapBrowserEvent.js").default} evt The map browser event being fired.
       */
      const handlePointerMove_ = function(evt) {
        if (!evt.dragging) {
          const pixel = map.getEventPixel(evt.originalEvent);
          const queryable = function(layer) {
            const visible = layer.get('visible');
            const sourceids = layer.get('querySourceIds');
            return visible && !!sourceids;
          };
          const hit = map.forEachLayerAtPixel(pixel, () => true, undefined, queryable);
          map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        }
      };

      /**
       * Listen to the map events.
       */
      const activate_ = function() {
        listenerKeys_.push(
          olEventsListen(map, 'singleclick', handleMapClick_)
        );
        const queryOptions = /** @type {QueryOptions} */ (
          $injector.has('ngeoQueryOptions') ? $injector.get('ngeoQueryOptions') : {}
        );
        if (queryOptions.cursorHover) {
          listenerKeys_.push(
            olEventsListen(map, 'pointermove', handlePointerMove_)
          );
        }
      };

      /**
       * Unlisten the map events.
       */
      const deactivate_ = function() {
        olEventsUnlistenByKey(listenerKeys_);
        listenerKeys_.length = 0;
        if (scope.$eval(attrs['ngeoMapQueryAutoclear']) !== false) {
          ngeoMapQuerent.clear();
        }
      };

      // watch 'active' property -> activate/deactivate accordingly
      scope.$watch(attrs['ngeoMapQueryActive'],
        (newVal, oldVal) => {
          if (newVal) {
            activate_();
          } else {
            deactivate_();
          }
        }
      );
    }
  };
}

exports.directive('ngeoMapQuery', directive);


export default exports;
