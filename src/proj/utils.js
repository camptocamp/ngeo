// The MIT License (MIT)
//
// Copyright (c) 2018-2024 Camptocamp SA
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

import {get as getProjection} from 'ol/proj';
import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';

/**
 * @type {string} the projection code.
 * @type {import('gmf/options').Projection} the projection settings.
 * @returns {import('ol/proj/Projection').default} the registered projection.
 */
export function createProjection(code, projection) {
  proj4.defs(code, projection.definition.join(' ').trim());
  const match = /^EPSG:(\d+)$/.exec(code);
  if (match !== null) {
    proj4.defs(
      'http://www.opengis.net/gml/srs/epsg.xml#' + match[1], //NOSONAR
      proj4.defs(code),
    );
  }
  register(proj4);
  const proj = getProjection(code);
  proj.setExtent(projection.extent);
  return proj;
}

/** @type {import('gmf/options').gmfProjectionsOptions} */
export default function createProjections(projections) {
  for (const code in projections) {
    createProjection(code, projections[code]);
  }
}
