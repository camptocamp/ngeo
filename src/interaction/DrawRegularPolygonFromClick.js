import ngeoCustomEvent from 'ngeo/CustomEvent.js';
import {inherits as olUtilInherits} from 'ol/util.js';
import * as olEvents from 'ol/events.js';
import olFeature from 'ol/Feature.js';
import {TRUE} from 'ol/functions.js';
import olGeomCircle from 'ol/geom/Circle.js';
import olGeomPolygon from 'ol/geom/Polygon.js';
import olInteractionInteraction from 'ol/interaction/Interaction.js';


/**
 * DrawRegularPolygonFromClick Interaction.
 *
 * @typedef {Object} DrawRegularPolygonFromClickOptions
 * @property {number} [angle=0] Angle in radians. A value of 0 will have one of the shape's point facing up
 * @property {number} radius Radius size in map units.
 * @property {number} [sides=3] The number of sides for the regular polygon.
 */


/**
 * @classdesc
 * This interactions allows drawing regular polygons of a pre-determined number
 * of sides and size a a clicked location on the map.
 *
 * @constructor
 * @fires DrawEvent
 * @extends {import("ol/interaction/Interaction.js").default}
 * @param {DrawRegularPolygonFromClickOptions} options Options
 */
function DrawRegularPolygonFromClick(options) {

  /**
   * @type {number}
   * @private
   */
  this.angle_ = options.angle !== undefined ? options.angle : 0;

  /**
   * @type {number}
   * @private
   */
  this.radius_ = options.radius;

  /**
   * @type {number}
   * @private
   */
  this.sides_ = options.sides !== undefined ? options.sides : 3;

  /**
   * @type {!Array.<import("ol/events.js").EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  olInteractionInteraction.call(this, {
    handleEvent: TRUE
  });

}

olUtilInherits(DrawRegularPolygonFromClick, olInteractionInteraction);


/**
 * Activate or deactivate the interaction.
 * @param {boolean} active Active.
 * @override
 */
DrawRegularPolygonFromClick.prototype.setActive = function(active) {
  olInteractionInteraction.prototype.setActive.call(this, active);

  if (this.getMap()) {
    if (active) {
      this.enable_();
    } else {
      this.disable_();
    }
  }
};


/**
 * @inheritDoc
 */
DrawRegularPolygonFromClick.prototype.setMap = function(map) {

  const active = this.getActive();

  const currentMap = this.getMap();
  if (currentMap && active) {
    this.disable_();
  }

  olInteractionInteraction.prototype.setMap.call(this, map);

  if (map && active) {
    this.enable_();
  }

};


/**
 * Enable the interaction. Called when added to a map AND active.
 * @private
 */
DrawRegularPolygonFromClick.prototype.enable_ = function() {
  const map = this.getMap();
  console.assert(map, 'Map should be set.');
  this.listenerKeys_.push(
    olEvents.listen(map, 'click', this.handleMapClick_, this)
  );
};


/**
 * Disable the interaction. Called when removed from a map or deactivated.
 * @private
 */
DrawRegularPolygonFromClick.prototype.disable_ = function() {
  const map = this.getMap();
  console.assert(map, 'Map should be set.');
  this.listenerKeys_.forEach(olEvents.unlistenByKey);
  this.listenerKeys_.length = 0;
};


/**
 * Called the the map is clicked. Create a regular polygon at the clicked
 * location using the configuration
 * @param {import("ol/MapBrowserEvent.js").default} evt Map browser event.
 * @private
 */
DrawRegularPolygonFromClick.prototype.handleMapClick_ = function(evt) {
  const center = evt.coordinate;
  const geometry = olGeomPolygon.fromCircle(
    new olGeomCircle(center), this.sides_
  );

  olGeomPolygon.makeRegular(geometry, center, this.radius_, this.angle_);

  /** @type {DrawEvent} */
  const event = new ngeoCustomEvent('drawend', {feature: new olFeature(geometry)});
  this.dispatchEvent(event);
};


export default DrawRegularPolygonFromClick;
