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

import angular from 'angular';

import gmfAuthenticationService from 'gmf/authentication/Service.js';

import gmfThemeThemes from 'gmf/theme/Themes.js';
import LegendMapFishPrintV3 from 'gmf/print/LegendMapFishPrintV3.js';
import MaskLayer from 'ngeo/print/Mask.js';
import ngeoMapLayerHelper from 'ngeo/map/LayerHelper.js';
import ngeoMapFeatureOverlayMgr from 'ngeo/map/FeatureOverlayMgr.js';
import ngeoMiscFeatureHelper, {getFilteredFeatureValues} from 'ngeo/misc/FeatureHelper.js';
import ngeoPrintService from 'ngeo/print/Service.js';
import ngeoPrintUtils, {INCHES_PER_METER, DOTS_PER_INCH} from 'ngeo/print/Utils.js';
import ngeoQueryMapQuerent from 'ngeo/query/MapQuerent.js';
import {listen, unlistenByKey} from 'ol/events.js';
import olLayerImage from 'ol/layer/Image.js';
import olLayerGroup from 'ol/layer/Group.js';
import olMap from 'ol/Map.js';
import {toDegrees, toRadians, clamp} from 'ol/math.js';
import MapBrowserEvent from 'ol/MapBrowserEvent.js';
import 'bootstrap/js/src/dropdown.js';

/**
 * Fields that can come from a print v3 server and can be used in the partial
 * of the gmf print panel.
 * @typedef {Object} PrintLayoutInfo
 * @property {import('ngeo/print/mapfish-print-v3').MapFishPrintCapabilitiesLayoutAttribute[]} [simpleAttributes]
 *    Custom print layoutInfo.
 * @property {string[]} [attributes] The list of all the attributes name.
 * @property {number} [dpi] The selected 'dpi'.
 * @property {number[]} [dpis] The list of 'dpis'.
 * @property {Object<string, boolean>} [formats] The list of active 'formats' (png, pdf, ...).
 * @property {string} [layout] The selected 'layout'.
 * @property {string[]} [layouts] The list of 'layouts'.
 * @property {boolean} [legend] The legend checkbox.
 * @property {number} [scale] The selected 'scale'.
 * @property {number[]} [scales] The list of 'scales'
 */

/**
 * @type {angular.IModule}
 * @hidden
 */
const myModule = angular.module('gmfPrintComponent', [
  gmfAuthenticationService.name,
  gmfThemeThemes.name,
  ngeoMapLayerHelper.name,
  ngeoMapFeatureOverlayMgr.name,
  ngeoMiscFeatureHelper.name,
  ngeoPrintService.name,
  ngeoPrintUtils.name,
  ngeoQueryMapQuerent.name,
]);

myModule.value(
  'gmfPrintTemplateUrl',
  /**
   * @param {JQuery} element Element.
   * @param {angular.IAttributes} attrs Attributes.
   * @return {string} Template.
   */
  (element, attrs) => {
    const templateUrl = attrs.gmfPrintTemplateurl;
    return templateUrl !== undefined ? templateUrl : 'gmf/print';
  }
);

myModule.run(
  /**
   * @ngInject
   * @param {angular.ITemplateCacheService} $templateCache
   */
  ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('gmf/print', require('./component.html'));
  }
);

/**
 * @enum {string}
 * @hidden
 */
const PrintStateEnum = {
  /**
   * @type {string}
   */
  NOT_IN_USE: 'notInUse',

  /**
   * @type {string}
   */
  PRINTING: 'printing',

  /**
   * @type {string}
   */
  ERROR_ON_REPORT: 'errorOnReport',

  /**
   * @type {string}
   */
  CAPABILITIES_NOT_LOADED: 'capabilitiesNotLoaded',

  /**
   * @type {string}
   */
  ERROR_ON_GETCAPABILITIES: 'errorOnGetCapabilities',
};

/**
 * @typedef {Object} PrintState
 * @property {PrintStateEnum} state
 */

myModule.value('gmfPrintState', {
  state: PrintStateEnum.CAPABILITIES_NOT_LOADED,
});

