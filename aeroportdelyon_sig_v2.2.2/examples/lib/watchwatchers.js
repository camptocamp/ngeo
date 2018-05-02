/**
 * This script provides a window.countWatchers function that
 * the number of Angular watchers in the page.
 *
 * You can do `countWatchers()` in a console to know the current number of
 * watchers.
 *
 * To display the number of watchers every 5 seconds in the console:
 *
 * setInterval(function(){console.log(countWatchers())}, 5000);
 */
(function () {

  var root = angular.element(document.getElementsByTagName('body'));

  var countWatchers_ = function(element, scopes, count) {
    var scope;
    scope = element.data().$scope;
    if (scope && !(scope.$id in scopes)) {
        scopes[scope.$id] = true;
        if (scope.$$watchers) {
          count += scope.$$watchers.length;
        }
    }
    scope = element.data().$isolateScope;
    if (scope && !(scope.$id in scopes)) {
        scopes[scope.$id] = true;
        if (scope.$$watchers) {
          count += scope.$$watchers.length;
        }
    }
    angular.forEach(element.children(), function (child) {
        count = countWatchers_(angular.element(child), scopes, count);
    });
    return count;
  };

  window.countWatchers = function() {
    return countWatchers_(root, {}, 0);
  };

})();
