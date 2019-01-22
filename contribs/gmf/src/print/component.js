import angular from 'angular';

import {DATALAYERGROUP_NAME} from 'gmf/index.js';

import gmfAuthenticationService from 'gmf/authentication/Service.js';

import gmfThemeThemes from 'gmf/theme/Themes.js';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr.js';
import ngeoMiscFeatureHelper, {getFilteredFeatureValues} from 'ngeo/misc/FeatureHelper.js';
import ngeoPrintService from 'ngeo/print/Service.js';
import ngeoPrintUtils from 'ngeo/print/Utils.js';
import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent.js';
import * as olEvents from 'ol/events.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerTile from 'ol/layer/Tile.js';
import olLayerGroup from 'ol/layer/Group.js';
import olMap from 'ol/Map.js';
import * as olMath from 'ol/math.js';

import 'bootstrap/js/src/dropdown.js';


/**
 * Fields that can come from a print v3 server and can be used in the partial
 * of the gmf print panel.
 * @typedef {Object} PrintLayoutInfo
 * @property {Array.<PrintSimpleAttributes>} [simpleAttributes] Custom print layoutInfo.
 * @property {number} [dpi] The selected 'dpi'.
 * @property {Array.<number>} [dpis] The list of 'dpis'.
 * @property {Object.<string, boolean>} [formats] The list of active 'formats' (png, pdf, ...).
 * @property {string} [layout] The selected 'layout'.
 * @property {Array.<string>} [layouts] The list of 'layouts'.
 * @property {boolean} [legend] The legend checkbox.
 * @property {number} [scale] The selected 'scale'.
 * @property {Array.<number>} [scales] The list of 'scales'
 */


/**
 * Object that can be used to generate a form field.
 * @typedef {Object}
 * @protected default {string|boolean|number|undefined} Default value of the form field.
 * @protected name {string} Name of the form field.
 * @protected type {string} Type of the field. Can be `String`, `Boolean` or `Number`.
 */


/**
 * @typedef {Object} DataSourceTableObject
 * @property {Array.<string>} columns
 * @property {Array.<Array.<string|number|boolean>>} data
 */


/**
 * @typedef {Object} DataSourcePrintReportObject
 * @property {string} title
 * @property {DataSourceTableObject} table
 */


/**
 * @type {!angular.IModule}
 */
const module = angular.module('gmfPrintComponent', [
  gmfAuthenticationService.name,
  gmfThemeThemes.name,
  ngeoMapLayerHelper.name,
  ngeoMapFeatureOverlayMgr.name,
  ngeoMiscFeatureHelper.name,
  ngeoPrintService.name,
  ngeoPrintUtils.name,
  ngeoQueryMapQuerent.name,
]);


module.value('gmfPrintTemplateUrl',
  /**
   * @param {JQLite} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @return {string} Template.
   */
  (element, attrs) => {
    const templateUrl = attrs['gmfPrintTemplateurl'];
    return templateUrl !== undefined ? templateUrl :
      'gmf/print';
  });

module.run(/* @ngInject */ ($templateCache) => {
  // @ts-ignore: webpack
  $templateCache.put('gmf/print', require('./component.html'));
});


/**
 * @enum {string}
 * @export
 */
const PrintStateEnum = {

  /**
   * @type {string}
   * @export
   */
  NOT_IN_USE: 'notInUse',

  /**
   * @type {string}
   * @export
   */
  PRINTING: 'printing',

  /**
   * @type {string}
   * @export
   */
  ERROR_ON_REPORT: 'errorOnReport',

  /**
   * @type {string}
   * @export
   */
  CAPABILITIES_NOT_LOADED: 'capabilitiesNotLoaded',

  /**
   * @type {string}
   * @export
   */
  ERROR_ON_GETCAPABILITIES: 'errorOnGetCapabilities'
};


module.value('gmfPrintState', {
  'state': PrintStateEnum.CAPABILITIES_NOT_LOADED
});


