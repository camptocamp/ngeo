goog.provide('ngeo.mobileQueryDirective');

goog.require('ngeo');
goog.require('ngeo.Query');


/**
 * Provide a "mobile query" directive.
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
 *        ngeo-mobile-query=""
 *        ngeo-mobile-query-map="::ctrl.map"
 *        ngeo-mobile-query-active="ctrl.queryActive">
 *      </span>
 *
 * See our live example: {@link ../examples/mobilequery.html}
 *
 * @param {ngeo.Query} ngeoQuery The ngeo Query service.
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoMobileQuery
 */
ngeo.mobileQueryDirective = function(ngeoQuery) {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, elem, attrs) {
      var map = scope.$eval(attrs['ngeoMobileQueryMap']);
      var clickEventKey_ = null;

      /**
       * Called when the map is clicked while this controller is active. Issue
       * a request to the query service using the coordinate that was clicked.
       * @param {ol.MapBrowserEvent} evt The map browser event being fired.
       */
      var handleMapClick_ = function(evt) {
        ngeoQuery.issue(map, evt.coordinate);
      };

      /**
       * Listen to the map 'click' event.
       */
      var activate_ = function() {
        clickEventKey_ = ol.events.listen(map,
            ol.events.EventType.CLICK, handleMapClick_);
      };


      /**
       * Unlisten the map 'click' event.
       */
      var deactivate_ = function() {
        if (clickEventKey_ !== null) {
          ol.events.unlistenByKey(clickEventKey_);
          clickEventKey_ = null;
        }
        ngeoQuery.clear();
      };

      // watch 'active' property -> activate/deactivate accordingly
      scope.$watch(attrs['ngeoMobileQueryActive'],
          function(newVal, oldVal) {
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

ngeo.module.directive('ngeoMobileQuery', ngeo.mobileQueryDirective);
