import olFeature from 'ol/Feature.js';
import olGeomMultiLineString from 'ol/geom/MultiLineString.js';
import olGeomMultiPoint from 'ol/geom/MultiPoint.js';
import olGeomMultiPolygon from 'ol/geom/MultiPolygon.js';
import olGeomLineString from 'ol/geom/LineString.js';
import olGeomPoint from 'ol/geom/Point.js';
import olGeomPolygon from 'ol/geom/Polygon.js';
import olStyleCircle from 'ol/style/Circle.js';
import olStyleFill from 'ol/style/Fill.js';
import olStyleStroke from 'ol/style/Stroke.js';
import olStyleStyle from 'ol/style/Style.js';
import olStyleText from 'ol/style/Text.js';
import olStyleImage from 'ol/style/Image.js';
import ngeoFormatFeatureHash from 'ngeo/format/FeatureHash.js';


describe('ngeo.format.FeatureHash', () => {

  let fhFormat;

  beforeEach(() => {
    ngeoFormatFeatureHash.ACCURACY_ = 1; // Easier to test
    fhFormat = new ngeoFormatFeatureHash();
  });

  describe('decoding', () => {

    describe('point decoding', () => {

      it('correctly decodes a point', () => {
        const point = fhFormat.readGeometry('p(__)');
        expect(point instanceof olGeomPoint).toBeTruthy();
        const coordinate = point.getCoordinates();
        expect(coordinate).toEqual([1, 1]);
      });

    });

    describe('multi point decoding', () => {

      it('correctly decodes a multi point', () => {
        const multiPoint = fhFormat.readGeometry('P(..__)');
        expect(multiPoint instanceof olGeomMultiPoint).toBeTruthy();
        const coordinates = multiPoint.getCoordinates();
        expect(coordinates.length).toBe(2);
        expect(coordinates[0]).toEqual([0, 0]);
        expect(coordinates[1]).toEqual([1, 1]);
      });

    });

    describe('line decoding', () => {

      it('correctly decodes a line', () => {
        const lineString = fhFormat.readGeometry('l(..__)');
        expect(lineString instanceof olGeomLineString).toBeTruthy();
        const coordinates = lineString.getCoordinates();
        expect(coordinates.length).toBe(2);
        expect(coordinates[0]).toEqual([0, 0]);
        expect(coordinates[1]).toEqual([1, 1]);
      });

    });

    describe('multi line decoding', () => {

      it('correctly decodes a multi line', () => {
        const multiLineString = fhFormat.readGeometry('L(..__\'--__)');
        expect(multiLineString instanceof olGeomMultiLineString).toBeTruthy();
        const coordinates = multiLineString.getCoordinates();
        expect(coordinates.length).toBe(2);
        expect(coordinates[0][0]).toEqual([0, 0]);
        expect(coordinates[0][1]).toEqual([1, 1]);
        expect(coordinates[1][0]).toEqual([0, 0]);
        expect(coordinates[1][1]).toEqual([1, 1]);
      });

    });

    describe('polygon decoding', () => {

      it('correctly decodes a polygon', () => {
        const polygon = fhFormat.readGeometry('a(..DD.K\'!F_..!-.)');
        expect(polygon instanceof olGeomPolygon).toBeTruthy();
        const linearRingCount = polygon.getLinearRingCount();
        expect(linearRingCount).toBe(2);
        let ring;
        ring = polygon.getLinearRing(0);
        expect(ring.getCoordinates()).toEqual(
          [[0, 0], [4, 4], [4, -4], [0, 0]]);
        ring = polygon.getLinearRing(1);
        expect(ring.getCoordinates()).toEqual(
          [[2, 1], [3, 1], [3, -1], [2, -1], [2, 1]]);
      });

    });

    describe('multi polygon decoding', () => {

      it('correctly decodes a multi polygon', () => {
        const multiPolygon = fhFormat.readGeometry(
          'A(..DD.K\'!F_..!-.)(!_!!.D)');
        expect(multiPolygon instanceof olGeomMultiPolygon).toBeTruthy();
        const polygons = multiPolygon.getPolygons();
        expect(polygons.length).toBe(2);
        let polygon, linearRingCount, ring;
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

    describe('feature decoding', () => {

      it('correctly decodes a feature', () => {
        const feature = fhFormat.readFeature(
          'p(__~foo*foo\'bar*bar~fillColor*%23ff0101\'' +
            'strokeColor*%2301ff01\'strokeWidth*3\'' +
            'fontSize*12px\'fontColor*%230101ff)');
        expect(feature instanceof olFeature).toBeTruthy();
        const geometry = feature.getGeometry();
        expect(geometry instanceof olGeomPoint).toBeTruthy();
        const coordinate = geometry.getCoordinates();
        expect(coordinate).toEqual([1, 1]);
        expect(feature.get('foo')).toBe('foo');
        expect(feature.get('bar')).toBe('bar');
        const style = feature.getStyle();
        expect(style instanceof olStyleStyle).toBeTruthy();
        const fillStyle = style.getFill();
        expect(fillStyle instanceof olStyleFill).toBeTruthy();
        const fillColor = fillStyle.getColor();
        expect(fillColor).toBe('#ff0101');
        const strokeStyle = style.getStroke();
        expect(strokeStyle instanceof olStyleStroke).toBeTruthy();
        const strokeColor = strokeStyle.getColor();
        expect(strokeColor).toBe('#01ff01');
        const imageStyle = style.getImage();
        expect(imageStyle).toBe(null);
        const textStyle = style.getText();
        expect(textStyle instanceof olStyleText);
        const font = textStyle.getFont();
        expect(font).toBe('12px sans-serif');
        const textFillStyle = textStyle.getFill();
        expect(textFillStyle instanceof olStyleFill);
        const textFillColor = textFillStyle.getColor();
        expect(textFillColor).toBe('#0101ff');
      });

    });

    describe('feature decoding with pointRadius', () => {
      it('correctly decodes a feature with pointRadius', () => {
        const feature = fhFormat.readFeature(
          'p(__~foo*foo\'bar*bar~fillColor*%23ff0101\'' +
            'strokeColor*%2301ff01\'strokeWidth*3\'' +
            'pointRadius*4)');
        expect(feature instanceof olFeature).toBeTruthy();
        const geometry = feature.getGeometry();
        expect(geometry instanceof olGeomPoint).toBeTruthy();
        const coordinate = geometry.getCoordinates();
        expect(coordinate).toEqual([1, 1]);
        expect(feature.get('foo')).toBe('foo');
        expect(feature.get('bar')).toBe('bar');
        const style = feature.getStyle();
        expect(style instanceof olStyleStyle).toBeTruthy();
        let fillStyle = style.getFill();
        expect(fillStyle).toBe(null);
        let strokeStyle = style.getStroke();
        expect(strokeStyle).toBe(null);
        const imageStyle = style.getImage();
        expect(imageStyle instanceof olStyleImage).toBeTruthy();
        const radius = imageStyle.getRadius();
        expect(radius).toBe(4);
        fillStyle = imageStyle.getFill();
        expect(fillStyle instanceof olStyleFill).toBeTruthy();
        const fillColor = fillStyle.getColor();
        expect(fillColor).toBe('#ff0101');
        strokeStyle = imageStyle.getStroke();
        expect(strokeStyle instanceof olStyleStroke).toBeTruthy();
        const strokeColor = strokeStyle.getColor();
        expect(strokeColor).toBe('#01ff01');
        const strokeWidth = strokeStyle.getWidth();
        expect(strokeWidth).toBe(3);
      });
    });

    describe('feature decoding with style, witout attributes', () => {
      it('correctly decodes a feature with style, witout attributes', () => {
        const feature = fhFormat.readFeature(
          'p(__~~fillColor*%23ff0101\'' +
            'strokeColor*%2301ff01\'strokeWidth*3\'' +
            'pointRadius*4)');
        expect(feature instanceof olFeature).toBeTruthy();
        const geometry = feature.getGeometry();
        expect(geometry instanceof olGeomPoint).toBeTruthy();
        const coordinate = geometry.getCoordinates();
        expect(coordinate).toEqual([1, 1]);
        const style = feature.getStyle();
        expect(style instanceof olStyleStyle).toBeTruthy();
        let fillStyle = style.getFill();
        expect(fillStyle).toBe(null);
        let strokeStyle = style.getStroke();
        expect(strokeStyle).toBe(null);
        const imageStyle = style.getImage();
        expect(imageStyle instanceof olStyleImage).toBeTruthy();
        const radius = imageStyle.getRadius();
        expect(radius).toBe(4);
        fillStyle = imageStyle.getFill();
        expect(fillStyle instanceof olStyleFill).toBeTruthy();
        const fillColor = fillStyle.getColor();
        expect(fillColor).toBe('#ff0101');
        strokeStyle = imageStyle.getStroke();
        expect(strokeStyle instanceof olStyleStroke).toBeTruthy();
        const strokeColor = strokeStyle.getColor();
        expect(strokeColor).toBe('#01ff01');
        const strokeWidth = strokeStyle.getWidth();
        expect(strokeWidth).toBe(3);
      });
    });

    describe('feature decoding with attributes, witout style', () => {
      it('correctly decodes a feature with attributes, witout style', () => {
        const feature = fhFormat.readFeature('p(__~foo*foo\'bar*bar~)');
        expect(feature instanceof olFeature).toBeTruthy();
        const geometry = feature.getGeometry();
        expect(geometry instanceof olGeomPoint).toBeTruthy();
        const coordinate = geometry.getCoordinates();
        expect(coordinate).toEqual([1, 1]);
        expect(feature.get('foo')).toBe('foo');
        expect(feature.get('bar')).toBe('bar');
      });
    });

    describe('features decoding', () => {

      it('correctly decodes features', () => {
        const features = fhFormat.readFeatures('Fp(__)l(..__)');
        expect(features.length).toBe(2);
        let feature, geometry, coordinates;
        feature = features[0];
        expect(feature instanceof olFeature).toBeTruthy();
        geometry = feature.getGeometry();
        expect(geometry instanceof olGeomPoint).toBeTruthy();
        coordinates = geometry.getCoordinates();
        expect(coordinates).toEqual([1, 1]);
        feature = features[1];
        expect(feature instanceof olFeature).toBeTruthy();
        geometry = feature.getGeometry();
        expect(geometry instanceof olGeomLineString).toBeTruthy();
        coordinates = geometry.getCoordinates();
        expect(coordinates.length).toBe(2);
        expect(coordinates[0]).toEqual([0, 0]);
        expect(coordinates[1]).toEqual([1, 1]);
      });

    });

  });

  describe('encoding', () => {

    describe('point encoding', () => {

      it('correctly encodes a point', () => {
        const point = new olGeomPoint([1, 1]);
        const result = fhFormat.writeGeometry(point);
        expect(result).toBe('p(__)');
      });

    });

    describe('multi point encoding', () => {

      it('correctly encodes a multi point', () => {
        const multiPoint = new olGeomMultiPoint([[0, 0], [1, 1]]);
        const result = fhFormat.writeGeometry(multiPoint);
        expect(result).toBe('P(..__)');
      });

    });

    describe('line string encoding', () => {

      it('correctly encodes a line', () => {
        const lineString = new olGeomLineString([[0, 0], [1, 1]]);
        const result = fhFormat.writeGeometry(lineString);
        expect(result).toBe('l(..__)');
      });

    });

    describe('multi line string encoding', () => {

      it('correctly encodes a multi line', () => {
        const multiLineString = new olGeomMultiLineString([
          [[0, 0], [1, 1]], [[0, 0], [1, 1]]
        ]);
        const result = fhFormat.writeGeometry(multiLineString);
        expect(result).toBe('L(..__\'--__)');
      });

    });

    describe('polygon encoding', () => {

      it('correctly encodes a polygon', () => {
        const polygon = new olGeomPolygon([
          [[0, 0], [4, 4], [4, -4], [0, 0]],
          [[2, 1], [3, 1], [3, -1], [2, -1], [2, 1]]
        ]);
        const result = fhFormat.writeGeometry(polygon);
        expect(result).toBe('a(..DD.K\'!F_..!-.)');
      });

    });

    describe('multi polygon encoding', () => {

      it('correctly encodes a multi polygon', () => {
        const multiPolygon = new olGeomMultiPolygon([
          [[[0, 0], [4, 4], [4, -4], [0, 0]],
            [[2, 1], [3, 1], [3, -1], [2, -1], [2, 1]]],
          [[[0, 0], [-2, -2], [-2, 2], [0, 0]]]
        ]);
        const result = fhFormat.writeGeometry(multiPolygon);
        expect(result).toBe('A(..DD.K\'!F_..!-.)(!_!!.D)');
      });

    });

    describe('point feature encoding', () => {

      it('correctly encodes a point feature', () => {
        const point = new olGeomPoint([1, 1]);
        const feature = new olFeature({
          geometry: point,
          foo: 'foo',
          bar: 'bar'
        });
        feature.setStyle(new olStyleStyle({
          image: new olStyleCircle({
            radius: 3,
            fill: new olStyleFill({
              color: [255, 1, 1, 1]
            }),
            stroke: new olStyleStroke({
              color: [1, 255, 1, 1],
              width: 2
            })
          })
        }));
        const result = fhFormat.writeFeature(feature);
        expect(result).toBe('p(__~foo*foo\'bar*bar~' +
            'pointRadius*3\'fillColor*%23ff0101\'' +
            'strokeColor*%2301ff01\'strokeWidth*2)');
      });

    });

    describe('line string feature encoding', () => {

      it('correctly encodes a line string feature', () => {
        const lineString = new olGeomLineString([[0, 0], [1, 1]]);
        const feature = new olFeature({
          geometry: lineString,
          foo: 'foo',
          bar: 'bar'
        });
        feature.setStyle(new olStyleStyle({
          stroke: new olStyleStroke({
            width: 2,
            color: [255, 1, 1, 1]
          })
        }));
        const result = fhFormat.writeFeature(feature);
        expect(result).toBe('l(..__~foo*foo\'bar*bar~' +
            'strokeColor*%23ff0101\'strokeWidth*2)');
      });

    });

    describe('polygon feature encoding', () => {

      it('correctly encodes a polygon feature', () => {
        const polygon = new olGeomPolygon([
          [[0, 0], [4, 4], [4, -4], [0, 0]],
          [[2, 1], [3, 1], [3, -1], [2, -1], [2, 1]]
        ]);
        const feature = new olFeature({
          geometry: polygon,
          foo: 'foo',
          bar: 'bar'
        });
        feature.setStyle(new olStyleStyle({
          fill: new olStyleFill({
            color: [255, 1, 1, 1]
          }),
          stroke: new olStyleStroke({
            color: [1, 255, 1, 1],
            width: 2
          }),
          text: new olStyleText({
            label: 'foo', // not encoded
            font: 'bold 12px Verdana',
            fill: new olStyleFill({
              color: [1, 255, 1, 1]
            })
          })
        }));
        const result = fhFormat.writeFeature(feature);
        expect(result).toBe('a(..DD.K\'!F_..!-.~foo*foo\'bar*bar~' +
            'fillColor*%23ff0101\'strokeColor*%2301ff01\'strokeWidth*2\'' +
            'fontSize*12px\'fontColor*%2301ff01)');
      });

    });

    describe('features encoding', () => {

      it('correctly encodes features', () => {
        const point = new olGeomPoint([1, 1]);
        const pointFeature = new olFeature({
          geometry: point,
          foo: 'foo',
          bar: 'bar'
        });
        const lineString = new olGeomLineString([[0, 0], [1, 1]]);
        const lineStringFeature = new olFeature({
          geometry: lineString,
          foo: 'foo',
          bar: 'bar'
        });
        const features = [pointFeature, lineStringFeature];
        const result = fhFormat.writeFeatures(features);
        expect(result).toBe('Fp(__~foo*foo\'bar*bar)l(..__~foo*foo\'bar*bar)');
      });
    });

    describe('OpenLayers.Format.URLCompressed compatibility', () => {

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

      beforeEach(() => {
        fhFormat = new ngeoFormatFeatureHash({accuracy: 0.1});
      });

      it('encodes as expected', () => {
        const polygon = new olGeomPolygon([[
          [538820, 153580], [538720, 151980], [540400, 151300],
          [541040, 151920], [541080, 153060], [540340, 154120],
          [538820, 153580]]]);
        const polygonFeature = new olFeature({
          geometry: polygon
        });
        const features = [polygonFeature];
        const result = fhFormat.writeFeatures(features);
        expect(result).toBe('Fa(huv9Fhmrx_gy-z801u1-z9I1hHh4H1Uh9RgfJhqP)');
      });

      it('decodes as expected', () => {
        const features = fhFormat.readFeatures(
          'Fa(huv9Fhmrx_gy-z801u1-z9I1hHh4H1Uh9RgfJhqP)');
        expect(features.length).toBe(1);
        const feature = features[0];
        expect(feature instanceof olFeature).toBeTruthy();
        const geometry = feature.getGeometry();
        expect(geometry instanceof olGeomPolygon).toBeTruthy();
        let coordinates = geometry.getCoordinates();
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

    describe('With a user-provided feature properties function', () => {
      it('encodes feature properties as expected', () => {
        fhFormat = new ngeoFormatFeatureHash({
          properties(feature) {
            return {foobar: feature.get('foo') + feature.get('bar')};
          }
        });
        const feature = new olFeature(new olGeomPoint([1, 1]));
        feature.set('foo', 'foo');
        feature.set('bar', 'bar');
        const result = fhFormat.writeFeature(feature);
        expect(result).toBe('p(__~foobar*foobar)');
      });
    });

  });
});