/**
 * @param {!JQLite} $element Element.
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!function(!JQLite, !angular.IAttributes): string} gmfPrintTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function gmfPrintTemplateUrl($element, $attrs, gmfPrintTemplateUrl) {
  return gmfPrintTemplateUrl($element, $attrs);
}


/**
 * Provide a component that display a print panel. This panel is populated with
 * a form corresponding to the capabilities delivered by a GMF print v3 server.
 * If you want to use another template for your print panel, you can see the
 * available layout information in the 'PrintLayoutInfo' classes.
 *
 * Simple example:
 *
 *      <gmf-print
 *        gmf-print-map="::mainCtrl.map"
 *        gmf-print-active="printActive"
 *        gmf-print-rotatemask="::true">
 *      </gmf-print>
 *
 * Example with user defined attribute:
 *
 *      <gmf-print
 *        gmf-print-map="::mainCtrl.map"
 *        gmf-print-active="printActive"
 *        gmf-print-rotatemask="::true"
 *        gmf-print-hiddenattributes="::['name']"
 *        gmf-print-attributes-out="::attributes">
 *        <div ng-repeat="attribute in ::attributes">
 *          <div ng-if="attribute.name == 'name'">
 *            <input ng-model="attribute.value" placeholder="name" />
 *          </div>
 *        </div>
 *      </gmf-print>
 *
 * Note: The 'print' and 'cancel' functions can also be called via globals
 * events 'gmfStartPrint' and 'gmfCancelPrint'.
 *
 * @htmlAttribute {import("ol/Map.js").default} gmf-print-map The map.
 * @htmlAttribute {boolean} gmf-print-active A boolean that informs if the
 *     panel is open or not.
 * @htmlAttribute {boolean} gmf-print-rotatemask Optional. True to apply
 *     rotation on the mask instead of the map. By default, the map rotates.
 * @htmlAttribute {Object.<string, string|number|boolean>}
 *     gmf-print-fieldvalues optional. Key, value object to define default
 *     value in each of your print panel field. The key refers to the
 *     property's name of the field.
 *     Example: {'comments': 'demo', 'legend': false}. Doesn't work for the dpi
 *     and the scale. Server's values are used in priority.
 * @htmlAttribute {Array.<string>} gmf-print-hiddenattributes The list of attributes that should be hidden.
 * @ngdoc component
 * @ngname gmfPrint
 */
const component = {
  bindings: {
    'map': '<gmfPrintMap',
    'active': '=gmfPrintActive',
    'rotateMask': '<?gmfPrintRotatemask',
    'fieldValues': '<?gmfPrintFieldvalues',
    'hiddenAttributeNames': '<?gmfPrintHiddenattributes',
    'attributesOut': '=?gmfPrintAttributesOut'
  },
  controller: 'GmfPrintController',
  templateUrl: gmfPrintTemplateUrl,
  transclude: true
};


module.component('gmfPrint', component);


/**
 * @typedef {Object} OptionsLegendType
 * @property {boolean} [useBbox]
 * @property {Object.<string, boolean>} label
 * @property {Object.<string, Object.<string, string>>} params
 */


/**
 * @typedef {Object} OptionsType
 * @property {boolean} [scaleInput]
 * @property {OptionsLegendType} [legend]
 */


/**
 * @private
 */
class Controller {

