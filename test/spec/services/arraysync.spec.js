goog.require('ngeo.ArraySync');

describe('ngeo.ArraySync', function() {
  var arr1, arr2;
  var $rootScope;

  beforeEach(function() {
    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      var ngeoArraySync = $injector.get('ngeoArraySync');
      arr1 = [0, 10, 1, 20, 2, 30, 3];
      arr2 = [];
      var filter = function(n) {
        return n < 10;
      };
      ngeoArraySync(arr1, arr2, $rootScope, filter);
      $rootScope.$digest();
      expect(arr2).toEqual([0, 1, 2, 3]);
    });
  });

  it('updates arr2 when an element is added to arr1', function() {
    arr1.push(4);
    $rootScope.$digest();
    expect(arr2).toEqual([0, 1, 2, 3, 4]);
  });

  it('updates arr2 when an element is removed from arr1', function() {
    arr1.splice(4, 1);
    $rootScope.$digest();
    expect(arr2).toEqual([0, 1, 3]);
  });

  it('updates arr1 when the order changes in arr2', function() {
    var second = arr2[1];
    arr2[1] = arr2[arr2.length - 1];
    arr2[arr2.length - 1] = second;
    expect(arr2).toEqual([0, 3, 2, 1]);
    $rootScope.$digest();
    expect(arr1).toEqual([0, 10, 3, 20, 2, 30, 1]);
  });
});
