goog.provide('ngeo.DatePickerDirective');
goog.provide('ngeo.DatePickerController');

goog.require('goog.asserts');
goog.require('ngeo');
goog.require('ngeo.Time');

ngeo.module.value('ngeoDatePickerTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template URL.
     */
    function(element, attrs) {
      var templateUrl = attrs['ngeoDatePickerTemplateUrl'];
      return templateUrl !== undefined ? templateUrl :
          ngeo.baseTemplateUrl + '/datepicker.html';
    });


/**
 * Provide a directive to select a signle date or a range of dates. Requires
 * jQuery UI for the 'datepicker' widget.
 *
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 * ngeoDatePickerTemplateUrl Template for the directive.
 * @param  {angular.$timeout} $timeout angular timeout service
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname ngeoDatePicker
 */
ngeo.DatePicker = function(ngeoDatePickerTemplateUrl,  $timeout) {
  return {
    scope : {
      onDateSelected : '&',
      time : '='
    },
    bindToController : true,
    controller : 'ngeoDatePickerController',
    controllerAs : 'datepickerCtrl',
    restrict: 'AE',
    templateUrl : ngeoDatePickerTemplateUrl,
    link: function(scope, element, attrs, ctrl) {

      var lang =  ctrl.gettextCatalog_.getCurrentLanguage();
      $['datepicker']['setDefaults']($['datepicker']['regional'][lang]);

      ctrl.sdateOptions = angular.extend({}, ctrl.sdateOptions, {
        'onClose' : function(selectedDate) {
          if (selectedDate) {
            $(element[0]).find('input[name="edate"]').datepicker('option', 'minDate', selectedDate);
          }
        }
      });

      ctrl.edateOptions = angular.extend({}, ctrl.edateOptions, {
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

ngeo.module.directive('ngeoDatePicker', ngeo.DatePicker);


/**
 * DatePickerController - directive conttroller
 * @param {!angular.Scope} $scope Angular scope.
 * @param {angular.$injector} $injector injector.
 * @param {ngeo.Time} ngeoTime time service.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname ngeoDatePickerController
 */
ngeo.DatePickerController = function($scope, $injector, ngeoTime) {

  /**
   * @type {ngeo.Time}
   * @private
   */
  this.ngeoTime_ = ngeoTime;

  /**
   * @type {ngeox.TimeProperty}
   * @export
   */
  this.time;

  //fetch the initial options for the component
  var initialOptions_ = this.ngeoTime_.getOptions(this.time);

  /**
   * The gettext catalog
   * @type {angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = $injector.get('gettextCatalog');


  /**
   * If the component is used to select a date range
   * @type boolean
   * @export
   */
  this.isModeRange = this.time.mode === 'range';


  /**
   * Function called after date(s) changed/selected
   * @function
   * @export
   */
  this.onDateSelected;


  /**
   * initial min date for the datepicker
   * @type {Date}
   */
  this.initialMinDate = new Date(initialOptions_.minDate);

  /**
   * initial max date for the datepickeronDateSelected
   * @type {Date}
   */
  this.initialMaxDate = new Date(initialOptions_.maxDate);

  /**
   * Datepicker options for the second datepicker (only for range mode)
   * @type {Object}
   * @export
   */
  this.edateOptions = {
    'minDate' : this.initialMinDate,
    'maxDate' : this.initialMaxDate,
    'changeMonth': true,
    'changeYear': true
  };

  /**
   * Datepicker options for the first datepicker
   * @type {Object}
   * @export
   */
  this.sdateOptions = {
    'minDate' : this.initialMinDate,
    'maxDate' : this.initialMaxDate,
    'changeMonth': true,
    'changeYear': true
  };

  /**
   * Start date model for the first date picker
   * @type {Date}
   * @export
   */
  this.sdate;

  /**
   * End date model for the second datepicker (only for range mode)
   * @type {Date}
   * @export
   */
  this.edate;

  if (this.isModeRange) {
    goog.asserts.assertArray(initialOptions_.values);
    this.sdate = new Date(initialOptions_.values[0]);
    this.edate = new Date(initialOptions_.values[1]);
  } else {
    goog.asserts.assertNumber(initialOptions_.values);
    this.sdate = new Date(initialOptions_.values);
  }

  $scope.$watchGroup(['datepickerCtrl.sdate', 'datepickerCtrl.edate'], function(newDates, oldDates) {
    var sDate = newDates[0];
    var eDate = newDates[1];

    if (angular.isDate(sDate) && (!this.isModeRange || angular.isDate(eDate))) {
      this.onDateSelected({
        time : {
          start : sDate.getTime(),
          end : eDate ? eDate.getTime() : null
        }
      });
    }
  }.bind(this));
};

ngeo.module.controller('ngeoDatePickerController', ngeo.DatePickerController);