  /**
   * @param {JQLite} $element Element.
   * @param {angular.IScope} $rootScope Angular root scope.
   * @param {angular.IScope} $scope Angular scope.
   * @param {angular.ITimeoutService} $timeout Angular timeout service.
   * @param {angular.IQService} $q The Angular $q service.
   * @param {angular.auto.IInjectorService} $injector Main injector.
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import("ngeo/map/LayerHelper.js").default} ngeoLayerHelper The ngeo Layer Helper service.
   * @param {import("ngeo/map/FeatureOverlayMgr.js").default} ngeoFeatureOverlayMgr Ngeo Feature Overlay
   *     Manager service.
   * @param {import("ngeo/print/Utils.js").default} ngeoPrintUtils The ngeo PrintUtils service.
   * @param {CreatePrint} ngeoCreatePrint The ngeo Create Print function.
   * @param {string} gmfPrintUrl A MapFishPrint url.
   * @param {import("gmf/authentication/Service.js").default} gmfAuthenticationService The authentication service.
   * @param {QueryResult} ngeoQueryResult ngeo query result.
   * @param {angular.IFilterService} $filter Angular $filter service.
   * @param {import("gmf/print/component.js").default.PrintStateEnum} gmfPrintState GMF print state.
   * @param {import("gmf/theme/Themes.js").default} gmfThemes The gmf Themes service.
   * @private
   * @ngInject
   * @ngdoc controller
   * @ngname GmfPrintController
   */
  constructor($element, $rootScope, $scope, $timeout, $q, $injector,
    gettextCatalog, ngeoLayerHelper, ngeoFeatureOverlayMgr, ngeoPrintUtils,
    ngeoCreatePrint, gmfPrintUrl, gmfAuthenticationService, ngeoQueryResult,
    $filter, gmfPrintState, gmfThemes) {

    /**
     * @type {import("gmf/print/component.js").default.PrintStateEnum}
     * @private
     */
    this.gmfPrintState_ = gmfPrintState;

    /**
     * @type {function(string): string}
     * @private
     */
    this.translate_ = $filter('translate');

    /**
     * @type {import("ol/Map.js").default}
     * @export
     */
    this.map;

    /**
     * @type {boolean}
     * @export
     */
    this.active;

    /**
     * @type {boolean}
     * @export
     */
    this.rotateMask = false;

    /**
     * @type {Object.<string, string|number|boolean>!}
     * @export
     */
    this.fieldValues = {};

    /**
     * @type {Array.<string>}
     * @export
     */
    this.attributesOut;

    /**
     * @type {angular.IScope}
     * @private
     */
    this.$rootScope_ = $rootScope;

    /**
     * @type {angular.IScope}
     * @private
     */
    this.$scope_ = $scope;

    /**
     * @type {angular.ITimeoutService}
     * @private
     */
    this.$timeout_ = $timeout;

    /**
     * @type {angular.IQService}
     * @private
     */
    this.$q_ = $q;

    /**
     * @type {angular.gettext.gettextCatalog}
     * @private
     */
    this.gettextCatalog_ = gettextCatalog;

    /**
     * @type {import("ngeo/map/LayerHelper.js").default}
     * @private
     */
    this.ngeoLayerHelper_ = ngeoLayerHelper;

    /**
     * @type {import("ol/layer/Vector.js").default}
     * @private
     */
    this.featureOverlayLayer_ = ngeoFeatureOverlayMgr.getLayer();

    /**
     * @type {import("ngeo/print/Utils.js").default}
     * @private
     */
    this.ngeoPrintUtils_ = ngeoPrintUtils;

    /**
     * @type {import("ngeo/print/Service.js").default}
     * @private
     */
    this.ngeoPrint_ = ngeoCreatePrint(gmfPrintUrl);

    /**
     * @type {QueryResult}
     * @private
     */
    this.ngeoQueryResult_ = ngeoQueryResult;

    /**
     * @type {import("gmf/authentication/Service.js").default}
     * @private
     */
    this.gmfAuthenticationService_ = gmfAuthenticationService;

    /**
     * @type {import("gmf/theme/Themes.js").default}
     * @private
     */
    this.gmfThemes_ = gmfThemes;

    this.cacheVersion_ = '0';
    if ($injector.has('cacheVersion')) {
      this.cacheVersion_ = $injector.get('cacheVersion');
    }

    /**
     * @type {boolean}
     * @export
     */
    this.scaleInput = false;

    /**
     * @type {OptionsLegendType}
     * @private
     */
    this.gmfLegendOptions_ = {
      useBbox: true,
      label: {},
      params: {},
    };

    if ($injector.has('gmfPrintOptions')) {
      /**
       * @type {OptionsType}
       */
      const options = $injector.get('gmfPrintOptions');
      if (options.scaleInput) {
        this.scaleInput = options.scaleInput;
      }
      if (options.legend) {
        Object.assign(this.gmfLegendOptions_, options.legend);
      }
    }

    /**
     * @type {?angular.IDeferred}
     * @private
     */
    this.requestCanceler_ = null;

    /**
     * @type {?angular.IPromise}
     * @private
     */
    this.statusTimeoutPromise_ = null;

    /**
     * @type {Array.<number>|null}
     * @private
     */
    this.onDragPreviousMousePosition_ = null;

    /**
     * @type {?angular.IPromise|null}
     * @private
     */
    this.rotationTimeoutPromise_ = null;

    /**
     * @type {import("ol/events.js").EventsKey}
     * @private
     */
    this.postComposeListenerKey_;

    /**
     * @type {import("ol/events.js").EventsKey}
     * @private
     */
    this.pointerDragListenerKey_;

    /**
     * @type {import("ol/events.js").EventsKey}
     * @private
     */
    this.mapViewResolutionChangeKey_;

    /**
     * Current report reference id.
     * @type {string}
     * @private
     */
    this.curRef_ = '';

    /**
     * Formats availables in capabilities.
     * @type {Array.<string>}
     * @private
     */
    this.formats_ = [];

    /**
     * An array of attributes objects from capabilities.
     * @type {Array.<Object>}
     * @private
     */
    this.layouts_ = [];

    /**
     * An attributes object from capabilities.
     * @type {Object}
     * @private
     */
    this.layout_ = {};

    /**
     * @type {Array.<number>}
     * @private
     */
    this.paperSize_ = [];

    /**
     * @type {PrintLayoutInfo}
     * @export
     */
    this.layoutInfo = {};

    /**
     * @type {number}
     * @export
     */
    this.rotation = 0;

    /**
     * @type {Array.<string>}
     * @export
     */
    this.hiddenAttributeNames;

    /**
     * @type {boolean}
     * @private
     */
    this.scaleManuallySelected_ = false;

    /**
     * @type {JQLite}
     * @export
     */
    this.rotationInput_ = $element.find('.gmf-print-rotation-input');

    this.rotationInput_.on('input', (event) => {
      const rotation = $(event.target).val();
      if (rotation !== '') {
        this.setRotation(/** @type {number} */ (rotation));
      }
    });
    // Workaround for IE11
    this.rotationInput_.on('change', (event) => {
      const rotation = $(event.target).val();
      if (rotation !== '') {
        this.setRotation(/** @type {number} */ (rotation));
      }
    });

    /**
     * @type {function(import("ol/render/Event.js").default)}
     */
    this.postcomposeListener_;

    /**
     * @type {angular.IHttpPromise<Object>}
     * @private
     */
    this.capabilities_;

    /**
     * @type {gmfThemes.GmfOgcServers}
     * @private
     */
    this.ogcServers_;

    /**
     * @type {Array.<gmfThemes.GmfTheme>}
     * @private
     */
    this.currentThemes_;
  }


