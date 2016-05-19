goog.provide('gmf.DatePickerDirective');
goog.provide('gmf.DatePickerController');

goog.require('gmf');

gmf.module.value('gmfDatePickerTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfDatePickerTemplateUrl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/datepicker.html';
    });


/**
 * Provide a directive to select a signle date or a range of dates
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 * gmfDatePickerTemplateUrl Template for the directive.
 * @param  {angular.$timeout} $timeout angular timeout service
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfDatePicker
 */
gmf.DatePicker = function(gmfDatePickerTemplateUrl,  $timeout) {
  return {
    scope : {
      onDateSelected : '&',
      time : '='
    },
    bindToController : true,
    controller : 'gmfDatePickerController',
    controllerAs : 'datepickerCtrl',
    restrict: 'AE',
    templateUrl : gmfDatePickerTemplateUrl,
    link: function(scope, element, attrs, ctrl) {

      var lang =  ctrl.gettextCatalog_.getCurrentLanguage();
      $['datepicker']['setDefaults']($['datepicker']['regional'][lang]);

      var commondateOptions_ = {
        'minDate' : new Date(ctrl.time.minValue),
        'maxDate' : new Date(ctrl.time.maxValue)
      };

      ctrl.sdateOptions = angular.extend({}, commondateOptions_, {
        'onClose' : function(selectedDate) {
          if (selectedDate) {
            $(element[0]).find('input[name="edate"]').datepicker('option', 'minDate', selectedDate);
          }
        }
      });

      ctrl.edateOptions = angular.extend({}, commondateOptions_, {
        'onClose' : function(selectedDate) {
          if (selectedDate) {
            $(element[0]).find('input[name="sdate"]').datepicker('option', 'maxDate', selectedDate);
          }
        }
      });

      angular.element('body').on('hidden.bs.popover', function() {
        var dp = angular.element('#ui-datepicker-div');
        if (dp && dp.css('display') === 'block') {
          $(element[0]).find('input[name$="date"]').datepicker('hide');
        }
      });

      $timeout(function() {
        angular.element('#ui-datepicker-div').on('mousedown', function(e) {
          e.stopPropagation();
        });
      });
    }
  };
};

gmf.module.directive('gmfDatePicker', gmf.DatePicker);


/**
 * DatePickerController - directive conttroller
 * @param {!angular.Scope} $scope Angular scope.
 * @param {angular.$injector} $injector injector.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfDatePickerController
 */
gmf.DatePickerController = function($scope, $injector) {

  /**
   * The gettext catalog
   * @type {angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = $injector.get('gettextCatalog');


  /**
   * @function
   * @export
   */
  this.onDateSelected;


  /**
   * @type {Object}
   * @export
   */
  this.time;

  /**
   * @type {Object}
   * @export
   */
  this.edateOptions = {};

  /**
   * @type {Object}
   * @export
   */
  this.sdateOptions = {};

  /**
   * @type {Object}
   * @export
   */
  this.sdate = new Date(this.time.minValue);

  /**
   * @type {Object|null}
   * @export
   */
  this.edate = this.time.mode === 'range' && new Date(this.time.maxValue) || null;

  $scope.$watchGroup(['datepickerCtrl.sdate', 'datepickerCtrl.edate'], function(newDates, oldDates) {
    var sDate = newDates[0];
    var eDate = newDates[1];

    if (angular.isDate(sDate) && (this.time.mode === 'single' || angular.isDate(eDate))) {
      this.onDateSelected({
        time : {
          start : sDate,
          end : eDate
        }
      });
    }
  }.bind(this));
};

gmf.module.controller('gmfDatePickerController', gmf.DatePickerController);
