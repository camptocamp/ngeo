import ngeoMiscSyncArrays from 'ngeo/misc/syncArrays.js';

describe('ngeo.misc.syncArrays', () => {
  let $rootScope;

  beforeEach(() => {
    angular.mock.inject((_$rootScope_) => {
      $rootScope = _$rootScope_;
    });
  });

  describe('arr1 and arr2 in same order', () => {
    let arr1, arr2;
    let dereg;

    beforeEach(() => {
      const ngeoSyncArrays = ngeoMiscSyncArrays;
      arr1 = [0, 10, 1, 20, 2, 30, 3];
      arr2 = [];
      const filter = function(n) {
        return n < 10;
      };
      dereg = ngeoSyncArrays(arr1, arr2, false, $rootScope, filter);
      $rootScope.$digest();
      expect(arr2).toEqual([0, 1, 2, 3]);
    });

    it('updates arr2 when an element is added to arr1', () => {
      arr1.push(4);
      $rootScope.$digest();
      expect(arr2).toEqual([0, 1, 2, 3, 4]);
    });

    it('updates arr2 when an element is removed from arr1', () => {
      arr1.splice(4, 1);
      $rootScope.$digest();
      expect(arr2).toEqual([0, 1, 3]);
    });

    it('updates arr1 when the order changes in arr2', () => {
      const second = arr2[1];
      arr2[1] = arr2[arr2.length - 1];
      arr2[arr2.length - 1] = second;
      expect(arr2).toEqual([0, 3, 2, 1]);
      $rootScope.$digest();
      expect(arr1).toEqual([0, 10, 3, 20, 2, 30, 1]);
    });

    it('stops synchronizing when dereg is called', () => {
      const second = arr2[1];
      arr2[1] = arr2[arr2.length - 1];
      arr2[arr2.length - 1] = second;
      expect(arr2).toEqual([0, 3, 2, 1]);
      dereg();
      $rootScope.$digest();
      expect(arr1).toEqual([0, 10, 1, 20, 2, 30, 3]);
    });

  });

  describe('arr1 and arr2 in reverse order', () => {
    let arr1, arr2;
    let dereg;

    beforeEach(() => {
      angular.mock.inject(($injector) => {
        const ngeoSyncArrays = ngeoMiscSyncArrays;
        arr1 = [0, 10, 1, 20, 2, 30, 3];
        arr2 = [];
        const filter = function(n) {
          return n < 10;
        };
        dereg = ngeoSyncArrays(arr1, arr2, true, $rootScope, filter);
        $rootScope.$digest();
        expect(arr2).toEqual([3, 2, 1, 0]);
      });
    });

    it('updates arr2 when an element is added to arr1', () => {
      arr1.push(4);
      $rootScope.$digest();
      expect(arr2).toEqual([4, 3, 2, 1, 0]);
    });

    it('updates arr2 when an element is removed from arr1', () => {
      arr1.splice(4, 1);
      $rootScope.$digest();
      expect(arr2).toEqual([3, 1, 0]);
    });

    it('updates arr1 when the order changes in arr2', () => {
      const second = arr2[1];
      arr2[1] = arr2[arr2.length - 1];
      arr2[arr2.length - 1] = second;
      expect(arr2).toEqual([3, 0, 1, 2]);
      $rootScope.$digest();
      expect(arr1).toEqual([2, 10, 1, 20, 0, 30, 3]);
    });

    it('stops synchronizing when dereg is called', () => {
      const second = arr2[1];
      arr2[1] = arr2[arr2.length - 1];
      arr2[arr2.length - 1] = second;
      expect(arr2).toEqual([3, 0, 1, 2]);
      dereg();
      $rootScope.$digest();
      expect(arr1).toEqual([0, 10, 1, 20, 2, 30, 3]);
    });

  });
});