  /**
   * Init the controller
   */
  $onInit() {
    // Clear the capabilities if the roleId changes
    this.$scope_.$watch(() => this.gmfAuthenticationService_.getRoleId(), () => {
      this.gmfPrintState_.state = PrintStateEnum.CAPABILITIES_NOT_LOADED;
      this.capabilities_ = null;
    });

    this.$scope_.$watch(() => this.active, (active) => {
      this.togglePrintPanel_(active);
    });

    // Print on event.
    this.$rootScope_.$on('gmfStartPrint', (event, format) => {
      this.print(`${format}`);
    });

    // Cancel print task on event.
    this.$rootScope_.$on('gmfCancelPrint', () => {
      this.cancel();
    });

    this.gmfThemes_.getOgcServersObject().then((ogcServersObject) => {
      this.ogcServers_ = ogcServersObject;
    });

    this.gmfThemes_.getThemesObject().then((currentThemes) => {
      this.currentThemes_ = currentThemes;
    });

    /**
     * @return {import("ol/size.js").Size} Size in dots of the map to print.
     */
    const getSizeFn = () => this.paperSize_;

    let getRotationFn;
    if (this.rotateMask) {
      /**
       * @return {number} rotation to apply.
       */
      getRotationFn = () => this.rotation;
    }

    this.postcomposeListener_ = this.ngeoPrintUtils_.createPrintMaskPostcompose(
      getSizeFn, this.getScaleFn.bind(this), getRotationFn);
  }


  /**
   * @param {olx.FrameState} frameState Frame state.
   * @return {number} Scale of the map to print.
   */
  getScaleFn(frameState) {
    // Don't compute an optimal scale if the user manually choose a value not in
    // the pre-defined scales. (`scaleInput` in `gmfPrintOptions`).
    console.assert(this.layoutInfo.scales);
    console.assert(this.layoutInfo.scale !== undefined);
    if (!this.scaleManuallySelected_ &&
        (this.layoutInfo.scale === -1 || this.layoutInfo.scales.includes(this.layoutInfo.scale))) {
      const mapSize = frameState.size;
      const viewResolution = frameState.viewState.resolution;
      this.layoutInfo.scale = this.getOptimalScale_(mapSize, viewResolution);
    }
    return this.layoutInfo.scale;
  }


  /**
   * @param {boolean} active True to listen events related to the print and get
   *     capabilities. False to stop listen them and set rotation to 0.
   * @private
   */
  togglePrintPanel_(active) {
    if (active) {
      if (!this.capabilities_) {
        this.getCapabilities_();
      }
      this.capabilities_.then((resp) => {
        // make sure the panel is still open
        if (!this.active) {
          return;
        }
        this.gmfPrintState_.state = PrintStateEnum.NOT_IN_USE;
        // Get capabilities - On success
        this.parseCapabilities_(resp);
        this.postComposeListenerKey_ = olEvents.listen(this.map, 'postcompose', this.postcomposeListener_);
        this.pointerDragListenerKey_ = olEvents.listen(this.map, 'pointerdrag', this.onPointerDrag_, this);
        this.mapViewResolutionChangeKey_ = olEvents.listen(this.map.getView(), 'change:resolution', () => {
          this.scaleManuallySelected_ = false;
        });
        this.map.render();
      }, (resp) => {
        // Get capabilities - On error
        this.gmfPrintState_.state = PrintStateEnum.ERROR_ON_GETCAPABILITIES;
        this.capabilities_ = null;
      });
    } else {
      olEvents.unlistenByKey(this.postComposeListenerKey_);
      olEvents.unlistenByKey(this.pointerDragListenerKey_);
      olEvents.unlistenByKey(this.mapViewResolutionChangeKey_);
      this.setRotation(0);
      this.map.render(); // Redraw (remove) post compose mask;
    }
  }


  /**
   * Gets the print capabilities.
   * @param {number|null=} opt_roleId The role id.
   * @private
   */
  getCapabilities_(opt_roleId) {
    this.capabilities_ = this.ngeoPrint_.getCapabilities(
      /** @type {angular.IRequestShortcutConfig} */ ({
        withCredentials: true,
        params: opt_roleId ? {
          'role': opt_roleId,
          'cache_version': this.cacheVersion_
        } : {
          'cache_version': this.cacheVersion_
        }
      }));
  }


  /**
   * Create the list of layouts, get the formats, get the first layout in
   * gmf print v3 capabilities and then update the print panel layout information.
   * @param {!angular.IHttpResponse} resp Response.
   * @private
   */
  parseCapabilities_(resp) {
    const data = resp['data'];
    this.formats_ = data['formats'] || [];
    this.layouts_ = data['layouts'];
    this.layout_ = data['layouts'][0];

    this.layoutInfo.layouts = [];
    this.layouts_.forEach((layout) => {
      this.layoutInfo.layouts.push(layout.name);
    });

    this.updateFields_();
  }


