goog.provide('gmf.TimeSliderDirective');
goog.provide('gmf.TimeSliderController');

goog.require('gmf');


/**
 * Provide a directive to select a single date or a range of dates with a slider
 * Example:
 *
 *      <gmf-time-slider
 *          gmf-time-slider-time="{
 *            maxValue: '2013-12-31T00:00:00Z',
 *            minValue: '2006-01-01T00:00:00Z',
 *            mode: 'range'}"
 *          gmf-time-slider-on-date-selected="ctrl.onDateSelected(time)">
 *      </gmf-time-slider>
 *
 * @htmlAttribute {gmfx.TimeProperty} gmf-time-slider-time parameter for initialization.
 * @htmlAttribute {function()} gmf-time-slider-on-date-selected Expresion evaluated after
 * date(s) changed
 * @param {angular.$timeout} $timeout angular timeout service
 * @param {angular.$filter} $filter angular filter service
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfTimeSlider
 */
gmf.timeSliderDirective = function($timeout, $filter) {
  return {
    scope : {
      onDateSelected : '&gmfTimeSliderOnDateSelected',
      time : '=gmfTimeSliderTime'
    },
    bindToController : true,
    controller : 'gmfTimeSliderController',
    controllerAs : 'sliderCtrl',
    restrict: 'AE',
    templateUrl : gmf.baseTemplateUrl + '/timeslider.html',
    link: function(scope, element, attrs, ctrl) {

      /** @type {string} */
      var dateFormat = 'shortDate';

      ctrl.sliderOptions.start = updateTooltip_;
      ctrl.sliderOptions.stop = onSliderReleased_;
      ctrl.sliderOptions['slide'] = updateTooltip_;

      $timeout(init_);

      function init_() {
        if (element.children().first()[0].offsetHeight) {
          //element is not hidden, init tooltip is allowed
          element.find('span.ui-slider-handle').each(initToolTip_);
        } else {
          //element is hidden. Do not init tooltip now
          $('body').on('shown.bs.popover', function(jqEvt) {
            //Element contained in a popover ?
            if ($('.popover[role="tooltip"]').find(element).length) {
              element.find('span.ui-slider-handle').each(initToolTip_);
            }
          });
        }

        element.find('.ui-slider-handle').on('hide.bs.tooltip', function(jqEvt) {
          if (element.find(this).length > 0) {
            jqEvt.preventDefault();
          }
        });
      }

      function updateTooltip_(e, slider) {
        var handle = $(slider.handle);
        var left  = handle.position().left;
        var tooltip = $('#' + handle.attr('aria-describedby'));
        var dateText  = $filter('date')(new Date(slider.value), dateFormat);
        handle.attr('data-original-title', dateText).tooltip('fixTitle');
        tooltip.css('left', left - tooltip.width() / 2);
        tooltip.find('.tooltip-inner').text(dateText);
      }

      function initToolTip_(i) {
        var el = $(this);
        if (!el.attr('aria-describedby')) {
          var date = ctrl.dates[i] || ctrl.dates;
          var dateText = $filter('date')(new Date(date), dateFormat);

          el.tooltip({
            selector: 'span.ui-slider-handle',
            trigger: 'manual',
            placement : i === 0 ? 'bottom' : 'top',
            title : dateText
          })
          .tooltip('show');
        }
      }

      function onSliderReleased_(e, sliderUi) {
        var sDate, eDate;
        updateTooltip_(e, sliderUi);
        if (sliderUi.values) {
          sDate = new Date(sliderUi.values[0]);
          eDate = new Date(sliderUi.values[1]);
        } else {
          sDate = new Date(sliderUi.value);
        }

        ctrl.onDateSelected({
          time : {
            start : sDate,
            end : eDate
          }
        });
      }
    }
  };
};


/**
 * TimeSliderController - directive controller
 * @param {!angular.Scope} $scope Angular scope.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc controller
 * @ngname gmfTimeSliderController
 */
gmf.TimeSliderController = function($scope) {

  /**
   * Function called after date(s) changed/selected
   * @function
   * @export
   */
  this.onDateSelected;

  /**
   * A time object for directive initialization
   * @type {gmfx.TimeProperty}
   * @export
   */
  this.time;

  var min = new Date(this.time.minValue).getTime();
  var max = new Date(this.time.maxValue).getTime();
  var step = 1000 * 3600 * 24; //day resolution

  /**
   * Options for the ui-slider directive
   * @type {{range: boolean,
   * min: number,
   * max: number,
   * step: number,
   * start: (Function|undefined),
   * stop: (Function|undefined)
   * }}
   * @export
   */
  this.sliderOptions = {
    range : this.time.mode === 'range',
    min : min,
    max : max,
    step : step
  };

  /**
   * Model for the ui-slider directive
   * @type {Array|number}
   * @export
   */
  this.dates = this.time.mode === 'range' ? [min, max] : Math.ceil(min + (max - min) / 2);
};


gmf.module.controller('gmfTimeSliderController', gmf.TimeSliderController);
gmf.module.directive('gmfTimeSlider', gmf.timeSliderDirective);
