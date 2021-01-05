// The MIT License (MIT)
//
// Copyright (c) 2016-2021 Camptocamp SA
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

// @ts-nocheck
import angular from 'angular';
import olLayerGroup from 'ol/layer/Group.js';
import olLayerImage from 'ol/layer/Image.js';
import olSourceImageWMS from 'ol/source/ImageWMS.js';
import olCollection from 'ol/Collection.js';
import ngeoTestDataWmtsCapabilities from '../data/wmtsCapabilities.js';

describe('ngeo.map.LayerHelper', () => {
  /** @type {import("ngeo/map/LayerHelper.js").LayerHelper} */
  let ngeoLayerHelper;
  const wmtsSrc = 'http://fake/wmts/capabilities.xml';
  const wmtsName = 'layer-7328';
  /** @type {angular.IHttpBackendService} */
  let $httpBackend;

  beforeEach(() => {
    angular.mock.inject((_ngeoLayerHelper_, _$httpBackend_) => {
      ngeoLayerHelper = _ngeoLayerHelper_;
      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET', wmtsSrc).respond(ngeoTestDataWmtsCapabilities);
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Create a basic WMS layer', () => {
    const layer = ngeoLayerHelper.createBasicWMSLayer('http://example.com/', 'a,b,c', 'image/jpeg');
    expect(layer.constructor).toBe(olLayerImage);
    const source = layer.getSource();
    expect(source.constructor).toBe(olSourceImageWMS);
    expect(source.getUrl()).toBe('http://example.com/');
    const params = source.getParams();
    expect(params.LAYERS).toBe('a,b,c');
    expect(params.FORMAT).toBe('image/jpeg');
  });

  it('Create a WMTS layer from capabilitites', () => {
    $httpBackend.expectGET(wmtsSrc);
    const spy = jasmine.createSpy();
    const promise = ngeoLayerHelper.createWMTSLayerFromCapabilitites(wmtsSrc, wmtsName);
    promise.then(spy);
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    /**
     * @type {import("ol/layer/Tile.js").default}
     */
    const layer = spy.calls.mostRecent().args[0];
    /**
     * @type {import("ol/source/WMTS.js").default}
     */
    const source = layer.getSource();
    expect(source.getLayer()).toBe(wmtsName);
  });

  it('Create a layergroup with layers', () => {
    const layer = ngeoLayerHelper.createBasicWMSLayer('', '');
    const collection = new olCollection();
    collection.push(layer);
    const group = ngeoLayerHelper.createBasicGroup(collection);
    expect(group.getLayersArray().length).toBe(1);
  });

  it('Get an array of layer from a group', () => {
    const layer = ngeoLayerHelper.createBasicWMSLayer('', '');
    const collection = new olCollection();
    collection.push(layer);
    const group = new olLayerGroup();
    group.setLayers(collection);
    expect(ngeoLayerHelper.getFlatLayers(group).length).toBe(1);
  });

  it('Get WMS legend url', () => {
    const url = 'http://test';
    const layerName = 'wmsLayer';
    const scale = 0;
    const wmsLegendURL = ngeoLayerHelper.getWMSLegendURL(url, layerName, scale);
    const expectedResult =
      `${url}?FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&` +
      `REQUEST=GetLegendGraphic&LAYER=${layerName}&SCALE=${scale}`;
    expect(expectedResult).toBe(wmsLegendURL);
  });

  it('Get WMS legend icon url', () => {
    const url = 'http://test';
    const layerName = 'wmsLayer';
    const legendRule = 'legendRule';
    const wmsLegendURL = ngeoLayerHelper.getWMSLegendURL(url, layerName, undefined, legendRule);
    const expectedResult =
      `${url}?FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&` +
      `REQUEST=GetLegendGraphic&LAYER=${layerName}&RULE=${legendRule}`;
    expect(expectedResult).toBe(wmsLegendURL);
  });

  it('Get WMTS legend url', () => {
    $httpBackend.expectGET(wmtsSrc);
    const spy = jasmine.createSpy();
    const promise = ngeoLayerHelper.createWMTSLayerFromCapabilitites(wmtsSrc, wmtsName);
    promise.then(spy);
    $httpBackend.flush();

    expect(spy.calls.count()).toBe(1);
    /**
     * @type {import("ol/layer/Tile.js").default}
     */
    const layer = spy.calls.mostRecent().args[0];
    const capabilitiesStyles = [{legendURL: [{href: 'http://legendURL'}]}];
    layer.set('capabilitiesStyles', capabilitiesStyles);
    const legend = ngeoLayerHelper.getWMTSLegendURL(layer);
    expect(legend).toBe('http://legendURL');
  });
});