/**
 * @param {JQuery} $element Element.
 * @param {angular.IAttributes} $attrs Attributes.
 * @param {function(JQuery, angular.IAttributes): string} gmfPrintTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
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
 *        gmf-print-active="printActive">
 *      </gmf-print>
 *
 * Example with user defined attribute:
 *
 *      <gmf-print
 *        gmf-print-map="::mainCtrl.map"
 *        gmf-print-active="printActive"
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
 * Used metadata:
 *
 *  * hiDPILegendImages: The URLs to the hi DPI images used as a legend in the layer tree. For WMS and
 *      WMTS layers.
 *  * printNativeAngle: Whether the print should rotate the symbols. For layer groups (only).
 *
 * @htmlAttribute {import("ol/Map.js").default} gmf-print-map The map.
 * @htmlAttribute {boolean} gmf-print-active A boolean that informs if the
 *     panel is open or not.
 * @ngdoc component
 * @ngname gmfPrint
 */
const printComponent = {
  bindings: {
    'map': '<gmfPrintMap',
    'active': '=gmfPrintActive',
    'attributesOut': '=?gmfPrintAttributesOut',
  },
  controller: 'GmfPrintController',
  templateUrl: gmfPrintTemplateUrl,
  transclude: true,
};

myModule.component('gmfPrint', printComponent);

/**
 * @private
 * @hidden
 */
