// The MIT License (MIT)
//
// Copyright (c) 2015-2020 Camptocamp SA
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

import {
  area as d3area,
  bisector as d3bisector,
  extent as d3extent,
  select as d3select,
  scaleLinear as d3scaleLinear,
  axisBottom as d3axisBottom,
  axisLeft as d3axisLeft,
  line as d3line,
  pointer as d3pointer,
} from 'd3';

/**
 * Provides a D3js component to be used to draw an elevation
 * profile chart.
 *
 *     let selection = d3select('#element_id');
 *     let profile = ngeo.profile.d3Elevation({
 *       distanceExtractor: function (item) {return item['dist'];},
 *       linesConfiguration: {
 *         'lineZ1': {
 *           zExtractor: function (item) {return item['values']['z1'];}
 *         },
 *         'lineZ2': {
 *           color: '#00F',
 *           zExtractor: function (item) {return item['values']['z2'];}
 *         }
 *       },
 *       hoverCallback: function(point, dist, xUnits, elevations, yUnits) {
 *         console.log(point.x, point.y);
 *       },
 *       outCallback: function() {
 *         console.log("out");
 *       }
 *     });
 *     selection.datum(data).call(profile);
 *
 * The selection data must be an array.
 * The layout for the items of this array is unconstrained: the distance values
 * is extracted using the distanceExtractor config option and multiples z values
 * can be displayed by providing multiple linesConfiguration with its specific
 * zExtractor.
 * Optionally you can provide a color in your linesConfiguration. A line without
 * color will be red. Each linesConfiguration name is used as class for its
 * respective line. So you can pass a styleDefs config option (inline css) to
 * customize the line or all the chart.
 * Optionally, POIs can be displayed and depend on a poiExtractor
 * config option.
 *
 * The data below will work for the above example:
 *
 *     [
 *         {
 *             "y": 199340,
 *             "values": {"z1": 788.7, "z2": 774.2},
 *             "dist": 0.0,
 *             "x": 541620
 *         }, ...
 *     ]
 *
 * @return {unknown} D3js component.
 * @param {import('ngeo/options.js').ngeoProfileOptions} options Profile options.
 * @param {import('ngeo/profile/elevationComponent.js').ProfileOptions<unknown>} functions Profile options.
 * @private
 */
