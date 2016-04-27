goog.provide('ngeo.filters');

goog.require('ngeo');

// format a number as a scale
ngeo.module.filter('scalify', ['$filter', function(filter) {
  var number = filter('number');
  return function(scale) {
    var text = number(scale, 0) || '';
    return '1 : ' + text.replace(/,/g, '\'');
  };
}]);
