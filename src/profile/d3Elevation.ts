// The MIT License (MIT)
//
// Copyright (c) 2015-2022 Camptocamp SA
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

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable jsdoc/no-undefined-types */

import d3, {
  area as d3area,
  bisector as d3bisector,
  extent as d3extent,
  select as d3select,
  scaleLinear as d3scaleLinear,
  axisBottom as d3axisBottom,
  axisLeft as d3axisLeft,
  line as d3line,
  pointer as d3pointer,
  ScaleLinear,
  NumberValue,
} from 'd3';

import {ProfileFormatter as NgeoProfileElevationComponentProfileFormatter} from 'ngeo/profile/elevationComponent';
import {Selection as D3SelectionSelection} from 'd3-selection';
import {BaseType as D3SelectionBaseType} from 'd3-selection';
import {ContainerElement as D3SelectionContainerElement} from 'd3-selection';
import {ScaleLinear as D3ScaleLinear} from 'd3';
import {ngeoProfileOptions as ngeoOptionsNgeoProfileOptions} from 'ngeo/options';
import {ProfileOptions as NgeoProfileElevationComponentProfileOptions} from 'ngeo/profile/elevationComponent';

type HoverCbFunction = {
  (arg1: any, arg2: number, arg3: string, arg4: Record<any, any>, arg5: string): void;
};

type scaleModifierFunction = {
  (
    args1: ScaleLinear<number, number, never>,
    args2: ScaleLinear<number, number, never>,
    args3: number,
    args4: number
  ): void;
};

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
 * @param {ngeoOptionsNgeoProfileOptions} options Profile options.
 * @param {NgeoProfileElevationComponentProfileOptions<unknown>} functions Profile options.
 * @returns D3js component.
 * @private
 */
