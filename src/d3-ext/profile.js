/**
 * @fileoverview Provides a D3js component to be used to draw an elevation
 * profile chart.
 *
 * Example usage:
 *
 * var selection = d3.select('#element_id');
 * var profile = ngeo.profile().onHover(function(point) {
 *   console.log(point.x, point.y);
 * }).onOut(function() {console.log("out");});
 * selection.datum(data).call(profile);
 *
 *
 * The selection data to be used should look like the following:
 *
 * [
 *     {
 *         "y": 199340,
 *         "values": {"mnt": 788.7},
 *         "dist": 0.0,
 *         "x": 541620
 *     }, ...
 * ]
 *
 */
goog.provide('ngeo.profile');


/**
 *
 * @return {Object}
 * @param {ngeox.profile.ProfileOptions} options
 * @export
 *
 */
ngeo.profile = function(options) {


  /**
   * The values for margins around the chart defined in pixels.
   */
  var margin = {top: 10, right: 10, bottom: 30, left: 40};

  /**
   * Method to get the coordinate in pixels from a distance.
   */
  var bisectDistance = d3.bisector(function(d) {
    return extractor.dist(d);
  }).left;

  /**
   * Distance units. Either 'm' or 'km'.
   */
  var units;

  /**
   * Factor to determine whether to use 'm' or 'km'.
   */
  var xFactor;

  /**
   * @type {function(Object)}
   * Hover callback function.
   */
  var hoverCallback = goog.isDef(options.hoverCallback) ?
      options.hoverCallback : goog.nullFunction;

  /**
   * @type {function()}
   * Out callback function.
   */
  var outCallback = goog.isDef(options.outCallback) ?
      options.outCallback : goog.nullFunction;

  /**
   * The color to be used for filling the area.
   * Can be overriden using the '.area' CSS selector.
   * @type {string}
   */
  var fill_color = 'rgba(222, 222, 222, 0.5)';

  /**
   * The color to be used the line stroke.
   * Can be overriden using the '.line' CSS selector.
   * @type {string}
   */
  var stroke_color = '#F00';

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
   * Extractor used to ge the dist and elevation from data.
   */
  var extractor = options.extractor;


  var profile = function(selection) {
    selection.each(function(data) {

      var width = this.clientWidth - margin.right - margin.left;
      x = d3.scale.linear().range([0, width]);

      var height = this.clientHeight - margin.top - margin.bottom;
      y = d3.scale.linear().range([height, 0]);

      var xAxis = d3.svg.axis().scale(x).orient('bottom');
      var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left');

      var area = d3.svg.area()
          .x(function(d) { return x(extractor.dist(d)); })
          .y0(height)
          .y1(function(d) { return y(extractor.z(d)); });
      var line = d3.svg.line()
          .x(function(d) { return x(extractor.dist(d)); })
          .y(function(d) { return y(extractor.z(d)); });

      // Select the svg element, if it exists.
      svg = d3.select(this).selectAll('svg').data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append('svg').append('g');
      gEnter.style('font', '11px Arial');
      gEnter.append('path').attr('class', 'area')
          .style('fill', fill_color);
      gEnter.append('path').attr('class', 'line')
          .style('stroke', stroke_color)
          .style('fill', 'none');

      gEnter.insert('g', ':first-child')
          .attr('class', 'grid-y');

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
      svg
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom);

      // Update the inner dimensions.
      var g = svg.select('g')
          .attr('transform', 'translate(' + margin.left + ',' +
              margin.top + ')');

      var xDomain = d3.extent(data, function(d) { return extractor.dist(d); });
      x.domain(xDomain);

      var yDomain = [d3.min(data, function(d) { return extractor.z(d); }),
            d3.max(data, function(d) { return extractor.z(d); })];

      var padding = (yDomain[1] - yDomain[0]) * 0.1;
      y.domain([yDomain[0] - padding, yDomain[1] + padding]);

      // Update the area path.
      g.select('.area')
          .transition()
          .attr('d', area);
      g.select('.line')
          .transition()
          .attr('d', line);

      if (xDomain[1] > 2000) {
        xFactor = 1000;
        units = 'km';
      } else {
        xFactor = 1;
        units = 'm';
      }

      xAxis.tickFormat(function(d) {
        return d / xFactor;
      });

      g.select('.x.axis')
          .transition()
          .call(xAxis);

      g.select('.x.label')
          .text('distance (' + units + ')')
          .style('fill', 'grey')
          .style('shape-rendering', 'crispEdges');

      g.select('.y.axis')
          .transition()
          .call(yAxis);

      g.select('.grid-y')
          .transition()
          .call(yAxis.tickSize(-width, 0, 0).tickFormat(''))
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
        var i = bisectDistance(data, x0, 1);

        var point = data[i];
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

        var right = x0 > xDomain[1] / 2;
        var xtranslate = x(dist);
        xtranslate += right ? -10 : 10;

        g.select('.x.grid-hover text')
            .text(parseFloat(dist.toPrecision(3) / xFactor) + ' ' + units)
            .style('text-anchor', right ? 'end' : 'start')
            .attr('transform', 'translate(' + xtranslate + ',' +
                (height - 10) + ')');

        g.select('.y.grid-hover text')
            .text(Math.round(elevation) + ' m')
            .style('text-anchor', right ? 'end' : 'start')
            .attr('transform', 'translate(' + xtranslate + ',' +
                (y(elevation) - 10) + ')');
        hoverCallback.call(null, point);
      }

      function mouseout() {
        g.selectAll('.grid-hover')
            .style('display', 'none');
        outCallback.call(null);
      }
    });
  };

  return profile;
};
