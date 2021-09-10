// The MIT License (MIT)
//
// Copyright (c) 2019-2021 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import olStyleIcon from 'ol/style/Icon';
import olStyleText from 'ol/style/Text';
import olStyleCircle from 'ol/style/Circle';
import olStyleStroke from 'ol/style/Stroke';
import olStyleFill from 'ol/style/Fill';
import olStyleStyle from 'ol/style/Style';
import olGeomLineString from 'ol/geom/LineString';
import olGeomPolygon from 'ol/geom/Polygon';
import olGeomPoint from 'ol/geom/Point';
import olFeature from 'ol/Feature';
import olCollection from 'ol/Collection';
import olSourceVector from 'ol/source/Vector';
import olLayerVector from 'ol/layer/Vector';
import ngeoPrintVectorEncoder from 'ngeo/print/VectorEncoder';

describe('ngeo.print.VectorEncoder', () => {
  /** @type {import('ngeo/print/VectorEncoder').default} */
  const vectorEncoder = new ngeoPrintVectorEncoder();
  /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintVectorLayer[]} */
  const layersMFP = [];
  const resolution = 20;
  const dpi = 254;
  const goodnessOfFit = 0.5;
  const inputFeatures = new olCollection();
  const layer = new olLayerVector({
    source: new olSourceVector({
      features: inputFeatures,
    }),
  });

  beforeEach(() => {
    inputFeatures.clear();
    layersMFP.length = 0;
  });

  it('Encode empty collection', () => {
    vectorEncoder.encodeVectorLayer(layersMFP, layer, resolution, dpi, goodnessOfFit);
    expect(layersMFP.length).toBe(0);
  });

  it('Encode one point with two styles', () => {
    const feature = new olFeature({
      geometry: new olGeomPoint([46, 7]),
    });
    feature.setStyle([
      new olStyleStyle({
        image: new olStyleCircle({
          radius: 5,
          fill: new olStyleFill({
            color: 'rgba(255,0,0,0.4)',
          }),
          stroke: new olStyleStroke({
            color: 'rgb(0,255,0)',
            width: 2,
          }),
        }),
      }),
      new olStyleStyle({
        image: new olStyleIcon({
          size: [36, 32],
          scale: 0.5,
          src: 'icon.png',
        }),
      }),
    ]);
    inputFeatures.push(feature);

    vectorEncoder.encodeVectorLayer(layersMFP, layer, resolution, dpi, goodnessOfFit);
    expect(layersMFP.length).toBe(1);

    const geoJson = /** @type {import("geojson").FeatureCollection} */ (layersMFP[0].geoJson);
    const features = geoJson.features;
    expect(features.length).toBe(1);
    expect(features[0].properties._ngeo_style).toBeTruthy();

    const style = layersMFP[0].style;
    const styleKey = `[_ngeo_style = '${features[0].properties._ngeo_style}']`;
    expect(style.version).toBe(2);

    expect(style[styleKey]).toBeTruthy();

    const vectorStyle = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizers} */ (
      style[styleKey]
    );
    const symbolizers = vectorStyle.symbolizers;
    expect(symbolizers.length).toBe(2);

    const symbol0 = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerPoint}*/ (
      symbolizers[0]
    );
    expect(symbol0.type).toEqual('point');
    expect(symbol0.pointRadius).toEqual(5);
    expect(symbol0.fillColor).toEqual('#ff0000');
    expect(symbol0.fillOpacity).toEqual(0.4);
    expect(symbol0.strokeColor).toEqual('#00ff00');
    expect(symbol0.strokeOpacity).toEqual(1);
    expect(symbol0.strokeWidth).toEqual(2);

    const symbol1 = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerPoint}*/ (
      symbolizers[1]
    );
    expect(symbol1.type).toEqual('point');
    expect(symbol1.externalGraphic.split('/').pop()).toEqual('icon.png');
    expect(symbol1.graphicOpacity).toEqual(1);
    expect(symbol1.graphicWidth).toEqual(18);
    expect(symbol1.graphicHeight).toEqual(16);
    expect(symbol1.rotation).toEqual(0);
  });

  it('Encode two polygons with same style', () => {
    const feature1 = new olFeature({
      geometry: new olGeomPolygon([
        [
          [46, 7],
          [47, 8],
          [46, 8],
          [46, 7],
        ],
      ]),
    });
    const feature2 = new olFeature({
      geometry: new olGeomPolygon([
        [
          [43, 7],
          [44, 8],
          [43, 8],
          [43, 7],
        ],
      ]),
    });
    const inputStyle = new olStyleStyle({
      fill: new olStyleFill({
        color: 'rgba(0,0,255,0.6)',
      }),
    });
    feature1.setStyle(inputStyle);
    feature2.setStyle(inputStyle);
    inputFeatures.extend([feature1, feature2]);

    vectorEncoder.encodeVectorLayer(layersMFP, layer, resolution, dpi, goodnessOfFit);
    expect(layersMFP.length).toBe(1);

    const geoJson = /** @type {import("geojson").FeatureCollection} */ (layersMFP[0].geoJson);
    const features = geoJson.features;
    expect(features.length).toBe(2);

    const style = layersMFP[0].style;
    const styleKey1 = `[_ngeo_style = '${features[0].properties._ngeo_style}']`;
    const styleKey2 = `[_ngeo_style = '${features[1].properties._ngeo_style}']`;
    expect(styleKey1).toEqual(styleKey2);
    expect(style[styleKey1]).toBeTruthy();

    const vectorStyle1 = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizers} */ (
      style[styleKey1]
    );
    const symbolizers = vectorStyle1.symbolizers;
    expect(symbolizers.length).toBe(1);
    const symbol0 = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerPolygon}*/ (
      symbolizers[0]
    );
    expect(symbol0.type).toEqual('polygon');
    expect(symbol0.fillColor).toEqual('#0000ff');
    expect(symbol0.fillOpacity).toEqual(0.6);
  });

  it('Encode line with text having a geometry', () => {
    const feature = new olFeature({
      geometry: new olGeomLineString([
        [46, 7],
        [46, 8],
        [47, 8],
      ]),
    });
    const inputStyles = [];
    // Line style
    inputStyles.push(
      new olStyleStyle({
        stroke: new olStyleStroke({
          color: '#aaaaaa',
          width: 3,
        }),
      })
    );
    // Text at end of segments
    // @ts-ignore: is a line string
    feature.getGeometry().forEachSegment(
      /**
       * @param {number[]} start
       * @param {number[]} end
       */
      (start, end) => {
        inputStyles.push(
          new olStyleStyle({
            geometry: new olGeomPoint(end),
            text: new olStyleText({
              fill: new olStyleFill({
                color: '#aa0000',
              }),
              font: '900 16px "sans serif"',
              offsetX: -2,
              offsetY: -4,
              text: 'Sample',
              rotateWithView: true,
              rotation: Math.PI / 2,
            }),
          })
        );
      }
    );
    feature.setStyle(inputStyles);
    inputFeatures.push(feature);

    vectorEncoder.encodeVectorLayer(layersMFP, layer, resolution, dpi, goodnessOfFit);
    expect(layersMFP.length).toBe(1);

    const geoJson = /** @type {import("geojson").FeatureCollection} */ (layersMFP[0].geoJson);
    const features = geoJson.features;
    // One feature and two style with geometries resulting as two new features.
    expect(features.length).toBe(3);
    expect(features[0].properties._ngeo_style).toBeTruthy();
    expect(features[1].properties._ngeo_style).toBeTruthy();
    expect(features[2].properties._ngeo_style).toBeTruthy();
    // @ts-ignore: access directly to coordinates
    expect(features[1].geometry.coordinates).not.toEqual(features[2].geometry.coordinates);

    const style = layersMFP[0].style;
    const styleKey1 = `[_ngeo_style = '${features[0].properties._ngeo_style}']`;
    const styleKey2 = `[_ngeo_style = '${features[1].properties._ngeo_style}']`;
    const styleKey3 = `[_ngeo_style = '${features[2].properties._ngeo_style}']`;
    expect(style[styleKey1]).toBeTruthy();
    expect(style[styleKey2]).toBeTruthy();
    expect(style[styleKey3]).toBeTruthy();

    // Line style
    const vectorStyle1 = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizers} */ (
      style[styleKey1]
    );
    const symbolizers = vectorStyle1.symbolizers;
    const symbol0 = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerLine}*/ (
      symbolizers[0]
    );
    expect(symbol0.type).toEqual('line');
    expect(symbol0.strokeColor).toEqual('#aaaaaa');
    expect(symbol0.strokeOpacity).toEqual(1);
    expect(symbol0.strokeWidth).toEqual(3);

    /**
     * Text styles (same for the two features)
     * @param {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerText[]} symbolizers
     */
    const fnExpectSymText = (symbolizers) => {
      expect(symbolizers[0].type).toEqual('Text');
      expect(symbolizers[0].label).toEqual('Sample');
      expect(symbolizers[0].labelAlign).toEqual('cm');
      expect(symbolizers[0].labelRotation).toEqual('90');
      expect(symbolizers[0].fontWeight).toEqual('900');
      expect(symbolizers[0].fontSize).toEqual('16px');
      expect(symbolizers[0].fontFamily).toEqual('sans serif');
      expect(symbolizers[0].fontColor).toEqual('#aa0000');
      expect(symbolizers[0].labelXOffset).toEqual(-2);
      expect(symbolizers[0].labelYOffset).toEqual(4); // Inverted for MFP
      expect(symbolizers[0].goodnessOfFit).toEqual(goodnessOfFit);
    };

    const vectorStyle2 = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizers}*/ (
      style[styleKey2]
    );
    const vs2Symbols = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerText[]} */ (
      vectorStyle2.symbolizers
    );
    fnExpectSymText(vs2Symbols);

    const vectorStyle3 = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizers}*/ (
      style[styleKey3]
    );
    const vs3Symbols = /** @type {import('ngeo/print/mapfish-print-v3').MapFishPrintSymbolizerText[]} */ (
      vectorStyle3.symbolizers
    );
    fnExpectSymText(vs3Symbols);
  });
});