export class PrintController {
  /**
   * @param {JQuery} $element Element.
   * @param {angular.IScope} $rootScope Angular root scope.
   * @param {angular.IScope} $scope Angular scope.
   * @param {angular.ITimeoutService} $timeout Angular timeout service.
   * @param {angular.IQService} $q The Angular $q service.
   * @param {angular.gettext.gettextCatalog} gettextCatalog Gettext catalog.
   * @param {import("ngeo/map/LayerHelper.js").LayerHelper} ngeoLayerHelper The ngeo Layer Helper service.
   * @param {import("ngeo/map/FeatureOverlayMgr.js").FeatureOverlayMgr} ngeoFeatureOverlayMgr Ngeo Feature
   *    Overlay Manager service.
   * @param {import("ngeo/print/Utils.js").PrintUtils} ngeoPrintUtils The ngeo PrintUtils service.
   * @param {import("ngeo/print/Service.js").CreatePrint} ngeoCreatePrint The ngeo Create Print function.
   * @param {string} gmfPrintUrl The MapFishPrint URL.
   * @param {import("gmf/authentication/Service.js").AuthenticationService} gmfAuthenticationService
   *    The authentication service.
   * @param {import('ngeo/query/MapQuerent.js').QueryResult} ngeoQueryResult ngeo query result.
   * @param {angular.IFilterService} $filter Angular $filter service.
   * @param {PrintState} gmfPrintState GMF print state.
   * @param {import("gmf/theme/Themes.js").ThemesService} gmfThemes The gmf Themes service.
   * @param {import("gmf/datasource/ExternalDataSourcesManager.js").ExternalDatSourcesManager} gmfExternalDataSourcesManager The manager of external datasources.
   * @param {import('gmf/options.js').gmfPrintOptions} gmfPrintOptions The options.
   * @param {string} cacheVersion The cache version
   * @ngInject
   * @ngdoc controller
   * @ngname GmfPrintController
   */
  constructor(
    $element,
    $rootScope,
    $scope,
    $timeout,
    $q,
    gettextCatalog,
    ngeoLayerHelper,
    ngeoFeatureOverlayMgr,
    ngeoPrintUtils,
    ngeoCreatePrint,
    gmfPrintUrl,
    gmfAuthenticationService,
    ngeoQueryResult,
    $filter,
    gmfPrintState,
    gmfThemes,
    gmfExternalDataSourcesManager,
    gmfPrintOptions,
    cacheVersion
  ) {
    this.options = gmfPrintOptions;

    /**
     * @type {PrintState}
     * @private
     */
    this.gmfPrintState_ = gmfPrintState;

    /**
     * @type {function(string): string}
     * @private
     */
    this.translate_ = $filter('translate');

    /**
     * @type {?import("ol/Map.js").default}
     */
    this.map = null;

    /**
     * @private
     */
    this.maskLayer_ = new MaskLayer();

    /**
     * @type {boolean}
     */
    this.active = false;

    /**
     * @type {import('ngeo/print/mapfish-print-v3').MapFishPrintCapabilitiesLayoutAttribute[]}
     */
    this.attributesOut = [];

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
     * @type {import("ngeo/map/LayerHelper.js").LayerHelper}
     * @private
     */
    this.ngeoLayerHelper_ = ngeoLayerHelper;

    /**
     * @type {import("ol/layer/Vector.js").default}
     * @private
     */
    this.featureOverlayLayer_ = ngeoFeatureOverlayMgr.getLayer();

    /**
     * @type {import("ngeo/print/Utils.js").PrintUtils}
     * @private
     */
    this.ngeoPrintUtils_ = ngeoPrintUtils;

    /**
     * @type {import("ngeo/print/Service.js").PrintService}
     * @private
     */
    this.ngeoPrint_ = ngeoCreatePrint(gmfPrintUrl);

    /**
     * @type {import('ngeo/query/MapQuerent.js').QueryResult}
     * @private
     */
    this.ngeoQueryResult_ = ngeoQueryResult;

    /**
     * @type {import("gmf/authentication/Service.js").AuthenticationService}
     * @private
     */
    this.gmfAuthenticationService_ = gmfAuthenticationService;

    /**
     * @type {import("gmf/theme/Themes.js").ThemesService}
     * @private
     */
    this.gmfThemes_ = gmfThemes;

    /**
     * @type {import("gmf/datasource/ExternalDataSourcesManager.js").ExternalDatSourcesManager}
     * @private
     */
    this.gmfExternalDataSourcesManager_ = gmfExternalDataSourcesManager;

    /**
     * @type {?import("gmf/print/LegendMapFishPrintV3").default}
     */
    this.legendMapFishPrintV3_ = null;

    this.cacheVersion_ = cacheVersion;

    /**
     * @type {?angular.IDeferred<never>}
     * @private
     */
    this.requestCanceler_ = null;

    /**
     * @type {?angular.IPromise<void>}
     * @private
     */
    this.statusTimeoutPromise_ = null;

    /**
     * @type {?number[]}
     * @private
     */
    this.onDragPreviousMousePosition_ = null;

    /**
     * @type {?angular.IPromise<void>}
     * @private
     */
    this.rotationTimeoutPromise_ = null;

    /**
     * @type {?import("ol/events.js").EventsKey}
     * @private
     */
    this.pointerDragListenerKey_ = null;

    /**
     * @type {?import("ol/events.js").EventsKey}
     * @private
     */
    this.mapViewResolutionChangeKey_ = null;

    /**
     * Current report reference id.
     * @type {string}
     * @private
     */
    this.curRef_ = '';

    /**
     * Formats availables in capabilities.
     * @type {string[]}
     * @private
     */
    this.formats_ = [];

    /**
     * An array of attributes objects from capabilities.
     * @type {import('ngeo/print/mapfish-print-v3').MapFishPrintCapabilitiesLayout[]}
     * @private
     */
    this.layouts_ = [];

    /**
     * An attributes object from capabilities.
     * @type {?import('ngeo/print/mapfish-print-v3').MapFishPrintCapabilitiesLayout}
     * @private
     */
    this.layout_ = null;

    /**
     * @type {import("ol/size.js").Size}
     * @private
     */
    this.paperSize_ = null;

    /**
     * @type {PrintLayoutInfo}
     */
    this.layoutInfo = {};

    /**
     * @type {number}
     */
    this.rotation = 0;

    /**
     * The email of the user to which send the file. Obtained from the
     * authentication service.
     * @type {?string}
     */
    this.smtpEmail = null;

    /**
     * Whether to send the printed file by email or not.
     * @type {boolean}
     */
    this.smtpEnabled = false;

    /**
     * Flag that determines whether to show a message notifying the
     * user about his upcomping file or not.
     * @type {boolean}
     */
    this.smtpMessage = false;

    /**
     * Whether sending file by email is supported or not. Obtained
     * from the print capabilities.
     * @type {boolean}
     */
    this.smtpSupported = false;

    /**
     * @type {boolean}
     * @private
     */
    this.scaleManuallySelected_ = false;

    /**
     * @type {JQuery}
     */
    this.rotationInput_ = $element.find('.gmf-print-rotation-input');

    // 'change' event listening is a workaround for IE11
    this.rotationInput_.on('input change', (event) => {
      const rotation = $(event.target).val();
      if (typeof rotation == 'string') {
        this.setRotation(parseFloat(rotation));
      }
    });

    /**
     * @type {function((Event|import("ol/events/Event.js").default)): (void|boolean)}
     */
    this.postcomposeListener_ = (e) => false;

    /**
     * @type {?angular.IHttpPromise<import('ngeo/print/mapfish-print-v3').MapFishPrintCapabilities>}
     * @private
     */
    this.capabilities_ = null;

    /**
     * @type {?import('gmf/themes.js').GmfOgcServers}
     * @private
     */
    this.ogcServers_ = null;

    /**
     * @type {import('gmf/themes.js').GmfTheme[]}
     * @private
     */
    this.currentThemes_ = [];
  }

