goog.require('ngeo.AutoProjection');
goog.require('ngeo.proj.EPSG21781');
goog.require('ol.proj');

describe('ngeo.AutoProjection', () => {
  let ngeoAutoProjection;

  beforeEach(() => {
    inject(($injector) => {
      ngeoAutoProjection = $injector.get('ngeoAutoProjection');
    });
  });

  it('Get coordinates from a string', () => {
    let str = '47° 25′ 40″ N 79° 55′ 12″ W';
    let result = ngeoAutoProjection.stringToCoordinates(str);
    expect(result).toBeNull();

    str = '   ';
    result = ngeoAutoProjection.stringToCoordinates(str);
    expect(result).toBeNull();

    str = '600000 200000';
    result = ngeoAutoProjection.stringToCoordinates(str);
    expect(result).toEqual([600000, 200000]);
  });

  it('Get Projection list from codes', () => {
    const codes = ['EPSG:4326', '3857', 'EPSG:1234'];
    spyOn(console, 'error');
    const projections = ngeoAutoProjection.getProjectionList(codes);
    expect(console.error).toHaveBeenCalled();
    expect(projections[0]).toBe(ol.proj.get('EPSG:4326'));
    expect(projections[1]).toBe(ol.proj.get('EPSG:3857'));
    expect(projections.length).toBe(2);
  });

  it('Try projections', () => {
    const coordinatesA = [600000, 200000];
    const coordinatesB = [8, 47];
    const viewProjection = ol.proj.get('EPSG:21781');
    const extent = viewProjection.getExtent();
    const projections = [ol.proj.get('EPSG:21781'), ol.proj.get('EPSG:4326')];

    let point = ngeoAutoProjection.tryProjections(coordinatesA, extent,
      viewProjection);
    expect(point).toEqual(coordinatesA);

    point = ngeoAutoProjection.tryProjections(coordinatesB, extent,
      viewProjection);
    expect(point).toBeNull();

    const coordinatesBTransformed = ol.proj.transform(coordinatesB,
      ol.proj.get('EPSG:4326'), viewProjection);
    point = ngeoAutoProjection.tryProjections(coordinatesB, extent,
      viewProjection, projections);
    expect(point).toEqual(coordinatesBTransformed);
  });

  it('Try projections with inversion', () => {
    const coordinates = [47, 8];
    const viewProjection = ol.proj.get('EPSG:21781');
    const extent = viewProjection.getExtent();
    const projections = [ol.proj.get('EPSG:4326')];
    const coordinatesTransformed = ol.proj.transform(coordinates.reverse(),
      projections[0], viewProjection);

    const point = ngeoAutoProjection.tryProjectionsWithInversion(coordinates,
      extent, viewProjection, projections);
    expect(point).toEqual(coordinatesTransformed);
  });
});
