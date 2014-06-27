

(function() {
  var module = angular.module('app', ['go']);

  module.controller('MainController', ['$scope', 'goDecorateInteraction',
    /**
     * @param {angular.Scope} $scope Scope.
     * @param {go.DecorateInteraction} goDecorateInteraction Decorate
     *     interaction service.
     */
    function($scope, goDecorateInteraction) {

      var source = new ol.source.Vector();

      var vector = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
          }),
          image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
              color: '#ffcc33'
            })
          })
        })
      });

      /** @type {ol.Map} */
      $scope.map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat'})
          }),
          vector
        ],
        view: new ol.View2D({
          center: [-10997148, 4569099],
          zoom: 4
        })
      });

      /** @type {ol.interaction.Draw} */
      $scope.drawPolygon = new ol.interaction.Draw(
          /** @type {olx.interaction.DrawOptions} */ ({
            type: 'Polygon',
            source: source
          }));
      goDecorateInteraction($scope.drawPolygon, $scope.map);


      /** @type {ol.interaction.Draw} */
      $scope.drawPoint = new ol.interaction.Draw(
          /** @type {olx.interaction.DrawOptions} */ ({
            type: 'Point',
            source: source
          }));
      goDecorateInteraction($scope.drawPoint, $scope.map);

      /** @type {ol.interaction.Draw} */
      $scope.drawLine = new ol.interaction.Draw(
          /** @type {olx.interaction.DrawOptions} */ ({
            type: 'LineString',
            source: source
          }));
      goDecorateInteraction($scope.drawLine, $scope.map);
    }]);

  module.directive('goBtnGroup', function() {
    return {
      restrict: 'A',
      controller:
          function() {
            /**
             * @type {Array.<{scope:angular.Scope,
             *                setter:function((!angular.Scope), *)}>}
             */
            var buttons = [];

            /**
             * @param {angular.Scope} btnScope Scope of the goBtn directive.
             */
            this.activate = function(btnScope) {
              buttons.forEach(function(b) {
                if (b.scope != btnScope) {
                  b.setter(b.scope, false);
                }
              });
            };

            /**
             * @param {angular.Scope} btnScope Scope of the goBtn directive.
             * @param {function((!angular.Scope), *)} ngModelSet Setter.
             */
            this.addButton = function(btnScope, ngModelSet) {
              buttons.push({
                scope: btnScope,
                setter: ngModelSet
              });
            };
          }
    };
  })
    .directive('goBtn', ['$parse',
        function($parse) {
          return {
            require: ['^goBtnGroup', 'ngModel'],
            restrict: 'A',
            scope: true,
            link:
                /**
                 * @param {angular.Scope} scope Scope.
                 * @param {angular.JQLite} element Element.
                 * @param {angular.Attributes} attrs Attributes.
                 * @param {!Array.<!Object>} ctrls Controllers.
                 */
                function(scope, element, attrs, ctrls) {
                  var buttonsCtrl = ctrls[0];
                  var ngModelCtrl = ctrls[1];

                  var ngModelGet = $parse(attrs['ngModel']);
                  var ngModelSet = ngModelGet.assign;

                  buttonsCtrl.addButton(scope, ngModelSet);

                  //ui->model
                  element.bind('click', function() {
                    scope.$apply(function() {
                      ngModelCtrl.$setViewValue(!ngModelCtrl.$viewValue);
                      ngModelCtrl.$render();
                    });
                  });

                  //model -> UI
                  ngModelCtrl.$render = function() {
                    if (ngModelCtrl.$viewValue) {
                      buttonsCtrl.activate(scope);
                    }
                    element.toggleClass('active', ngModelCtrl.$viewValue);
                  };
                }
          };
        }]);
})();