function d3Elevation(
  options: ngeoOptionsNgeoProfileOptions,
  functions: NgeoProfileElevationComponentProfileOptions<unknown>
): unknown {
  /**
   * Whether the simplified profile should be shown.
   */
  const light: boolean = options.light !== undefined ? options.light : false;

  /**
   * The values for margins around the chart defined in pixels.
   */
  const margin = light ? {top: 0, right: 0, bottom: 0, left: 0} : {top: 10, right: 20, bottom: 30, left: 40};

  /**
   * Hover callback function.
   */
  const hoverCallback: HoverCbFunction =
    functions.hoverCallback !== undefined ? functions.hoverCallback : () => {};

  /**
   * Out callback function.
   */
  const outCallback: () => unknown = functions.outCallback !== undefined ? functions.outCallback : () => {};

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
  const bisectDistance = d3bisector((d) => distanceExtractor(d)).left; // eslint-disable-line @typescript-eslint/unbound-method

  /**
   * POI data extractor.
   */
  const poiExtractor = functions.poiExtractor;

  /**
   * Optional SVG inline style.
   */
  const styleDefs = options.styleDefs;

  const poiLabelAngle: number = options.poiLabelAngle !== undefined ? options.poiLabelAngle : -60;

  const i18n: Record<string, unknown> = functions.i18n || {};

  const xAxisLabel: unknown = i18n.xAxis || 'Distance';

  const yAxisLabel: unknown = i18n.yAxis || 'Elevation';

  const formatter: NgeoProfileElevationComponentProfileFormatter = {
    /**
     * @param {number} dist Distance.
     * @param {string} units Units.
     * @returns {string} Distance.
     */
    xhover(dist: number, units: string): string {
      return `${parseFloat(dist.toPrecision(3))} ${units}`;
    },
    /**
     * @param {number} ele Elevation.
     * @returns {string} Elevation.
     */
    yhover(ele: number): string {
      return ele !== null ? `${Math.round(ele)} m` : '';
    },
    /**
     * @param {number} dist Distance.
     * @returns {string|number} Distance.
     */
    xtick(dist: number): string | number {
      return dist;
    },
    /**
     * @param {number} ele Elevation.
     * @returns {string|number} Elevation.
     */
    ytick(ele: number): string | number {
      return ele;
    },
  };

  if (functions.formatter !== undefined) {
    Object.assign(formatter, functions.formatter);
  }

  const lightXAxis: boolean = options.lightXAxis !== undefined ? options.lightXAxis : false;

  let svg: D3SelectionSelection<D3SelectionBaseType, any, D3SelectionContainerElement, any>;

  /**
   * D3 x scale.
   */
  let x: D3ScaleLinear<number, number>;

  /**
   * D3 y scale.
   */
  let y: D3ScaleLinear<number, number>;

  /**
   * Scale modifier to allow customizing the x and y scales.
   */
  const scaleModifier: scaleModifierFunction = functions.scaleModifier;

  let g: D3SelectionSelection<D3SelectionBaseType, any, D3SelectionContainerElement, any>;

  /**
   * Height of the chart in pixels
   */
  let height: number;

  /**
   * Width of the chart in pixels
   */
  let width: number;

  /**
   * Factor to determine whether to use 'm' or 'km'.
   */
  let xFactor: number;

  /**
   * Distance units. Either 'm' or 'km'.
   */
  let xUnits: string;

  /**
   * D3 extent of the distance.
   */
  let xDomain: [number, number];

  /**
   * @param {d3.Selection<d3.BaseType, number[][], d3.BaseType, unknown>} selection The selection
   */
  const profile = function (selection: d3.Selection<d3.BaseType, number[][], d3.BaseType, unknown>) {
    /**
     * @this {d3.ContainerElement}
     * @param {number[][]} data The selected data
     * @param {number} index .
     * @param {d3.BaseType[] | ArrayLike<d3.BaseType>} groups .
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const func = function (data: number[][], index: number, groups: d3.BaseType[] | ArrayLike<d3.BaseType>) {
      // @ts-ignore
      const element: ContainerElement = this; // eslint-disable-line  @typescript-eslint/no-this-alias,  @typescript-eslint/no-explicit-any
      d3select(element).selectAll('svg').remove();
      if (data === undefined) {
        return;
      }

      width = Math.max(element.clientWidth - margin.right - margin.left, 0);
      x = d3scaleLinear().range([0, width]);

      height = Math.max(element.clientHeight - margin.top - margin.bottom, 0);
      y = d3scaleLinear().range([height, 0]);

      const xAxis = d3axisBottom(x);
      const yAxis = d3axisLeft(y);

      let area: undefined | d3.Area<[number, number]> = null;
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
      svg = d3select(element).selectAll('svg').data([data]);
      // Otherwise, create the skeletal chart.
      const svgEnter = svg.enter().append('svg');
      // Then select it again to get the complete object.
      svg = d3select(element).selectAll('svg').data([data]);

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
          .text(`${yAxisLabel} [m]`); // eslint-disable-line @typescript-eslint/restrict-template-expressions

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
        let elevationsValues: number[] = [];
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
          (domainValue: NumberValue) => `${formatter.xtick((domainValue as number) / xFactor, xUnits)}`
        );

        if (lightXAxis) {
          xAxis.tickValues([0, x.domain()[1]]);
        }

        yAxis.tickFormat((domainValue: NumberValue) => `${formatter.ytick(domainValue as number, 'm')}`);

        // @ts-ignore
        g.select('.x.axis').transition().call(xAxis);

        g.select('.x.label')
          .text(`${xAxisLabel} [${xUnits}]`) // eslint-disable-line @typescript-eslint/restrict-template-expressions
          .style('fill', 'grey')
          .style('shape-rendering', 'crispEdges');

        // Avoid too much lines with overlapping labels in small profiles
        if (height / 15 < 10) {
          yAxis.ticks(height / 15);
        }

        // @ts-ignore
        g.select('.y.axis').transition().call(yAxis);
      }

      g.select('.grid-y')
        .transition()
        // @ts-ignore
        .call(yAxis.tickSize(-width).tickFormat(null))
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
       * Generate the highlight from the mouse position
       *
       * @param event Event
       */
      function mousemove(event: Event): void {
        const mouseX = d3pointer(event)[0];
        const x0 = x.invert(mouseX);

        profile.highlight(x0);
      }

      /**
       * Clear the highlight
       */
      function mouseout(): void {
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
   *
   * @param {number} distance Distance.
   */
  profile.highlight = function (distance: number) {
    const data = svg.datum();
    const i = bisectDistance(data, distance);
    if (i >= data.length) {
      return;
    }

    const point = data[i];
    const dist = distanceExtractor(point);
    let elevation;
    const elevations = [];
    const elevationsRef: Record<string, unknown> = {};
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
   * @param {any} pois .
   */
  profile.showPois = function (pois: any[]) {
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
      .attr('y1', () => y(y.domain()[0]))
      .attr('x2', (d) => x(pe.dist(d)))
      .attr('y2', (d) => y(pe.z(d)));

    // remove unused pois
    poiEnterG.exit().remove();
  };

  /**
   * Clear POIs
   */
  function clearPois(): void {
    profile.showPois([]);
  }

  return profile;
}

export default d3Elevation;