function d3Elevation(options, functions) {
  /**
   * Whether the simplified profile should be shown.
   * @type {boolean}
   */
  const light = options.light !== undefined ? options.light : false;

  /**
   * The values for margins around the chart defined in pixels.
   */
  const margin = light ? {top: 0, right: 0, bottom: 0, left: 0} : {top: 10, right: 20, bottom: 30, left: 40};

  /**
   * Hover callback function.
   * @type {function(Object, number, string, Object<string, number>, string): void}
   */
  const hoverCallback = functions.hoverCallback !== undefined ? functions.hoverCallback : () => {};

  /**
   * Out callback function.
   * @type {function}
   */
  const outCallback = functions.outCallback !== undefined ? functions.outCallback : () => {};

  /**
   * Distance data extractor used to get the dist values.
   */
  const distanceExtractor = functions.distanceExtractor;

  /**
   * Line configuration object.
   */
  const linesConfiguration = options.linesConfiguration;

  /**
   * Number of different configurations for the line.
   */
  const numberOfLines = Object.keys(linesConfiguration).length;

  /**
   * Method to get the coordinate in pixels from a distance.
   */
  const bisectDistance = d3bisector((d) => distanceExtractor(d)).left;

  /**
   * POI data extractor.
   */
  const poiExtractor = functions.poiExtractor;

  /**
   * Optional SVG inline style.
   */
  const styleDefs = options.styleDefs;

  /**
   * @type {number}
   */
  const poiLabelAngle = options.poiLabelAngle !== undefined ? options.poiLabelAngle : -60;

  /**
   * @type {Object<string, string>}
   */
  const i18n = functions.i18n || {};

  /**
   * @type {string}
   */
  const xAxisLabel = i18n.xAxis || 'Distance';

  /**
   * @type {string}
   */
  const yAxisLabel = i18n.yAxis || 'Elevation';

  /**
   * @type {import('ngeo/profile/elevationComponent.js').ProfileFormatter}
   */
  const formatter = {
    /**
     * @param {number} dist Distance.
     * @param {string} units Units.
     * @return {string} Distance.
     */
    xhover(dist, units) {
      return `${parseFloat(dist.toPrecision(3))} ${units}`;
    },
    /**
     * @param {number} ele Elevation.
     * @param {string} units Units.
     * @return {string} Elevation.
     */
    yhover(ele, units) {
      return ele !== null ? `${Math.round(ele)} m` : '';
    },
    /**
     * @param {number} dist Distance.
     * @param {string} units Units.
     * @return {string|number} Distance.
     */
    xtick(dist, units) {
      return dist;
    },
    /**
     * @param {number} ele Elevation.
     * @param {string} units Units.
     * @return {string|number} Elevation.
     */
    ytick(ele, units) {
      return ele;
    },
  };

  if (functions.formatter !== undefined) {
    Object.assign(formatter, functions.formatter);
  }

  /**
   * @type {boolean}
   */
  const lightXAxis = options.lightXAxis !== undefined ? options.lightXAxis : false;

  /**
   * @type {import('d3-selection').Selection<import('d3-selection').BaseType, ?, import('d3-selection').ContainerElement, ?>}
   */
  let svg;

  /**
   * D3 x scale.
   * @type {import('d3').ScaleLinear<number, number>}
   */
  let x;

  /**
   * D3 y scale.
   * @type {import('d3').ScaleLinear<number, number>}
   */
  let y;

  /**
   * Scale modifier to allow customizing the x and y scales.
   * @type {function(function, function, number, number): void}
   */
  const scaleModifier = functions.scaleModifier;

  /**
   * @type {import('d3-selection').Selection<import('d3-selection').BaseType, ?, import('d3-selection').ContainerElement, ?>}
   */
  let g;

  /**
   * Height of the chart in pixels
   * @type {number}
   */
  let height;

  /**
   * Width of the chart in pixels
   * @type {number}
   */
  let width;

  /**
   * Factor to determine whether to use 'm' or 'km'.
   * @type {number}
   */
  let xFactor;

  /**
   * Distance units. Either 'm' or 'km'.
   * @type {string}
   */
  let xUnits;

  /**
   * D3 extent of the distance.
   * @type {[number, number]}
   */
  let xDomain;

  /**
   * @param {d3.Selection<d3.BaseType, number[][], d3.BaseType, unknown>} selection The selection
   */
  const profile = function (selection) {
    /**
     * @this {d3.ContainerElement}
     * @param {number[][]} data The selected data
     * @param {number} index
     * @param {d3.BaseType[] | ArrayLike<d3.BaseType>} groups
     */
    const func = function (data, index, groups) {
      d3select(this).selectAll('svg').remove();
      if (data === undefined) {
        return;
      }

      width = Math.max(this.clientWidth - margin.right - margin.left, 0);
      x = d3scaleLinear().range([0, width]);

      height = Math.max(this.clientHeight - margin.top - margin.bottom, 0);
      y = d3scaleLinear().range([height, 0]);

      const xAxis = d3axisBottom(x);
      const yAxis = d3axisLeft(y);

      /** @type {?d3.Area<[number, number]>} */
      let area = null;
      if (numberOfLines === 1) {
        area = d3area()
          .x((d) => x(distanceExtractor(d)))
          .y0(height)
          .y1((d) => {
            const firstLineName = Object.keys(linesConfiguration)[0];
            return y(linesConfiguration[firstLineName].zExtractor(d));
          });
      }

      // Select the svg element, if it exists.
      svg = d3select(this).selectAll('svg').data([data]);
      // Otherwise, create the skeletal chart.
      const svgEnter = svg.enter().append('svg');
      // Then select it again to get the complete object.
      svg = d3select(this).selectAll('svg').data([data]);

      if (styleDefs !== undefined) {
        svgEnter.append('defs').append('style').attr('type', 'text/css').text(styleDefs);
      }
      const gEnter = svgEnter.append('g');

      clearPois();

      gEnter.style('font', '11px Arial');

      if (numberOfLines === 1) {
        gEnter.append('path').attr('class', 'area').style('fill', 'rgba(222, 222, 222, 0.5)');
      }

      gEnter.insert('g', ':first-child').attr('class', 'grid-y');

      if (!light) {
        gEnter.append('g').attr('class', 'x axis').attr('transform', `translate(0,${height})`);

        gEnter
          .append('text')
          .attr('class', 'x label')
          .attr('text-anchor', 'end')
          .attr('x', width - 4)
          .attr('y', height - 4);

        gEnter.append('g').attr('class', 'y axis');

        gEnter
          .append('text')
          .attr('class', 'y label')
          .attr('text-anchor', 'end')
          .attr('y', 6)
          .attr('dy', '.75em')
          .attr('transform', 'rotate(-90)')
          .style('fill', 'grey')
          .text(`${yAxisLabel} [m]`);

        gEnter
          .append('g')
          .attr('class', 'metas')
          .attr('transform', `translate(${width + 3}, 0)`);
      }

      gEnter.append('g').attr('class', 'pois');

      const xHover = gEnter.append('g').attr('class', 'x grid-hover');
      xHover.append('svg:line').attr('stroke-dasharray', '5,5');
      xHover.append('text');

      gEnter
        .append('rect')
        .attr('class', 'overlay')
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'none')
        .style('pointer-events', 'all');

      // Update the outer dimensions.
      svg
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

      // Update the inner dimensions.
      g = svg.select('g').attr('transform', `translate(${margin.left},${margin.top})`);

      xDomain = d3extent(data, (d) => distanceExtractor(d));
      x.domain(xDomain);

      // Return an array with the min and max value of the min/max values of
      // each lines.
      const yDomain = (function () {
        /** @type {number[]} */
        let elevationsValues = [];
        // Get min/max values (extent) of each lines.
        for (const name in linesConfiguration) {
          const extent = d3extent(data, (d) => linesConfiguration[name].zExtractor(d));
          // only include defined extent
          if (extent.every(Number.isFinite)) {
            elevationsValues = elevationsValues.concat(extent);
          }
        }
        return [Math.min(...elevationsValues), Math.max(...elevationsValues)];
      })();

      y.domain(yDomain);

      // set the ratio according to the horizontal distance
      if (scaleModifier !== undefined) {
        scaleModifier(x, y, width, height);
      } else {
        // By default, add a small padding so that it looks nicer
        const padding = (yDomain[1] - yDomain[0]) * 0.1;
        y.domain([yDomain[0] - padding, yDomain[1] + padding]);
      }

      // Update the area path.
      if (numberOfLines === 1) {
        if (!area) {
          throw new Error('Missing area');
        }
        g.select('.area').transition().attr('d', area);
      }

      // Set style and update the lines paths and y hover guides for each lines.
      let line, yHover;
      for (const name in linesConfiguration) {
        // Set style of each line and add a class with its respective name.
        gEnter
          .append('path')
          .attr('class', `line ${name}`)
          .style('stroke', linesConfiguration[name].color || '#F00')
          .style('fill', 'none');

        // Set y hover guides
        yHover = gEnter.append('g').attr('class', `y grid-hover ${name}`);
        yHover.append('svg:line').attr('stroke-dasharray', '5,5');
        yHover.append('text');

        // Configure the d3 line.
        line = d3line()
          .x((d) => x(distanceExtractor(d)))
          .y((d) => y(linesConfiguration[name].zExtractor(d)))
          .defined((d) => linesConfiguration[name].zExtractor(d) !== null);

        // Update path for the line.
        g.select(`.line.${name}`).transition().attr('d', line);
      }

      xFactor = xDomain[1] > 2000 ? 1000 : 1;
      xUnits = xDomain[1] > 2000 ? 'km' : 'm';

      if (!light) {
        xAxis.tickFormat(
          (domainValue) =>
            /** @type {string} */ (formatter.xtick(/** @type {number} */ (domainValue) / xFactor, xUnits))
        );
        if (lightXAxis) {
          xAxis.tickValues([0, x.domain()[1]]);
        }

        yAxis.tickFormat(
          (dommainValue) => /** @type {string} */ (formatter.ytick(/** @type {number} */ (dommainValue), 'm'))
        );

        g.select('.x.axis')
          .transition()
          .call(/** @type {any} */ (xAxis));

        g.select('.x.label')
          .text(`${xAxisLabel} [${xUnits}]`)
          .style('fill', 'grey')
          .style('shape-rendering', 'crispEdges');

        // Avoid too much lines with overlapping labels in small profiles
        if (height / 15 < 10) {
          yAxis.ticks(height / 15);
        }

        g.select('.y.axis')
          .transition()
          .call(/** @type {any} */ (yAxis));
      }

      g.select('.grid-y')
        .transition()
        .call(/** @type {any} */ (yAxis.tickSize(-width).tickFormat(null)))
        .selectAll('.tick line')
        .style('stroke', '#ccc')
        .style('opacity', 0.7);

      // remove the text, it was already added in '.y.axis'
      g.select('.grid-y').selectAll('.tick text').remove();

      g.selectAll('.axis')
        .selectAll('path, line')
        .style('fill', 'none')
        .style('stroke', '#000')
        .style('shape-rendering', 'crispEdges');

      g.select('.grid-y').select('path').style('stroke', 'none');

      g.selectAll('.grid-hover line').style('stroke', '#222').style('opacity', 0.8);

      g.select('.overlay').on('mouseout', mouseout).on('mousemove', mousemove);

      /**
       * @this {d3.ContainerElement}
       */
      function mousemove() {
        const mouseX = d3pointer(this)[0];
        const x0 = x.invert(mouseX);

        profile.highlight(x0);
      }

      function mouseout() {
        profile.clearHighlight();
      }
    };
    selection.each(func);
  };

  /**
   * Remove any highlight.
   * Fire the outCallback callback.
   */
  profile.clearHighlight = function () {
    g.selectAll('.grid-hover').style('display', 'none');
    outCallback.call(null);
  };

  /**
   * Highlight the given distance and corresponding elevation on chart.
   * Fire the hoverCallback callback with corresponding point.
   * @param {number} distance Distance.
   */
  profile.highlight = function (distance) {
    const data = svg.datum();
    const i = bisectDistance(data, distance);
    if (i >= data.length) {
      return;
    }

    const point = data[i];
    const dist = distanceExtractor(point);
    let elevation;
    const elevations = [];
    /** @type {Object<string, number>} */
    const elevationsRef = {};
    let lineName;

    for (lineName in linesConfiguration) {
      elevation = linesConfiguration[lineName].zExtractor(point);
      if (Number.isFinite(elevation)) {
        elevations.push(elevation);
        elevationsRef[lineName] = elevation;
        g.select(`.y.grid-hover.${lineName}`)
          .style('display', 'inline')
          .select('line')
          .attr('x1', x(0))
          .attr('y1', y(elevation))
          .attr('x2', width)
          .attr('y2', y(elevation));
      } else {
        // no data for this line: hide it
        g.select(`.y.grid-hover.${lineName}`).style('display', 'none');
      }
    }

    const y2 = y(Math.max.apply(null, elevations));
    g.select('.x.grid-hover')
      .style('display', 'inline')
      .select('line')
      .attr('x1', x(dist))
      .attr('y1', height)
      .attr('x2', x(dist))
      .attr('y2', Number.isFinite(y2) ? y2 : 0);

    const right = dist > xDomain[1] / 2;
    let xtranslate = x(dist);
    xtranslate += right ? -10 : 10;

    g.select('.x.grid-hover text')
      .text(formatter.xhover(dist / xFactor, xUnits))
      .style('text-anchor', right ? 'end' : 'start')
      .attr('transform', `translate(${xtranslate},${height - 10})`);

    // Display altitude on guides only if there is one line.
    if (numberOfLines === 1) {
      const hasValue = Number.isFinite(elevations[0]);
      g.select('.y.grid-hover text')
        .text(hasValue ? formatter.yhover(elevations[0], 'm') : 'no value')
        .style('text-anchor', right ? 'end' : 'start')
        .attr('transform', `translate(${xtranslate},${hasValue ? y(elevations[0]) - 10 : 0})`);
    }
    hoverCallback.call(null, point, dist / xFactor, xUnits, elevationsRef, 'm');
  };

  /**
   * @param {unknown[]} pois
   */
  profile.showPois = function (pois) {
    if (!svg) {
      return;
    }
    pois = pois !== undefined ? pois : [];
    console.assert(pois.length === 0 || poiExtractor !== undefined);

    const pe = poiExtractor;
    const g = svg.select('g');
    const profileData = svg.datum();
    const ps = g.select('.pois');

    const p = ps.selectAll('.poi').data(pois, (d) => {
      const i = bisectDistance(profileData, Math.round(pe.dist(d) * 10) / 10, 1);
      const point = profileData[i];
      if (point) {
        let lineName;
        const elevations = [];
        for (lineName in linesConfiguration) {
          elevations.push(linesConfiguration[lineName].zExtractor(point));
        }
        const z = Math.max.apply(null, elevations);
        pe.z(d, z);
      }
      return pe.id(d);
    });

    const poiEnterG = p.enter().append('g').attr('class', 'poi');

    poiEnterG
      .append('text')
      .attr('x', light ? 0 : 9)
      .attr('dy', '.35em')
      .attr('text-anchor', light ? 'middle' : 'start');

    poiEnterG.append('line').style('shape-rendering', 'crispEdges');

    poiEnterG.style('opacity', 0).transition().duration(1000).delay(100).style('opacity', 1);

    poiEnterG
      .selectAll('text')
      .attr('transform', (d) => {
        if (light) {
          return `translate(${x(pe.dist(d))},${y(pe.z(d)) - 10})`;
        } else {
          return `translate(${x(pe.dist(d))},${y(pe.z(d)) - 20}) rotate(${poiLabelAngle})`;
        }
      })
      .text((d) => `${pe.sort(d)}${light ? '' : ` - ${pe.title(d)}`}`);

    poiEnterG
      .selectAll('line')
      .style('stroke', 'grey')
      .attr('x1', (d) => x(pe.dist(d)))
      .attr('y1', (d) => y(y.domain()[0]))
      .attr('x2', (d) => x(pe.dist(d)))
      .attr('y2', (d) => y(pe.z(d)));

    // remove unused pois
    poiEnterG.exit().remove();
  };

  function clearPois() {
    profile.showPois([]);
  }

  return profile;
}

export default d3Elevation;
