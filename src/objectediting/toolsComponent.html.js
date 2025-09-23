// The MIT License (MIT)
//
// Copyright (c) 2024-2025 Camptocamp SA
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

export default `<div class="btn-group" role="group" aria-label="">
  <a
    href
    ngeo-btn
    ngeo-createfeature
    ngeo-createfeature-active="oetCtrl.drawActive"
    ngeo-createfeature-features="::oetCtrl.sketchFeatures"
    ngeo-createfeature-geom-type="::oetCtrl.geomType"
    ngeo-createfeature-map="::oetCtrl.map"
    class="btn btn-sm btn-default"
    ng-class="{active: oetCtrl.drawActive}"
    ng-if="::(oetCtrl.geomType === 'MultiPoint')"
    ng-model="oetCtrl.drawActive"
    title="{{'Add a point to the geometry' | translate}}"
  >
    <span class="fa-solid fa-square-plus gmf-icon-oe-draw"> </span>
  </a>
  <a
    href
    ngeo-btn
    ngeo-createfeature
    ngeo-createfeature-active="oetCtrl.drawActive"
    ngeo-createfeature-features="::oetCtrl.sketchFeatures"
    ngeo-createfeature-geom-type="::oetCtrl.geomType"
    ngeo-createfeature-map="::oetCtrl.map"
    class="btn btn-sm btn-default"
    ng-class="{active: oetCtrl.drawActive}"
    ng-if="::(oetCtrl.geomType === 'MultiLineString')"
    ng-model="oetCtrl.drawActive"
    title="{{'Add a linestring to the geometry' | translate}}"
  >
    <span class="fa-solid fa-square-plus gmf-icon-oe-draw"> </span>
  </a>
  <a
    href
    ngeo-btn
    ngeo-createfeature
    ngeo-createfeature-active="oetCtrl.drawActive"
    ngeo-createfeature-features="::oetCtrl.sketchFeatures"
    ngeo-createfeature-geom-type="::oetCtrl.geomType"
    ngeo-createfeature-map="::oetCtrl.map"
    class="btn btn-sm btn-default"
    ng-class="{active: oetCtrl.drawActive}"
    ng-if="::(oetCtrl.geomType === 'MultiPolygon')"
    ng-model="oetCtrl.drawActive"
    title="{{'Add a polygon to the geometry' | translate}}"
  >
    <span class="fa-solid fa-square-plus gmf-icon-oe-draw"> </span>
  </a>

  <a
    href
    ngeo-btn
    ngeo-createfeature
    ngeo-createfeature-active="oetCtrl.eraseActive"
    ngeo-createfeature-features="::oetCtrl.sketchFeatures"
    ngeo-createfeature-geom-type="::oetCtrl.geomTypePolygon"
    ngeo-createfeature-map="::oetCtrl.map"
    class="btn btn-sm btn-default"
    ng-class="{active: oetCtrl.eraseActive}"
    ng-model="oetCtrl.eraseActive"
    title="{{'Erase geometry' | translate}}"
  >
    <span class="fa-solid fa-square-minus gmf-icon-oe-erase"> </span>
  </a>

  <a
    href
    ng-if="::oetCtrl.geomType === 'MultiPolygon'"
    ngeo-btn
    ngeo-createregularpolygonfromclick
    ngeo-createregularpolygonfromclick-active="oetCtrl.drawTriangleActive"
    ngeo-createregularpolygonfromclick-angle="oetCtrl.triangleAngle"
    ngeo-createregularpolygonfromclick-features="::oetCtrl.sketchFeatures"
    ngeo-createregularpolygonfromclick-map="::oetCtrl.map"
    ngeo-createregularpolygonfromclick-radius="::oetCtrl.triangleRadius"
    class="btn btn-sm btn-default ngeo-createregularpolygonfromclick"
    ng-class="{active: oetCtrl.drawTriangleActive}"
    ng-model="oetCtrl.drawTriangleActive"
    title="{{'Draw a triangle' | translate}}"
  >
    <span class="fa-solid fa-play fa-rotate-270 gmf-icon-oe-triangle"> </span>
  </a>

  <a
    href
    ngeo-btn
    gmf-objecteditinggetwmsfeature
    gmf-objecteditinggetwmsfeature-active="oetCtrl.copyFromActive"
    gmf-objecteditinggetwmsfeature-features="::oetCtrl.sketchFeatures"
    gmf-objecteditinggetwmsfeature-layerinfo="oetCtrl.queryableLayerInfo"
    gmf-objecteditinggetwmsfeature-map="::oetCtrl.map"
    class="btn btn-sm btn-default gmf-objecteditinggetwmsfeature-add"
    ng-class="{active: oetCtrl.copyFromActive}"
    ng-model="oetCtrl.copyFromActive"
    title="{{'Copy from external WMS feature' | translate}}"
  >
    <span class="fa-solid fa-clone gmf-icon-oe-copyfrom"> </span>
  </a>

  <a
    href
    ngeo-btn
    gmf-objecteditinggetwmsfeature
    gmf-objecteditinggetwmsfeature-active="oetCtrl.deleteFromActive"
    gmf-objecteditinggetwmsfeature-features="::oetCtrl.sketchFeatures"
    gmf-objecteditinggetwmsfeature-layerinfo="oetCtrl.queryableLayerInfo"
    gmf-objecteditinggetwmsfeature-map="::oetCtrl.map"
    class="btn btn-sm btn-default gmf-objecteditinggetwmsfeature-delete"
    ng-class="{active: oetCtrl.deleteFromActive}"
    ng-model="oetCtrl.deleteFromActive"
    title="{{'Cut from external WMS feature' | translate}}"
  >
    <span class="fa-solid fa-scissors gmf-icon-oe-deletefrom"> </span>
  </a>
</div>`;
