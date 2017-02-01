goog.provide('ngeo.mapQueryDirective');

goog.require('ngeo');
goog.require('ngeo.MapQuerent');


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
 * @param {ngeo.MapQuerent} ngeoMapQuerent The ngeo map querent service.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoMapQuery
 */
ngeo.mapQueryDirective = function(ngeoMapQuerent) {
  return {
    restrict: 'A',
    scope: false,
    link(scope, elem, attrs) {
      const map = scope.$eval(attrs['ngeoMapQueryMap']);
      let clickEventKey_ = null;
      let queryableLayers_ = [];
      let pointerMoveEventKey_ = null;

      /**
       * Called when the map is clicked while this controller is active. Issue
       * a request to the query service using the coordinate that was clicked.
       * @param {ol.MapBrowserEvent} evt The map browser event being fired.
       */
      const handleMapClick_ = function(evt) {
        const coordinate = evt.coordinate;
        ngeoMapQuerent.issue({
          coordinate,
          map
        });
      };

      /**
       * Check if layer is queryable.
       * @param {ol.layer.Base} layer The layer to check.
       * @return {boolean} true if layer is queryable.
       */
      var isLayerQueryable_ = function(layer) {
        for (var i = 0; i < queryableLayers_.length; i++) {
          if (queryableLayers_[i] === layer) {
            return true;
          }
        }

        return false;
      };

      /**
       * Called when the pointer is moved while this controller is active.
       * Change the mouse pointer when hovering a non-transparent pixel on the
       * map.
       * @param {ol.MapBrowserEvent} evt The map browser event being fired.
       */
      var handlePointerMove_ = function(evt) {
        if (evt.dragging) {
          return;
        }
        var pixel = map.getEventPixel(evt.originalEvent);
        var hit = map.forEachLayerAtPixel(pixel, function() {
          return true;
        },
        undefined,
        function(layer) {
          return isLayerQueryable_(layer);
        });
        map.getTargetElement().style.cursor = hit ? 'pointer' : '';
      };

      /**
       * Listen to the map events.
       */
      const activate_ = function() {
        clickEventKey_ = ol.events.listen(map,
            ol.events.EventType.CLICK, handleMapClick_);

        queryableLayers_ = ngeoQuery.getQueryableLayers(map);
        pointerMoveEventKey_ = ol.events.listen(map,
            'pointermove', handlePointerMove_);
      };

      /**
       * Unlisten the map events.
       */
      const deactivate_ = function() {
        if (clickEventKey_ !== null) {
          ol.events.unlistenByKey(clickEventKey_);
          clickEventKey_ = null;
        }
        if (pointerMoveEventKey_ !== null) {
          ol.events.unlistenByKey(pointerMoveEventKey_);
          pointerMoveEventKey_ = null;
        }
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
};

ngeo.module.directive('ngeoMapQuery', ngeo.mapQueryDirective);