  /**
   * Update layout information with the user values if there are always available in the
   * current layout otherwise use the defaults values of the layout.
   * If a field doesn't exist in the current layout, set it to undefined so the
   * view can hide it. Update also the paper size.
   * custom print templates).
   * @private
   */
  updateFields_() {
    this.layoutInfo.layout = this.layout_.name;

    const mapInfo = this.isAttributeInCurrentLayout_('map');
    console.assert(mapInfo);
    const clientInfo = mapInfo['clientInfo'];
    console.assert(clientInfo);
    this.paperSize_ = [clientInfo['width'], clientInfo['height']];

    this.updateCustomFields_();

    const legend = this.isAttributeInCurrentLayout_('legend');
    if (this.layoutInfo.legend === undefined) {
      this.layoutInfo.legend = !!(legend !== undefined ?
        legend : this.fieldValues['legend']);
    }

    this.layoutInfo.scales = clientInfo['scales'] || [];
    this.layoutInfo.dpis = clientInfo['dpiSuggestions'] || [];

    const mapSize = this.map.getSize();
    const viewResolution = this.map.getView().getResolution();
    this.layoutInfo.scale = this.getOptimalScale_(mapSize, viewResolution);

    this.layoutInfo.dpi =
        (this.layoutInfo.dpi && this.layoutInfo.dpis.indexOf(this.layoutInfo.dpi) > 0) ?
          this.layoutInfo.dpi : this.layoutInfo.dpis[0];

    this.layoutInfo.formats = {};
    this.formats_.forEach((format) => {
      this.layoutInfo.formats[format] = true;
    });

    this.attributesOut = this.layoutInfo['simpleAttributes'];

    // Force the update of the mask
    this.map.render();
  }


  /**
   * Update simple attributes information with Customfield to be able to generate a form
   * from a custom GMF print v3 configuration.
   * @private
   */
  updateCustomFields_() {
    let name, rawType, value, type;
    if (!this.layoutInfo.simpleAttributes) {
      this.layoutInfo.simpleAttributes = [];
    }
    const simpleAttributes = this.layoutInfo.simpleAttributes;
    const previousAttributes = simpleAttributes.splice(0, simpleAttributes.length);

    // The attributes without 'clientParams' are the custom layout information (defined by end user).
    this.layout_.attributes.forEach((attribute) => {
      if (!attribute['clientParams']) {
        name = `${attribute.name}`;
        const defaultValue = attribute.default;
        value = (defaultValue !== undefined && defaultValue !== '') ?
          defaultValue : this.fieldValues[name];

        // Try to use existing form field type
        rawType = `${attribute.type}`;
        switch (rawType) {
          case 'String':
            type = (name === 'comments') ? 'textarea' : 'text';
            break;
          case 'Boolean':
            type = 'checkbox';
            break;
          case 'Number':
            type = 'number';
            value = parseFloat(value);
            value = isNaN(value) ? 0 : value;
            break;
          default:
            type = rawType;
        }

        // If it exists use the value of previous same field.
        previousAttributes.forEach((c) => {
          if (c.name === name && c.type === type) {
            return value = c.value;
          }
        });

        this.layoutInfo.simpleAttributes.push(/** PrintSimpleAttributes */ ({
          name,
          type,
          value
        }));
      }
    });
  }


  /**
   * Return a capabilities 'attribute' object corresponding to the given name.
   * @param {string} name Name of the attribute to get.
   * @return {Object|null} corresponding attribute or null.
   * @private
   */
  isAttributeInCurrentLayout_(name) {
    let attr = null;
    this.layout_.attributes.forEach((attribute) => {
      if (attribute.name === name) {
        return attr = attribute;
      }
    });
    return attr;
  }


  /**
   * Set the current rotation value.
   * Updating the rotation will redraw the mask or rotate the map (depending on the configuration).
   * @param {number} rotation The optional new rotation value in degrees.
   */
  setRotation(rotation) {
    this.rotation = olMath.clamp(rotation, -180, 180);

    // sync all the inputs
    this.rotationInput_.val(this.rotation.toString());

    // Render the map to update the postcompose mask or rotate the map.
    if (this.rotateMask) {
      this.map.render();
    } else {
      this.map.getView().setRotation(olMath.toRadians(this.rotation));
    }
  }


