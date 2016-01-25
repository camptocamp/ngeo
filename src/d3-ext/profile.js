goog.provide('ngeo.profile');

goog.require('goog.object');


/**
 * Provides a D3js component to be used to draw an elevation
 * profile chart.
 *
 *     var selection = d3.select('#element_id');
 *     var profile = ngeo.profile({
 *      elevationExtractor: {
 *        z: function (item) {return item['values']['z'];)},
 *        dist: function (item) {return item['dist'];)}
 *      },
 *      hoverCallback: function(point, dist, xUnits, ele, yUnits) {
 *        console.log(point.x, point.y);
 *      },
 *      outCallback: function() {
 *        console.log("out");
 *      }});
 *     selection.datum(data).call(profile);
 *
 * The selection data must be an array.
 * The layout for the items of this array is unconstrained: the elevation
 * and distance values are extracted using the elevationExtractor config
 * option. Optionally, POIs can be displayed and depend on a poiExtractor
 * config option.
 *
 * The data below will work for the above example:
 *
 *     [
 *         {
 *             "y": 199340,
 *             "values": {"z": 788.7},
 *             "dist": 0.0,
 *             "x": 541620
 *         }, ...
 *     ]
 *
 * @constructor
 * @return {Object} D3js component.
 * @param {ngeox.profile.ProfileOptions} options Profile options.
 * @export
 */