  /**
   * Init the controller
   */
  $onInit() {
    if (!this.map) {
      throw new Error('Missing map');
    }

    this.legendMapFishPrintV3_ = new LegendMapFishPrintV3(
      this.gettextCatalog_,
      this.ngeoLayerHelper_,
      this.gmfExternalDataSourcesManager_,
      this.options.legend,
      this.map
    );

    listen(
      this.map.getView(),
      'change:rotation',
      /** @type {import("ol/events.js").ListenerFunction} */
      (event) => {
        this.updateRotation_(Math.round(toDegrees(event.target.getRotation())));
      }
    );

    // Clear the capabilities if the roles changes
    this.$scope_.$watch(
      () => this.gmfAuthenticationService_.getRolesIds().join(','),
      () => {
        this.gmfPrintState_.state = PrintStateEnum.CAPABILITIES_NOT_LOADED;
        this.capabilities_ = null;
      }
    );

    // Store user email
    this.$scope_.$watch(
      () => this.gmfAuthenticationService_.getEmail(),
      (newValue) => {
        this.smtpEmail = newValue;
      }
    );

    this.$scope_.$watch(
      () => this.active,
      (active) => {
        this.togglePrintPanel_(active);
      }
    );

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

    listen(
      this.gmfThemes_,
      'change',
      /** @type {import("ol/events.js").ListenerFunction} */
      () => {
        this.gmfThemes_.getThemesObject().then((currentThemes) => {
          this.currentThemes_ = currentThemes;
        });
      }
    );

    /**
     * @return {import("ol/size.js").Size} Size in dots of the map to print.
     */
    const getSizeFn = () => this.paperSize_;

    let getRotationFn;
    if (this.options.rotateMask) {
      /**
       * @return {number} rotation to apply.
       */
      getRotationFn = () => -this.rotation;
    }

    this.maskLayer_.getSize = getSizeFn;
    this.maskLayer_.getScale = this.getScaleFn.bind(this);
    this.maskLayer_.getRotation = getRotationFn;
  }