  /**
   * Calculate the angle and the sense of rotation between two lines. One from the
   * center of the map and the point of the last call to this function and one
   * from the same center and the point of the current call.
   * @param {import("ol/MapBrowserPointerEvent.js").default} e An ol map browser pointer event.
   * @private
   */
  onPointerDrag_(e) {
    const originalEvent = e.originalEvent;
    const mapCenter = this.map.getView().getCenter();
    if (this.active && originalEvent.altKey && originalEvent.shiftKey && mapCenter) {
      const center = this.map.getPixelFromCoordinate(mapCenter);
      const pixel = e.pixel;
      // Reset previous position between two different sessions of drags events.
      if (this.rotationTimeoutPromise_ === null) {
        this.onDragPreviousMousePosition_ = null;
      } else {
        // Cancel the timeout to keep this session of drags event
        this.$timeout_.cancel(this.rotationTimeoutPromise_);
        // Calculate angle and sense of rotation.
        const p0x = this.onDragPreviousMousePosition_[0] - center[0];
        const p0y = this.onDragPreviousMousePosition_[1] - center[1];
        const p1x = pixel[0] - center[0];
        const p1y = pixel[1] - center[1];
        const centerToP0 = Math.sqrt(Math.pow(p0x, 2) + Math.pow(p0y, 2));
        const centerToP1 = Math.sqrt(Math.pow(p1x, 2) + Math.pow(p1y, 2));
        const sense = (p0x * p1y - p0y * p1x) > 0 ? 1 : -1;
        let angle = (p0x * p1x + p0y * p1y) / (centerToP0 * centerToP1);
        angle = angle <= 1 ? sense * Math.acos(angle) : 0;
        const boost = centerToP1 / 200;
        const increment = Math.round(olMath.toDegrees(angle) * boost);

        // Set rotation then update the view.
        this.setRotation(this.rotation + increment);
        this.$scope_.$digest();
      }
      // Prepare the removal of this session of drags events
      this.rotationTimeoutPromise_ = this.$timeout_(() => {
        this.rotationTimeoutPromise_ = null;
      }, 500);
      // Keep the current position for the next calculation.
      this.onDragPreviousMousePosition_ = pixel;
    }
  }


  /**
   * Create a print report based on the values of the 'layoutInfo' values.
   * @param {string} format An output format corresponding to one format in the
   *     capabilities document ('pdf', 'png', etc).
   * @export
   */
  print(format) {
    // Do not print if a print task is already processing.
    if (this.gmfPrintState_.state === PrintStateEnum.PRINTING) {
      return;
    }
    this.requestCanceler_ = this.$q_.defer();
    this.gmfPrintState_.state = PrintStateEnum.PRINTING;

    const mapSize = this.map.getSize();
    const viewResolution = this.map.getView().getResolution() || 0;
    const scale = this.layoutInfo.scale || this.getOptimalScale_(mapSize, viewResolution);
    const datasource = this.getDataSource_();

    const customAttributes = {
      'datasource': datasource
    };

    if (this.layoutInfo.simpleAttributes) {
      this.layoutInfo.simpleAttributes.forEach((field) => {
        customAttributes[field.name] = field.value;
      });
    }

    if (this.layoutInfo.legend) {
      const center = this.map.getView().getCenter();
      const deltaX = this.paperSize_[0] * scale / 2 / ngeoPrintUtils.INCHES_PER_METER_ / ngeoPrintUtils.DOTS_PER_INCH_;
      const deltaY = this.paperSize_[1] * scale / 2 / ngeoPrintUtils.INCHES_PER_METER_ / ngeoPrintUtils.DOTS_PER_INCH_;
      const bbox = [
        center[0] - deltaX,
        center[1] - deltaY,
        center[0] + deltaX,
        center[1] + deltaY,
      ];
      const legend = this.getLegend_(scale, this.layoutInfo.dpi, bbox);
      if (legend !== null) {
        customAttributes['legend'] = legend;
      }
    }

    console.assert(typeof this.layoutInfo.dpi == 'number');
    console.assert(typeof this.layoutInfo.layout == 'string');

    // convert the WMTS layers to WMS
    const map = new olMap({});
    map.setView(this.map.getView());
    const ol_layers = this.ngeoLayerHelper_.getFlatLayers(this.map.getLayerGroup());
    const new_ol_layers = [];
    let print_native_angle = true;
    for (let i = 0, ii = ol_layers.length; i < ii; i++) {
      let layer = ol_layers[i];
      const metadata = layer.get('metadata');
      if (metadata) {
        const server_name = metadata.ogcServer;
        const layer_names = metadata.printLayers || metadata.layers;
        if (server_name && layer_names) {
          const server = this.ogcServers_[server_name];
          if (server) {
            layer = this.ngeoLayerHelper_.createBasicWMSLayer(
              server.url,
              layer_names,
              server.imageType,
              server.type
            );
            layer.setZIndex(-200);
          } else {
            console.error('Missing ogcServer:', server_name);
          }
        }
      }

      // Get the print native angle parameter for WMS layers when set to not use default value
      // Is applied only once when the value is overridden with a metadata from administration
      if (layer instanceof olLayerImage && layer.get('printNativeAngle') === false) {
        print_native_angle = false;
      }

      new_ol_layers.push(layer);
    }
    map.setLayerGroup(new olLayerGroup({
      layers: new_ol_layers,
      'printNativeAngle': print_native_angle
    }));

    const spec = this.ngeoPrint_.createSpec(map, scale, this.layoutInfo.dpi,
      this.layoutInfo.layout, format, customAttributes);

    // Add feature overlay layer to print spec.
    const layers = [];
    this.ngeoPrint_.encodeLayer(layers, this.featureOverlayLayer_,
      viewResolution);
    if (layers.length > 0) {
      spec.attributes.map.layers.unshift(layers[0]);
    }

    this.ngeoPrint_.createReport(spec, /** @type {angular.IRequestShortcutConfig} */ ({
      timeout: this.requestCanceler_.promise
    })).then(
      this.handleCreateReportSuccess_.bind(this),
      this.handleCreateReportError_.bind(this)
    );

    // remove temporary map
    map.setTarget(null);
  }