ngeo.profile = function(options) {
  /**
   * Whether the simplified profile should be shown.
   * @type {boolean}
   */
  var light = goog.isDef(options.light) ? options.light : false;


  /**
   * The values for margins around the chart defined in pixels.
   */
  var margin = light ? {top: 0, right: 0, bottom: 0, left: 0} :
      {top: 10, right: 20, bottom: 30, left: 40};

  /**
   * Method to get the coordinate in pixels from a distance.
   */
  var bisectDistance = d3.bisector(function(d) {
    return elevationExtractor.dist(d);
  }).left;


  /**
   * Hover callback function.
   * @type {function(Object, number, string, number, string)}
   */
  var hoverCallback = goog.isDef(options.hoverCallback) ?
      options.hoverCallback : goog.nullFunction;

  /**
   * Out callback function.
   * @type {function()}
   */
  var outCallback = goog.isDef(options.outCallback) ?
      options.outCallback : goog.nullFunction;

  /**
   * Elevation data extractor used to get the dist and elevation values.
   */
  var elevationExtractor = options.elevationExtractor;

  /**
   * POI data extractor.
   */
  var poiExtractor = options.poiExtractor;

  /**
   * Optional SVG inline style.
   */
  var styleDefs = options.styleDefs;

  /**
   * @type {number}
   */
  var poiLabelAngle = goog.isDef(options.poiLabelAngle) ?
      options.poiLabelAngle : -60;

  /**
   * @type {ngeox.profile.ProfileFormatter}
   */
  var formatter = {
    /**
     * @param {number} dist Distance.
     * @param {string} units Units.
     * @return {string} Distance.
     */
    xhover: function(dist, units) {
      return parseFloat(dist.toPrecision(3)) + ' ' + units;
    },
    /**
     * @param {number} ele Elevation.
     * @param {string} units Units.
     * @return {string} Elevation.
     */
    yhover: function(ele, units) {
      return Math.round(ele) + ' m';
    },
    /**
     * @param {number} dist Distance.
     * @param {string} units Units.
     * @return {string|number} Distance.
     */
    xtick: function(dist, units) {
      return dist;
    },
    /**
     * @param {number} ele Elevation.
     * @param {string} units Units.
     * @return {string|number} Elevation.
     */
    ytick: function(ele, units) {
      return ele;
    }
  };

  if (goog.isDef(options.formatter)) {
    goog.object.extend(formatter, options.formatter);
  }

  /**
   * @type {boolean}
   */
  var lightXAxis = goog.isDef(options.lightXAxis) ? options.lightXAxis : false;

  // Objects shared with the showPois function
  /**
   * @type {Object}
   */
  var svg;

  /**
   * D3 x scale.
   */
  var x;

  /**
   * D3 y scale.
   */
  var y;

  /**
   * Scale modifier to allow customizing the x and y scales.
   */
  var scaleModifier = options.scaleModifier;

  var g;

  /**
   * Height of the chart in pixels
   */
  var height;

  /**
   * Width of the chart in pixels
   */
  var width;

  /**
  * Factor to determine whether to use 'm' or 'km'.
  */
  var xFactor;

  /**
  * Distance units. Either 'm' or 'km'.
  */
  var xUnits;

  /**
   * D3 extent of the distance.
   */
  var xDomain;


  var profile = function(selection) {
    selection.each(function(data) {
      if (!goog.isDef(data)) {
        d3.select(this).selectAll('svg').remove();
        return;
      }

      var extractor = elevationExtractor;

      width = Math.max(this.clientWidth - margin.right - margin.left, 0);
      x = d3.scale.linear().range([0, width]);

      height = Math.max(this.clientHeight - margin.top - margin.bottom, 0);
      y = d3.scale.linear().range([height, 0]);

      var xAxis = d3.svg.axis().scale(x).orient('bottom');
      var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left');

      var area = d3.svg.area()
          .x(function(d) {
            return x(extractor.dist(d));
          })
          .y0(height)
          .y1(function(d) {
            return y(extractor.z(d));
          });
      var line = d3.svg.line()
          .x(function(d) {
            return x(extractor.dist(d));
          })
          .y(function(d) {
            return y(extractor.z(d));
          });

      // Select the svg element, if it exists.
      svg = d3.select(this).selectAll('svg').data([data]);

      // Otherwise, create the skeletal chart.
      var svgEnter = svg.enter().append('svg');
      if (goog.isDef(styleDefs)) {
        svgEnter.append('defs').append('style')
          .attr('type', 'text/css')
          .text(styleDefs);
      }
      var gEnter = svgEnter.append('g');
      clearPois();

      gEnter.style('font', '11px Arial');
      gEnter.append('path').attr('class', 'area')
          .style('fill', 'rgba(222, 222, 222, 0.5)');
      gEnter.append('path').attr('class', 'line')
          .style('stroke', '#F00')
          .style('fill', 'none');

      gEnter.insert('g', ':first-child')
          .attr('class', 'grid-y');

      if (!light) {
        gEnter.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')');

        gEnter.append('text')
          .attr('class', 'x label')
          .attr('text-anchor', 'end')
          .attr('x', width - 4)
          .attr('y', height - 4);

        gEnter.append('g')
          .attr('class', 'y axis');

        gEnter.append('text')
          .attr('class', 'y label')
          .attr('text-anchor', 'end')
          .attr('y', 6)
          .attr('dy', '.75em')
          .attr('transform', 'rotate(-90)')
          .style('fill', 'grey')
          .text('elevation (m)');

        gEnter.append('g')
          .attr('class', 'metas')
          .attr('transform', 'translate(' + (width + 3) + ', 0)');
      }

      gEnter.append('g').attr('class', 'pois');

      var yHover = gEnter.append('g').attr('class', 'y grid-hover');
      yHover.append('svg:line').attr('stroke-dasharray', '5,5');
      yHover.append('text');

      var xHover = gEnter.append('g').attr('class', 'x grid-hover');
      xHover.append('svg:line').attr('stroke-dasharray', '5,5');
      xHover.append('text');

      gEnter.append('rect')
          .attr('class', 'overlay')
          .attr('width', width)
          .attr('height', height)
          .style('fill', 'none')
          .style('pointer-events', 'all');

      // Update the outer dimensions.
      svg.attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom);

      // Update the inner dimensions.
      g = svg.select('g')
          .attr('transform', 'translate(' + margin.left + ',' +
              margin.top + ')');

      xDomain = d3.extent(data, function(d) {
        return extractor.dist(d);
      });
      x.domain(xDomain);

      var yDomain = d3.extent(data, function(d) {
        return extractor.z(d);
      });
      y.domain(yDomain);

      // set the ratio according to the horizontal distance
      if (goog.isDef(scaleModifier)) {
        scaleModifier(x, y, width, height);
      } else {
        // By default, add a small padding so that it looks nicer
        var padding = (yDomain[1] - yDomain[0]) * 0.1;
        y.domain([yDomain[0] - padding, yDomain[1] + padding]);
      }

      // Update the area path.
      g.select('.area')
          .transition()
          .attr('d', area);
      g.select('.line')
          .transition()
          .attr('d', line);

      if (xDomain[1] > 2000) {
        xFactor = 1000;
        xUnits = 'km';
      } else {
        xFactor = 1;
        xUnits = 'm';
      }

      if (!light) {
        xAxis.tickFormat(function(d) {
          return formatter.xtick(d / xFactor, xUnits);
        });
        if (lightXAxis) {
          xAxis.tickValues([0, x.domain()[1]]);
        }

        yAxis.tickFormat(function(d) {
          return formatter.ytick(d, 'm');
        });

        g.select('.x.axis')
          .transition()
          .call(xAxis);

        g.select('.x.label')
          .text('distance (' + xUnits + ')')
          .style('fill', 'grey')
          .style('shape-rendering', 'crispEdges');

        // Avoid too much lines with overlapping labels in small profiles
        if (height / 15 < 10) {
          yAxis.ticks(height / 15);
        }

        g.select('.y.axis')
          .transition()
          .call(yAxis);
      }

      g.select('.grid-y')
          .transition()
          .call(yAxis.tickSize(-width, 0).tickFormat(''))
          .selectAll('.tick line')
          .style('stroke', '#ccc')
          .style('opacity', 0.7);

      g.selectAll('.axis').selectAll('path, line')
          .style('fill', 'none')
          .style('stroke', '#000')
          .style('shape-rendering', 'crispEdges');

      g.selectAll('.grid-hover line')
          .style('stroke', '#222')
          .style('opacity', 0.8);

      g.select('.overlay')
          .on('mouseout', mouseout)
          .on('mousemove', mousemove);

      function mousemove() {
        var mouseX = d3.mouse(this)[0];
        var x0 = x.invert(mouseX);

        profile.highlight(x0);
      }

      function mouseout() {
        profile.clearHighlight();
      }
    });
  };

  /**
   * Remove any highlight.
   * Fire the outCallback callback.
   */
  profile.clearHighlight = function() {
    g.selectAll('.grid-hover')
        .style('display', 'none');
    outCallback.call(null);
  };

  /**
   * Highlight the given distance and corresponding elevation on chart.
   * Fire the hoverCallback callback with corresponding point.
   * @param {number} distance Distance.
   */
  profile.highlight = function(distance) {
    var data = svg.datum();
    var i = bisectDistance(data, distance);
    if (i >= data.length) {
      return;
    }

    var point = data[i];

    var extractor = elevationExtractor;
    var elevation = extractor.z(point);
    var dist = extractor.dist(point);

    g.select('.x.grid-hover')
        .style('display', 'inline')
        .select('line')
        .attr('x1', x(dist))
        .attr('y1', height)
        .attr('x2', x(dist))
        .attr('y2', y(elevation));

    g.select('.y.grid-hover')
        .style('display', 'inline')
        .select('line')
        .attr('x1', x(0))
        .attr('y1', y(elevation))
        .attr('x2', width)
        .attr('y2', y(elevation));

    var right = dist > xDomain[1] / 2;
    var xtranslate = x(dist);
    xtranslate += right ? -10 : 10;

    g.select('.x.grid-hover text')
        .text(formatter.xhover(dist / xFactor, xUnits))
        .style('text-anchor', right ? 'end' : 'start')
        .attr('transform', 'translate(' + xtranslate + ',' +
            (height - 10) + ')');

    var yUnits = 'm';
    g.select('.y.grid-hover text')
        .text(formatter.yhover(elevation, 'm'))
        .style('text-anchor', right ? 'end' : 'start')
        .attr('transform', 'translate(' + xtranslate + ',' +
            (y(elevation) - 10) + ')');
    hoverCallback.call(null, point, dist / xFactor, xUnits, elevation, yUnits);
  };


  profile.showPois = function(pois) {
    pois = goog.isDef(pois) ? pois : [];
    goog.asserts.assert(pois.length === 0 || goog.isDef(poiExtractor));

    var pe = poiExtractor;
    var g = svg.select('g');
    var profileData = svg.datum();
    var ps = g.select('.pois');

    var p = ps.selectAll('.poi').data(pois, function(d) {
      var i = bisectDistance(profileData, Math.round(pe.dist(d) * 10) / 10, 1);
      var point = profileData[i];
      if (point) {
        var z = elevationExtractor.z(point);
        pe.z(d, z);
      }
      return pe.id(d);
    });

    var poiEnterG = p.enter()
      .append('g')
      .attr('class', 'poi');

    poiEnterG.append('text')
      .attr('x', light ? 0 : 9)
      .attr('dy', '.35em')
      .attr('text-anchor', light ? 'middle' : 'start');

    poiEnterG.append('line')
      .style('shape-rendering', 'crispEdges');

    p.style('opacity', 0)
      .transition()
      .duration(1000)
      .delay(100)
      .style('opacity', 1);

    p.selectAll('text')
      .attr('transform', function(d) {
        if (light) {
          return ['translate(',
            x(pe.dist(d)), ',',
            y(pe.z(d)) - 10, ')'
          ].join('');
        } else {
          return ['translate(',
            x(pe.dist(d)), ',',
            y(pe.z(d)) - 20, ') rotate(', poiLabelAngle, ')'
          ].join('');
        }
      })
      .text(function(d) {
        return pe.sort(d) + (light ? '' : (' - ' + pe.title(d)));
      });

    p.selectAll('line')
       .style('stroke', 'grey')
       .attr('x1', function(d) {
         return x(pe.dist(d));
       })
       .attr('y1', function(d) {
         return y(y.domain()[0]);
       })
       .attr('x2', function(d) {
         return x(pe.dist(d));
       })
       .attr('y2', function(d) {
         return y(pe.z(d));
       });

    // remove unused pois
    p.exit().remove();
  };

  function clearPois() {
    profile.showPois([]);
  }


  return profile;
};