  /**
   * @param {import('ol/PluggableMap.js').FrameState} frameState Frame state.
   * @return {number} Scale of the map to print.
   */
  getScaleFn(frameState) {
    // Don't compute an optimal scale if the user manually choose a value not in
    // the pre-defined scales. (`scaleInput` in `gmfPrintOptions`).
    if (this.layoutInfo.scale === undefined) {
      throw new Error('Missing layoutInfo.scale');
    }
    if (!this.layoutInfo.scales) {
      throw new Error('Missing layoutInfo.scales');
    }
    if (
      !this.scaleManuallySelected_ &&
      (this.layoutInfo.scale === -1 || this.layoutInfo.scales.includes(this.layoutInfo.scale))
    ) {
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
        this.getCapabilities_(this.gmfAuthenticationService_.getRolesIds().join(','));
      }
      if (!this.capabilities_) {
        throw new Error('Missing capabilities');
      }
      this.capabilities_.then(
        (resp) => {
          if (!this.map) {
            throw new Error('Missing map');
          }
          // make sure the panel is still open
          if (!this.active) {
            return;
          }
          this.gmfPrintState_.state = PrintStateEnum.NOT_IN_USE;
          // Get capabilities - On success
          this.parseCapabilities_(resp);
          this.map.addLayer(this.maskLayer_);
          if (this.options.defaultLayout) {
            this.setLayout(this.options.defaultLayout);
          }
          this.pointerDragListenerKey_ = listen(this.map, 'pointerdrag', this.onPointerDrag_, this);
          this.mapViewResolutionChangeKey_ = listen(
            this.map.getView(),
            'change:resolution',
            /** @type {import("ol/events.js").ListenerFunction} */
            () => {
              this.scaleManuallySelected_ = false;
            }
          );
          this.map.render();
        },
        (resp) => {
          // Get capabilities - On error
          this.gmfPrintState_.state = PrintStateEnum.ERROR_ON_GETCAPABILITIES;
          this.capabilities_ = null;
        }
      );
    } else {
      if (!this.map) {
        throw new Error('Missing map');
      }
      this.map.removeLayer(this.maskLayer_);
      if (this.pointerDragListenerKey_) {
        unlistenByKey(this.pointerDragListenerKey_);
      }
      if (this.mapViewResolutionChangeKey_) {
        unlistenByKey(this.mapViewResolutionChangeKey_);
      }
      this.setRotation(0);
      this.map.render(); // Redraw (remove) post compose mask;
    }
  }

  /**
   * Gets the print capabilities.
   * @param {string} roleId The roles ids.
   * @private
   */
  getCapabilities_(roleId) {
    this.capabilities_ = this.ngeoPrint_.getCapabilities({
      withCredentials: true,
      params: {
        'role': roleId,
        'cache_version': this.cacheVersion_,
      },
    });
  }

  /**
   * Create the list of layouts, get the formats, get the first layout in
   * gmf print v3 capabilities and then update the print panel layout information.
   * @param {angular.IHttpResponse<import('ngeo/print/mapfish-print-v3').MapFishPrintCapabilities>} resp
   *    Response.
   * @private
   */
  parseCapabilities_(resp) {
    const data = resp.data;
    this.formats_ = data.formats || [];
    this.layouts_ = data.layouts;
    this.layout_ = data.layouts[0];

    this.layoutInfo.layouts = [];
    this.layouts_.forEach((layout) => {
      this.layoutInfo.layouts.push(layout.name);
    });

    this.smtpSupported = data.smtp && data.smtp.enabled;

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
    if (!this.map) {
      throw new Error('Missing map');
    }
    if (!this.layout_) {
      throw new Error('Missing layout');
    }
    this.layoutInfo.layout = this.layout_.name;

    const mapInfo = this.isAttributeInCurrentLayout_('map');
    if (!mapInfo) {
      throw new Error('Missing mapInfo');
    }
    const clientInfo = mapInfo.clientInfo;
    if (!clientInfo) {
      throw new Error('Missing clientInfo');
    }
    this.paperSize_ = [clientInfo.width, clientInfo.height];

    this.updateCustomFields_();

    const fieldValues = this.options.fieldValues || {};
    this.layoutInfo.legend = this.layoutInfo.attributes.includes('legend')
      ? fieldValues['legend'] !== false
      : undefined;
    this.layoutInfo.scales = clientInfo.scales || [];
    this.layoutInfo.dpis = clientInfo.dpiSuggestions || [];

    const mapSize = this.map.getSize();
    const viewResolution = this.map.getView().getResolution();
    this.layoutInfo.scale = this.getOptimalScale_(mapSize, viewResolution);

    this.layoutInfo.dpi =
      this.layoutInfo.dpi && this.layoutInfo.dpis.indexOf(this.layoutInfo.dpi) > 0
        ? this.layoutInfo.dpi
        : this.layoutInfo.dpis[0];

    this.layoutInfo.formats = {};
    this.formats_.forEach((format) => {
      this.layoutInfo.formats[format] = true;
    });

    this.attributesOut = this.layoutInfo.simpleAttributes;

    // Force the update of the mask
    this.map.render();
  }

  /**
   * Update simple attributes information with Customfield to be able to generate a form
   * from a custom GMF print v3 configuration.
   * @private
   */
  updateCustomFields_() {
    if (!this.layout_) {
      throw new Error('Missing layout');
    }
    if (!this.layoutInfo.simpleAttributes) {
      this.layoutInfo.simpleAttributes = [];
    }
    this.layoutInfo.attributes = [];

    const simpleAttributes = this.layoutInfo.simpleAttributes;
    const previousAttributes = simpleAttributes.splice(0, simpleAttributes.length);

    // The attributes without 'clientParams' are the custom layout information (defined by end user).
    this.layout_.attributes.forEach((attribute) => {
      this.layoutInfo.attributes.push(attribute.name);

      if (!attribute.clientParams) {
        const name = `${attribute.name}`;

        // Special case for timezone, fill it with browser timezone.
        if (name == 'timezone') {
          this.layoutInfo.simpleAttributes.push({
            name: 'timezone',
            type: 'text',
            value: Intl.DateTimeFormat().resolvedOptions().timeZone,
          });
          return;
        }

        const defaultValue = attribute.default;
        /** @type {string} */
        let value =
          defaultValue !== undefined && defaultValue !== ''
            ? `${defaultValue}`
            : name in (this.options.fieldValues || {})
            ? `${this.options.fieldValues[name]}`
            : '';

        // Try to use existing form field type
        const rawType = `${attribute.type}`;
        /** @type {string} */
        let type;
        switch (rawType) {
          case 'String':
            type = name === 'comments' ? 'textarea' : 'text';
            break;
          case 'Boolean':
            type = 'checkbox';
            break;
          case 'Number':
            type = 'number';
            const numberValue = parseFloat(value);
            value = isNaN(numberValue) ? '0' : `${value}`;
            break;
          default:
            type = rawType;
        }

        // If it exists use the value of previous same field.
        previousAttributes.forEach((c) => {
          if (c.name === name && c.type === type) {
            value = c.value;
            return value;
          }
        });

        this.layoutInfo.simpleAttributes.push({
          name,
          type,
          value: value,
        });
      }
    });
  }

  /**
   * Return a capabilities 'attribute' object corresponding to the given name.
   * @param {string} name Name of the attribute to get.
   * @return {?import('ngeo/print/mapfish-print-v3.js').MapFishPrintCapabilitiesLayoutAttribute} corresponding attribute or null.
   * @private
   */
  isAttributeInCurrentLayout_(name) {
    if (!this.layout_) {
      throw new Error('Missing layout');
    }
    let attr = null;
    this.layout_.attributes.forEach((attribute) => {
      if (attribute.name === name) {
        attr = attribute;
        return attribute;
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
    if (!this.map) {
      throw new Error('Missing map');
    }
    this.updateRotation_(rotation);
    // Render the map to update the postcompose mask or rotate the map.
    if (this.options.rotateMask) {
      this.map.render();
    } else {
      this.map.getView().setRotation(toRadians(this.rotation));
    }
  }

  /**
   * Set the current rotation value.
   * @param {number} rotation The optional new rotation value in degrees.
   */
  updateRotation_(rotation) {
    this.rotation = clamp(rotation, -180, 180);
    // sync all the inputs
    this.rotationInput_.val(this.rotation.toString());
  }

  /**
   * Calculate the angle and the sense of rotation between two lines. One from the
   * center of the map and the point of the last call to this function and one
   * from the same center and the point of the current call.
   * @param {Event|import("ol/events/Event.js").default} e An ol map browser pointer event.
   * @private
   */
  onPointerDrag_(e) {
    if (e instanceof MapBrowserEvent && this.onDragPreviousMousePosition_ && this.map) {
      const originalEvent = e.originalEvent;
      if (originalEvent instanceof KeyboardEvent) {
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
            const sense = p0x * p1y - p0y * p1x > 0 ? 1 : -1;
            let angle = (p0x * p1x + p0y * p1y) / (centerToP0 * centerToP1);
            angle = angle <= 1 ? sense * Math.acos(angle) : 0;
            const boost = centerToP1 / 200;
            const increment = Math.round(toDegrees(angle) * boost);

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
    }
  }

  /**
   * Create a print report based on the values of the 'layoutInfo' values.
   * @param {string} format An output format corresponding to one format in the
   *     capabilities document ('pdf', 'png', etc).
   */
  print(format) {
    if (!this.map) {
      throw new Error('Missing map');
    }
    if (!this.ogcServers_) {
      throw new Error('Missing ogcServers_');
    }
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

    /** @type {Object<string, unknown>} */
    const customAttributes = {};

    if (this.layoutInfo.attributes.includes('datasource')) {
      customAttributes.datasource = datasource;
    }

    if (this.layoutInfo.simpleAttributes) {
      this.layoutInfo.simpleAttributes.forEach((field) => {
        customAttributes[field.name] = field.value;
      });
    }

    if (this.layoutInfo.legend) {
      const center = this.map.getView().getCenter();
      if (!center) {
        throw new Error('Missing center');
      }
      const deltaX = (this.paperSize_[0] * scale) / 2 / INCHES_PER_METER / DOTS_PER_INCH;
      const deltaY = (this.paperSize_[1] * scale) / 2 / INCHES_PER_METER / DOTS_PER_INCH;
      const bbox = [center[0] - deltaX, center[1] - deltaY, center[0] + deltaX, center[1] + deltaY];
      const legend = this.legendMapFishPrintV3_.getLegend(
        this.currentThemes_,
        scale,
        this.layoutInfo.dpi,
        bbox
      );
      if (legend !== null) {
        customAttributes.legend = legend;
      }
    }

    if (typeof this.layoutInfo.dpi != 'number') {
      throw new Error('Wrong layoutInfo.dpi type');
    }
    if (typeof this.layoutInfo.layout != 'string') {
      throw new Error('Wrong layoutInfo.layout type');
    }

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
              server.type,
              undefined,
              undefined,
              undefined,
              undefined,
              {opacity: layer.get('opacity')}
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
    const group = new olLayerGroup({
      layers: new_ol_layers,
    });
    group.set('printNativeAngle', print_native_angle);
    map.setLayerGroup(group);

    const email = this.smtpSupported && this.smtpEmail && this.smtpEnabled ? this.smtpEmail : undefined;

    const spec = this.ngeoPrint_.createSpec(
      map,
      scale,
      this.rotation,
      this.layoutInfo.dpi,
      this.layoutInfo.layout,
      format,
      customAttributes,
      email,
      this.options.goodnessOfFit
    );

    // Add feature overlay layer to print spec.
    /** @type {import('ngeo/print/mapfish-print-v3.js').MapFishPrintLayer[]} */
    const layers = [];
    this.ngeoPrint_.encodeLayer(layers, this.featureOverlayLayer_, viewResolution, this.layoutInfo.dpi);
    if (layers.length > 0) {
      spec.attributes.map.layers.unshift(layers[0]);
    }

    this.ngeoPrint_
      .createReport(
        spec,
        /** @type {angular.IRequestShortcutConfig} */ ({
          timeout: this.requestCanceler_.promise,
        })
      )
      .then(this.handleCreateReportSuccess_.bind(this), this.handleCreateReportError_.bind(this));

    // remove temporary map
    map.setTarget('');
  }

  /**
   * Cancel the current print and reset its state.
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
   * @param {PrintStateEnum} [opt_printState] the print state.
   * @private
   */
  resetPrintStates_(opt_printState) {
    this.gmfPrintState_.state = opt_printState || PrintStateEnum.NOT_IN_USE;
    this.curRef_ = '';
  }

  /**
   * Get datasource object for print report
   * @private
   * @return {import('ngeo/print/mapfish-print-v3').DataSourcePrintReportObject[]} the data
   *     source object for the print report
   */
  getDataSource_() {
    /** @type {import("ngeo/print/mapfish-print-v3").DataSourcePrintReportObject[]} */
    const datasourceArr = [];
    const sources = this.ngeoQueryResult_.sources;
    sources.forEach((source) => {
      /** @type {(string | number | boolean)[][]} */
      const data = [];
      /** @type {string[]} */
      let columns = [];
      source.features.forEach((feature, i) => {
        if (!feature) {
          throw new Error('Missing feature');
        }
        const properties = getFilteredFeatureValues(feature);
        if (i === 0) {
          columns = Object.keys(properties).map((prop) => {
            return this.translate_(prop);
          });
        }
        data.push(Object.keys(properties).map((key) => properties[key]));
      });
      if (columns.length) {
        const datasourceObj = {
          title: this.translate_(source.label),
          table: {
            columns,
            data,
          },
        };
        datasourceArr.push(datasourceObj);
      }
    });
    return datasourceArr;
  }

  /**
   * Get the optimal scale to display the print mask. Return the lowest scale if
   * no scale matches.
   * @param {import("ol/size.js").Size|undefined} mapSize Size of the map on the screen (px).
   * @param {number|undefined} viewResolution Resolution of the map on the screen.
   * @return {number} The best scale.
   * @private
   */
  getOptimalScale_(mapSize, viewResolution) {
    const scales = this.layoutInfo.scales.slice();
    if (mapSize !== undefined && viewResolution !== undefined) {
      const scale = this.ngeoPrintUtils_.getOptimalScale(
        mapSize,
        viewResolution,
        this.paperSize_,
        scales.reverse()
      );
      if (scale > 0) {
        return scale;
      }
    }
    return this.layoutInfo.scales[this.layoutInfo.scales.length - 1];
  }

  /**
   * @param {angular.IHttpResponse<import('ngeo/print/mapfish-print-v3.js').MapFishPrintReportResponse>} resp
   *    Response.
   * @private
   */
  handleCreateReportSuccess_(resp) {
    // If the file was sent by email, there's no need to get status. A
    // message is immediately shown and print states are reset.
    if (this.smtpSupported && this.smtpEmail && this.smtpEnabled) {
      this.smtpMessage = true;
      this.resetPrintStates_();
    } else {
      const ref = resp.data.ref;
      if (!ref.length) {
        throw new Error('Wrong ref');
      }
      this.curRef_ = ref;
      this.getStatus_(ref);
    }
  }

  /**
   * @param {string} ref Ref.
   * @private
   */
  getStatus_(ref) {
    this.requestCanceler_ = this.$q_.defer();
    this.ngeoPrint_
      .getStatus(ref, {
        timeout: this.requestCanceler_.promise,
      })
      .then(this.handleGetStatusSuccess_.bind(this, ref), this.handleCreateReportError_.bind(this));
  }

  /**
   * @param {string} ref Ref.
   * @param {angular.IHttpResponse<import('ngeo/print/mapfish-print-v3.js').MapFishPrintStatusResponse>} resp
   *    Response.
   * @private
   */
  handleGetStatusSuccess_(ref, resp) {
    const mfResp = resp.data;
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
      this.statusTimeoutPromise_ = this.$timeout_(
        () => {
          this.getStatus_(ref);
        },
        1000,
        false
      );
    }
  }

  /**
   * @private
   */
  handleCreateReportError_() {
    this.resetPrintStates_(PrintStateEnum.ERROR_ON_REPORT);
  }

  /**
   * Set the current layout and update all layout information with this new layout parameters.
   * @param {string} layoutName A layout name as existing in the list of
   *     existing layouts.
   */
  setLayout(layoutName) {
    /** @type {?import('ngeo/print/mapfish-print-v3').MapFishPrintCapabilitiesLayout} */
    let layout = null;
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
   * @param {number} [opt_scale] A scale value as existing in the scales list field.
   * @return {number|undefined} New scale.
   */
  getSetScale(opt_scale) {
    if (opt_scale !== undefined) {
      if (!this.map) {
        throw new Error('Missing map');
      }
      const mapSize = this.map.getSize() || [0, 0];
      this.layoutInfo.scale = opt_scale;
      const res = this.ngeoPrintUtils_.getOptimalResolution(mapSize, this.paperSize_, opt_scale);

      const view = this.map.getView();
      const contrainRes = view.getConstraints().resolution(res, 1, mapSize);
      view.setResolution(contrainRes);
      // Render the map to update the postcompose mask manually
      this.map.render();
      this.scaleManuallySelected_ = true;
    }
    return this.layoutInfo.scale;
  }

  /**
   * Set the print dpi value.
   * @param {number} dpi A dpi value as existing in the dpis list field.
   */
  setDpi(dpi) {
    this.layoutInfo.dpi = dpi;
  }

  /**
   * Check the current state of the print.
   * @param {string} stateEnumKey An enum key from import("gmf/print/component.js").default.PrintStateEnum.
   * @return {boolean} True if the given state matches with the current print
   *     state. False otherwise.
   */
  isState(stateEnumKey) {
    return this.gmfPrintState_.state === /** @type {Object<string, string>} */ (PrintStateEnum)[stateEnumKey];
  }

  /**
   * Close the SMTP message
   */
  closeSmtpMessage() {
    this.smtpMessage = false;
  }
}

myModule.controller('GmfPrintController', PrintController);

export default myModule;