  /**
   * Cancel the current print and reset its state.
   * @export
   */
  cancel() {
    // Cancel the latest request, if it's not finished yet.
    if (this.requestCanceler_ !== null) {
      this.requestCanceler_.resolve();
    }

    // Cancel the status timeout if there's one set, to make sure no other
    // status request is sent.
    if (this.statusTimeoutPromise_ !== null) {
      this.$timeout_.cancel(this.statusTimeoutPromise_);
    }

    if (this.curRef_.length > 0) {
      this.ngeoPrint_.cancel(this.curRef_);
    }

    this.resetPrintStates_();
  }


  /**
   * @param {import("gmf/print/component.js").default.PrintStateEnum=} opt_printState the print state.
   * @private
   */
  resetPrintStates_(opt_printState) {
    this.gmfPrintState_.state = opt_printState || PrintStateEnum.NOT_IN_USE;
    this.curRef_ = '';
  }


  /**
   * Get datasource object for print report
   * @private
   * @return {Array.<DataSourcePrintReportObject>} the data
   *     source object for the print report
   */
  getDataSource_() {
    let datasourceObj, data, columns;
    const datasourceArr = [];
    const sources = this.ngeoQueryResult_.sources;
    sources.forEach(function(source) {
      data = [];
      columns = [];
      source.features.forEach(function(feature, i) {
        console.assert(feature);
        const properties = getFilteredFeatureValues(feature);
        if (i === 0) {
          columns = Object.keys(properties).map(function tanslateColumns(prop) {
            return this.translate_(prop);
          }, this);
        }
        data.push(Object.keys(properties).map(key => properties[key]));
      }, this);
      if (columns.length) {
        datasourceObj =
          /** @type {DataSourcePrintReportObject} */({
            title: this.translate_(source.label),
            table: {
              columns,
              data
            }
          });
        datasourceArr.push(datasourceObj);
      }
    }, this);
    return datasourceArr;
  }


  /**
   * Get the optimal scale to display the print mask. Return the first scale if
   * no scale matches.
   * @param {import("ol/size.js").Size|undefined} mapSize Size of the map on the screen (px).
   * @param {number|undefined} viewResolution Resolution of the map on the screen.
   * @return {number} The best scale. -1 is returned if there is no optimal
   *     scale, that is the optimal scale is lower than or equal to the first
   *     value in printMapScales.
   * @private
   */
  getOptimalScale_(mapSize, viewResolution) {
    const scales = this.layoutInfo.scales.slice();
    if (mapSize !== undefined && viewResolution !== undefined) {
      return this.ngeoPrintUtils_.getOptimalScale(mapSize, viewResolution,
        this.paperSize_, scales.reverse());
    }
    return this.layoutInfo.scales[0];
  }


  /**
   * @param {!angular.IHttpResponse} resp Response.
   * @private
   */
  handleCreateReportSuccess_(resp) {
    const mfResp = /** @type {MapFishPrintReportResponse} */ (resp.data);
    const ref = mfResp.ref;
    console.assert(ref.length > 0);
    this.curRef_ = ref;
    this.getStatus_(ref);
  }


  /**
   * @param {string} ref Ref.
   * @private
   */
  getStatus_(ref) {
    this.requestCanceler_ = this.$q_.defer();
    this.ngeoPrint_.getStatus(ref, /** @type {angular.IRequestShortcutConfig} */ ({
      timeout: this.requestCanceler_.promise
    })).then(
      this.handleGetStatusSuccess_.bind(this, ref),
      this.handleCreateReportError_.bind(this)
    );
  }


  /**
   * @param {string} ref Ref.
   * @param {!angular.IHttpResponse} resp Response.
   * @private
   */
  handleGetStatusSuccess_(ref, resp) {
    const mfResp = /** @type {MapFishPrintStatusResponse} */ (resp.data);
    const done = mfResp.done;
    if (done) {
      if (mfResp.status != 'error') {
        // The report is ready. Open it by changing the window location.
        window.location.href = this.ngeoPrint_.getReportUrl(ref);
        this.resetPrintStates_();
      } else {
        console.error(mfResp.error);
        this.handleCreateReportError_();
      }
    } else {
      // The report is not ready yet. Check again in 1s.
      this.statusTimeoutPromise_ = this.$timeout_(() => {
        this.getStatus_(ref);
      }, 1000, false);
    }
  }


  /**
   * @private
   */
  handleCreateReportError_() {
    this.resetPrintStates_(PrintStateEnum.ERROR_ON_REPORT);
  }


