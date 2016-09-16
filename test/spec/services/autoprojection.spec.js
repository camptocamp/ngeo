goog.require('ngeo.AutoProjection');
goog.require('ngeo.proj.EPSG21781');

describe('ngeo.AutoProjection', function() {
  var ngeoAutoProjection;

  beforeEach(function() {
    inject(function($injector) {
      ngeoAutoProjection = $injector.get('ngeoAutoProjection');
    });
  });

  it('Get coordinates from a string', function() {
    var str = '47° 25′ 40″ N 79° 55′ 12″ W';
    var result = ngeoAutoProjection.stringToCoordinates(str);
    expect(result).toBeNull();

    str = '   ';
    result = ngeoAutoProjection.stringToCoordinates(str);
    expect(result).toBeNull();

    str = '600000 200000';
    result = ngeoAutoProjection.stringToCoordinates(str);
    expect(result).toEqual([600000, 200000]);
  });

  it('Get Projection list from codes', function() {
    var codes = ['epsg:4326', '3857', 'EPSG:1234'];
    spyOn(console, 'error');
    var projections = ngeoAutoProjection.getProjectionList(codes);
    expect(console.error).toHaveBeenCalled();
    expect(projections[0]).toBe(ol.proj.get('EPSG:4326'));
    expect(projections[1]).toBe(ol.proj.get('EPSG:3857'));
    expect(projections.length).toBe(2);
  });

  it('Try projections', function() {
    var coordinatesA = [600000, 200000];
    var coordinatesB = [8, 47];
    var viewProjection = ol.proj.get('EPSG:21781');
    var extent = viewProjection.getExtent();
    var projections = [ol.proj.get('EPSG:21781'), ol.proj.get('EPSG:4326')];

    var point = ngeoAutoProjection.tryProjections(coordinatesA, extent,
        viewProjection);
    expect(point).toEqual(coordinatesA);

    point = ngeoAutoProjection.tryProjections(coordinatesB, extent,
        viewProjection);
    expect(point).toBeNull();

    var coordinatesBTransformed = ol.proj.transform(coordinatesB,
        ol.proj.get('EPSG:4326'), viewProjection);
    point = ngeoAutoProjection.tryProjections(coordinatesB, extent,
        viewProjection, projections);
    expect(point).toEqual(coordinatesBTransformed);
  });

  it('Try projections with inversion', function() {
    var coordinates = [47, 8];
    var viewProjection = ol.proj.get('EPSG:21781');
    var extent = viewProjection.getExtent();
    var projections = [ol.proj.get('EPSG:4326')];
    var coordinatesTransformed = ol.proj.transform(coordinates.reverse(),
        projections[0], viewProjection);

    var point = ngeoAutoProjection.tryProjectionsWithInversion(coordinates,
        extent, viewProjection, projections);
    expect(point).toEqual(coordinatesTransformed);
  });
});
