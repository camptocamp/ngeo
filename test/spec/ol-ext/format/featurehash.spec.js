goog.require('ol.Feature');
goog.require('ol.geom.MultiLineString');
goog.require('ol.geom.MultiPoint');
goog.require('ol.geom.MultiPolygon');
goog.require('ol.geom.LineString');
goog.require('ol.geom.Point');
goog.require('ol.geom.Polygon');
goog.require('ol.style.Circle');
goog.require('ol.style.Fill');
goog.require('ol.style.Stroke');
goog.require('ol.style.Style');
goog.require('ol.style.Text');
goog.require('ngeo.format.FeatureHash');


describe('ngeo.format.FeatureHash', function() {

  var fhFormat;

  beforeEach(function() {
    fhFormat = new ngeo.format.FeatureHash();
  });

  describe('decoding', function() {

    describe('point decoding', function() {

      it('correctly decodes a point', function() {
        var point = fhFormat.readGeometry('p(__)');
        expect(point instanceof ol.geom.Point).toBeTruthy();
        var coordinate = point.getCoordinates();
        expect(coordinate).toEqual([1, 1]);
      });

    });

    describe('multi point decoding', function() {

      it('correctly decodes a multi point', function() {
        var multiPoint = fhFormat.readGeometry('P(..__)');
        expect(multiPoint instanceof ol.geom.MultiPoint).toBeTruthy();
        var coordinates = multiPoint.getCoordinates();
        expect(coordinates.length).toBe(2);
        expect(coordinates[0]).toEqual([0, 0]);
        expect(coordinates[1]).toEqual([1, 1]);
      });

    });

    describe('line decoding', function() {

      it('correctly decodes a line', function() {
        var lineString = fhFormat.readGeometry('l(..__)');
        expect(lineString instanceof ol.geom.LineString).toBeTruthy();
        var coordinates = lineString.getCoordinates();
        expect(coordinates.length).toBe(2);
        expect(coordinates[0]).toEqual([0, 0]);
        expect(coordinates[1]).toEqual([1, 1]);
      });

    });

    describe('multi line decoding', function() {

      it('correctly decodes a multi line', function() {
        var multiLineString = fhFormat.readGeometry('L(..__\'--__)');
        expect(multiLineString instanceof ol.geom.MultiLineString).toBeTruthy();
        var coordinates = multiLineString.getCoordinates();
        expect(coordinates.length).toBe(2);
        expect(coordinates[0][0]).toEqual([0, 0]);
        expect(coordinates[0][1]).toEqual([1, 1]);
        expect(coordinates[1][0]).toEqual([0, 0]);
        expect(coordinates[1][1]).toEqual([1, 1]);
      });

    });

    describe('polygon decoding', function() {

      it('correctly decodes a polygon', function() {
        var polygon = fhFormat.readGeometry('a(..DD.K\'!F_..!-.)');
        expect(polygon instanceof ol.geom.Polygon).toBeTruthy();
        var linearRingCount = polygon.getLinearRingCount();
        expect(linearRingCount).toBe(2);
        var ring;
        ring = polygon.getLinearRing(0);
        expect(ring.getCoordinates()).toEqual(
            [[0, 0], [4, 4], [4, -4], [0, 0]]);
        ring = polygon.getLinearRing(1);
        expect(ring.getCoordinates()).toEqual(
            [[2, 1], [3, 1], [3, -1], [2, -1], [2, 1]]);
      });

    });

    describe('multi polygon decoding', function() {

      it('correctly decodes a multi polygon', function() {
        var multiPolygon = fhFormat.readGeometry(
            'A(..DD.K\'!F_..!-.)(!_!!.D)');
        expect(multiPolygon instanceof ol.geom.MultiPolygon).toBeTruthy();
        var polygons = multiPolygon.getPolygons();
        expect(polygons.length).toBe(2);
        var polygon, linearRingCount, ring;
        polygon = polygons[0];
        linearRingCount = polygon.getLinearRingCount();
        expect(linearRingCount).toBe(2);
        ring = polygon.getLinearRing(0);
        expect(ring.getCoordinates()).toEqual(
            [[0, 0], [4, 4], [4, -4], [0, 0]]);
        ring = polygon.getLinearRing(1);
        expect(ring.getCoordinates()).toEqual(
            [[2, 1], [3, 1], [3, -1], [2, -1], [2, 1]]);
        polygon = polygons[1];
        linearRingCount = polygon.getLinearRingCount();
        expect(linearRingCount).toBe(1);
        ring = polygon.getLinearRing(0);
        expect(ring.getCoordinates()).toEqual(
            [[0, 0], [-2, -2], [-2, 2], [0, 0]]);
      });

    });

    describe('feature decoding', function() {

      it('correctly decodes a feature', function() {
        var feature = fhFormat.readFeature(
            'p(__~foo*foo\'bar*bar~fillColor*%23ff0101\'' +
            'strokeColor*%2301ff01\'strokeWidth*3\'' +
            'fontSize*12px\'fontColor*%230101ff)');
        expect(feature instanceof ol.Feature).toBeTruthy();
        var geometry = feature.getGeometry();
        expect(geometry instanceof ol.geom.Point).toBeTruthy();
        var coordinate = geometry.getCoordinates();
        expect(coordinate).toEqual([1, 1]);
        expect(feature.get('foo')).toBe('foo');
        expect(feature.get('bar')).toBe('bar');
        var style = feature.getStyle();
        expect(style instanceof ol.style.Style).toBeTruthy();
        var fillStyle = style.getFill();
        expect(fillStyle instanceof ol.style.Fill).toBeTruthy();
        var fillColor = fillStyle.getColor();
        expect(fillColor).toBe('#ff0101');
        var strokeStyle = style.getStroke();
        expect(strokeStyle instanceof ol.style.Stroke).toBeTruthy();
        var strokeColor = strokeStyle.getColor();
        expect(strokeColor).toBe('#01ff01');
        var imageStyle = style.getImage();
        expect(imageStyle).toBe(null);
        var textStyle = style.getText();
        expect(textStyle instanceof ol.style.Text);
        var font = textStyle.getFont();
        expect(font).toBe('12px sans-serif');
        var textFillStyle = textStyle.getFill();
        expect(textFillStyle instanceof ol.style.Fill);
        var textFillColor = textFillStyle.getColor();
        expect(textFillColor).toBe('#0101ff');
      });

    });

    describe('feature decoding with pointRadius', function() {
      it('correctly decodes a feature with pointRadius', function() {
        var feature = fhFormat.readFeature(
            'p(__~foo*foo\'bar*bar~fillColor*%23ff0101\'' +
            'strokeColor*%2301ff01\'strokeWidth*3\'' +
            'pointRadius*4)');
        expect(feature instanceof ol.Feature).toBeTruthy();
        var geometry = feature.getGeometry();
        expect(geometry instanceof ol.geom.Point).toBeTruthy();
        var coordinate = geometry.getCoordinates();
        expect(coordinate).toEqual([1, 1]);
        expect(feature.get('foo')).toBe('foo');
        expect(feature.get('bar')).toBe('bar');
        var style = feature.getStyle();
        expect(style instanceof ol.style.Style).toBeTruthy();
        var fillStyle = style.getFill();
        expect(fillStyle).toBe(null);
        var strokeStyle = style.getStroke();
        expect(strokeStyle).toBe(null);
        var imageStyle = style.getImage();
        expect(imageStyle instanceof ol.style.Image).toBeTruthy();
        var radius = imageStyle.getRadius();
        expect(radius).toBe(4);
        fillStyle = imageStyle.getFill();
        expect(fillStyle instanceof ol.style.Fill).toBeTruthy();
        var fillColor = fillStyle.getColor();
        expect(fillColor).toBe('#ff0101');
        strokeStyle = imageStyle.getStroke();
        expect(strokeStyle instanceof ol.style.Stroke).toBeTruthy();
        var strokeColor = strokeStyle.getColor();
        expect(strokeColor).toBe('#01ff01');
        var strokeWidth = strokeStyle.getWidth();
        expect(strokeWidth).toBe(3);
      });
    });

    describe('features decoding', function() {

      it('correctly decodes features', function() {
        var features = fhFormat.readFeatures('Fp(__)l(..__)');
        expect(features.length).toBe(2);
        var feature, geometry, coordinates;
        feature = features[0];
        expect(feature instanceof ol.Feature).toBeTruthy();
        geometry = feature.getGeometry();
        expect(geometry instanceof ol.geom.Point).toBeTruthy();
        var coordinates = geometry.getCoordinates();
        expect(coordinates).toEqual([1, 1]);
        feature = features[1];
        expect(feature instanceof ol.Feature).toBeTruthy();
        geometry = feature.getGeometry();
        expect(geometry instanceof ol.geom.LineString).toBeTruthy();
        coordinates = geometry.getCoordinates();
        expect(coordinates.length).toBe(2);
        expect(coordinates[0]).toEqual([0, 0]);
        expect(coordinates[1]).toEqual([1, 1]);
      });

    });

  });

  describe('encoding', function() {

    describe('point encoding', function() {

      it('correctly encodes a point', function() {
        var point = new ol.geom.Point([1, 1]);
        var result = fhFormat.writeGeometry(point);
        expect(result).toBe('p(__)');
      });

    });

    describe('multi point encoding', function() {

      it('correctly encodes a multi point', function() {
        var multiPoint = new ol.geom.MultiPoint([[0, 0], [1, 1]]);
        var result = fhFormat.writeGeometry(multiPoint);
        expect(result).toBe('P(..__)');
      });

    });

    describe('line string encoding', function() {

      it('correctly encodes a line', function() {
        var lineString = new ol.geom.LineString([[0, 0], [1, 1]]);
        var result = fhFormat.writeGeometry(lineString);
        expect(result).toBe('l(..__)');
      });

    });

    describe('multi line string encoding', function() {

      it('correctly encodes a multi line', function() {
        var multiLineString = new ol.geom.MultiLineString([
            [[0, 0], [1, 1]], [[0, 0], [1, 1]]
        ]);
        var result = fhFormat.writeGeometry(multiLineString);
        expect(result).toBe('L(..__\'--__)');
      });

    });

    describe('polygon encoding', function() {

      it('correctly encodes a polygon', function() {
        var polygon = new ol.geom.Polygon([
            [[0, 0], [4, 4], [4, -4], [0, 0]],
            [[2, 1], [3, 1], [3, -1], [2, -1], [2, 1]]
        ]);
        var result = fhFormat.writeGeometry(polygon);
        expect(result).toBe('a(..DD.K\'!F_..!-.)');
      });

    });

    describe('multi polygon encoding', function() {

      it('correctly encodes a multi polygon', function() {
        var multiPolygon = new ol.geom.MultiPolygon([
            [[[0, 0], [4, 4], [4, -4], [0, 0]],
            [[2, 1], [3, 1], [3, -1], [2, -1], [2, 1]]],
            [[[0, 0], [-2, -2], [-2, 2], [0, 0]]]
        ]);
        var result = fhFormat.writeGeometry(multiPolygon);
        expect(result).toBe('A(..DD.K\'!F_..!-.)(!_!!.D)');
      });

    });

    describe('point feature encoding', function() {

      it('correctly encodes a point feature', function() {
        var point = new ol.geom.Point([1, 1]);
        var feature = new ol.Feature({
          geometry: point,
          foo: 'foo',
          bar: 'bar'
        });
        feature.setStyle(new ol.style.Style({
          image: new ol.style.Circle({
            radius: 3,
            fill: new ol.style.Fill({
              color: [255, 1, 1, 1]
            }),
            stroke: new ol.style.Stroke({
              color: [1, 255, 1, 1],
              width: 2
            })
          })
        }));
        var result = fhFormat.writeFeature(feature);
        expect(result).toBe('p(__~foo*foo\'bar*bar~' +
            'pointRadius*3\'fillColor*%23ff0101\'' +
            'strokeColor*%2301ff01\'strokeWidth*2)');
      });

    });

    describe('line string feature encoding', function() {

      it('correctly encodes a line string feature', function() {
        var lineString = new ol.geom.LineString([[0, 0], [1, 1]]);
        var feature = new ol.Feature({
          geometry: lineString,
          foo: 'foo',
          bar: 'bar'
        });
        feature.setStyle(new ol.style.Style({
          stroke: new ol.style.Stroke({
            width: 2,
            color: [255, 1, 1, 1]
          })
        }));
        var result = fhFormat.writeFeature(feature);
        expect(result).toBe('l(..__~foo*foo\'bar*bar~' +
            'strokeColor*%23ff0101\'strokeWidth*2)');
      });

    });

    describe('polygon feature encoding', function() {

      it('correctly encodes a polygon feature', function() {
        var polygon = new ol.geom.Polygon([
            [[0, 0], [4, 4], [4, -4], [0, 0]],
            [[2, 1], [3, 1], [3, -1], [2, -1], [2, 1]]
        ]);
        var feature = new ol.Feature({
          geometry: polygon,
          foo: 'foo',
          bar: 'bar'
        });
        feature.setStyle(new ol.style.Style({
          fill: new ol.style.Fill({
            color: [255, 1, 1, 1]
          }),
          stroke: new ol.style.Stroke({
            color: [1, 255, 1, 1],
            width: 2
          }),
          text: new ol.style.Text({
            label: 'foo', // not encoded
            font: 'bold 12px Verdana',
            fill: new ol.style.Fill({
              color: [1, 255, 1, 1]
            })
          })
        }));
        var result = fhFormat.writeFeature(feature);
        expect(result).toBe('a(..DD.K\'!F_..!-.~foo*foo\'bar*bar~' +
            'fillColor*%23ff0101\'strokeColor*%2301ff01\'strokeWidth*2\'' +
            'fontSize*12px\'fontColor*%2301ff01)');
      });

    });

    describe('features encoding', function() {

      it('correctly encodes features', function() {
        var point = new ol.geom.Point([1, 1]);
        var pointFeature = new ol.Feature({
          geometry: point,
          foo: 'foo',
          bar: 'bar'
        });
        var lineString = new ol.geom.LineString([[0, 0], [1, 1]]);
        var lineStringFeature = new ol.Feature({
          geometry: lineString,
          foo: 'foo',
          bar: 'bar'
        });
        var features = [pointFeature, lineStringFeature];
        var result = fhFormat.writeFeatures(features);
        expect(result).toBe('Fp(__~foo*foo\'bar*bar)l(..__~foo*foo\'bar*bar)');
      });
    });

    describe('OpenLayers.Format.URLCompressed compatibility', function() {

      //
      // OpenLayers.Format.URLCompressed encodes the polygon
      //
      // [538820, 153580], [538720, 151980], [540400, 151300],
      // [541040, 151920], [541080, 153060], [540340, 154120],
      // [538820, 153580]
      //
      // to
      //
      // a(huv9Fhmrx_gy-z801u1-z9I1hHh4H1Uh9RgfJhqP)
      //

      beforeEach(function() {
        fhFormat = new ngeo.format.FeatureHash({accuracy: 0.1});
      });

      it('encodes as expected', function() {
        var polygon = new ol.geom.Polygon([[
            [538820, 153580], [538720, 151980], [540400, 151300],
            [541040, 151920], [541080, 153060], [540340, 154120],
            [538820, 153580]]]);
        var polygonFeature = new ol.Feature({
          geometry: polygon
        });
        var features = [polygonFeature];
        var result = fhFormat.writeFeatures(features);
        expect(result).toBe('Fa(huv9Fhmrx_gy-z801u1-z9I1hHh4H1Uh9RgfJhqP)');
      });

      it('decodes as expected', function() {
        var features = fhFormat.readFeatures(
            'Fa(huv9Fhmrx_gy-z801u1-z9I1hHh4H1Uh9RgfJhqP)');
        expect(features.length).toBe(1);
        var feature, geometry, coordinates;
        feature = features[0];
        expect(feature instanceof ol.Feature).toBeTruthy();
        geometry = feature.getGeometry();
        expect(geometry instanceof ol.geom.Polygon).toBeTruthy();
        coordinates = geometry.getCoordinates();
        expect(coordinates.length).toBe(1);
        coordinates = coordinates[0];
        expect(coordinates[0]).toEqual([538820, 153580]);
        expect(coordinates[1]).toEqual([538720, 151980]);
        expect(coordinates[2]).toEqual([540400, 151300]);
        expect(coordinates[3]).toEqual([541040, 151920]);
        expect(coordinates[4]).toEqual([541080, 153060]);
        expect(coordinates[5]).toEqual([540340, 154120]);
        expect(coordinates[6]).toEqual([538820, 153580]);
      });
    });

    describe('With a user-provided feature properties function', function() {
      it('encodes feature properties as expected', function() {
        fhFormat = new ngeo.format.FeatureHash({
          properties: function(feature) {
            return {foobar: feature.get('foo') + feature.get('bar')};
          }
        });
        var feature = new ol.Feature(new ol.geom.Point([1, 1]));
        feature.set('foo', 'foo');
        feature.set('bar', 'bar');
        var result = fhFormat.writeFeature(feature);
        expect(result).toBe('p(__~foobar*foobar)');
      });
    });

  });
});