  /**
   * @param {number} scale The scale to get the legend (for wms layers only).
   * @param {number} dpi The DPI.
   * @param {Array.number} bbox The bbox.
   * @return {Object?} Legend object for print report or null.
   * @private
   */
  getLegend_(scale, dpi, bbox) {
    const legend = {'classes': []};
    const gettextCatalog = this.gettextCatalog_;

    // Get layers from layertree only.
    const dataLayerGroup = this.ngeoLayerHelper_.getGroupFromMap(this.map, DATALAYERGROUP_NAME);
    const layers = this.ngeoLayerHelper_.getFlatLayers(dataLayerGroup);

    // For each visible layer in reverse order, get the legend url.
    layers.reverse().forEach((layer) => {
      const classes = [];
      if (layer.getVisible() && layer.getSource()) {
        // For WMTS layers.
        if (layer instanceof olLayerTile) {
          const layerName = `${layer.get('layerNodeName')}`;
          let icons = this.getMetadataLegendImage_(layerName);
          if (!icons) {
            icons = this.ngeoLayerHelper_.getWMTSLegendURL(layer);
          }
          // Don't add classes without legend url.
          if (icons) {
            classes.push({
              'name': gettextCatalog.getString(layerName),
              'icons': [icons]
            });
          }
        } else {
          const source = /** @type import("ol/source/ImageWMS.js").default */ (layer.getSource());
          // For each name in a WMS layer.
          const layerNames = source.getParams()['LAYERS'].split(',');
          layerNames.forEach((name) => {
            let icons = this.getMetadataLegendImage_(name);
            if (!icons) {
              icons = this.ngeoLayerHelper_.getWMSLegendURL(source.getUrl(), name,
                scale, undefined, undefined, undefined, source.serverType_, dpi,
                this.gmfLegendOptions_.useBbox ? bbox : undefined,
                this.map.getView().getProjection().getCode(),
                this.gmfLegendOptions_.params[layer.getSource().serverType_]
              );
            }
            // Don't add classes without legend url or from layers without any
            // active name.
            if (icons && name.length !== 0) {
              classes.push(Object.assign({
                'name': this.gmfLegendOptions_.label[layer.getSource().serverType_] === false ? '' :
                  gettextCatalog.getString(name),
                'icons': [icons]
              }, layer.getSource().serverType_ === 'qgis' ? {
                'dpi': dpi,
              } : {}));
            }
          });
        }
      }

      // Add classes object only if it contains something.
      if (classes.length > 0) {
        legend['classes'].push({'classes': classes});
      }

    });

    return legend['classes'].length > 0 ? legend : null;
  }


  /**
   * Return the metadata legendImage of a layer from the found corresponding node
   * or undefined.
   * @param {string} layerName a layer name.
   * @return {string|undefined} The legendImage or undefined.
   * @private
   */
  getMetadataLegendImage_(layerName) {
    const groupNode = gmfThemeThemes.findGroupByLayerNodeName(this.currentThemes_, layerName);
    let node;
    if (groupNode && groupNode.children) {
      node = gmfThemeThemes.findObjectByName(groupNode.children, layerName);
    }
    let legendImage;
    if (node && node.metadata) {
      legendImage = node.metadata.legendImage;
    }
    return legendImage;
  }


  /**
   * Set the current layout and update all layout information with this new layout parameters.
   * @param {string!} layoutName A layout name as existing in the list of
   *     existing layouts.
   * @export
   */
  setLayout(layoutName) {
    let layout;
    this.layouts_.forEach((l) => {
      if (l.name === layoutName) {
        layout = l;
        return true; // break;
      }
    });
    this.layout_ = layout;
    this.updateFields_();
  }


  /**
   * Get or set the print scale value and adapt the zoom to match with this new scale.
   * @param {number=} opt_scale A scale value as existing in the scales list field.
   * @return {number|undefined} New scale.
   * @export
   */
  getSetScale(opt_scale) {
    if (opt_scale !== undefined) {
      const mapSize = this.map.getSize() || [0, 0];
      this.layoutInfo.scale = opt_scale;
      const res = this.ngeoPrintUtils_.getOptimalResolution(mapSize, this.paperSize_, opt_scale);
      const contrainRes = this.map.getView().constrainResolution(res, 0, 1);
      this.map.getView().setResolution(contrainRes);
      // Render the map to update the postcompose mask manually
      this.map.render();
      this.scaleManuallySelected_ = true;
    }
    return this.layoutInfo.scale;
  }


  /**
   * Set the print dpi value.
   * @param {number} dpi A dpi value as existing in the dpis list field.
   * @export
   */
  setDpi(dpi) {
    this.layoutInfo.dpi = dpi;
  }


  /**
   * Check the current state of the print.
   * @param {string} stateEnumKey An enum key from import("gmf/print/component.js").default.PrintStateEnum.
   * @return {boolean} True if the given state matches with the current print
   *     state. False otherwise.
   * @export
   */
  isState(stateEnumKey) {
    return this.gmfPrintState_.state === PrintStateEnum[stateEnumKey];
  }
}

module.controller('GmfPrintController', Controller);


export default module;
