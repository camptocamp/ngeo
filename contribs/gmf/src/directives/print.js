goog.provide('gmf.PrintController');
goog.provide('gmf.printDirective');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.authenticationDirective');
goog.require('ngeo.CreatePrint');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ngeo.LayerHelper');
goog.require('ngeo.PrintUtils');


/**
 * @enum {string}
 * @export
 */
gmf.PrintStateEnum = {

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

gmf.module.value('gmfPrintState', {
  'state': gmf.PrintStateEnum.CAPABILITIES_NOT_LOADED
});

gmf.module.value('gmfPrintTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template.
     */
    function(element, attrs) {
      const templateUrl = attrs['gmfPrintTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/print.html';
    });


/**
 * Provide a directive that display a print panel. This panel is populated with
 * a form corresponding to the capabilities delivered by a GMF print v3 server.
 * If you want to use another template for your print panel, you can see the
 * available fields in the 'gmfx.PrintFields' classes.
 *
 * Example:
 *
 *      <gmf-print
 *        gmf-print-map="mainCtrl.map"
 *        gmf-print-active="printActive"
 *        gmf-print-rotatemask="true">
 *      </gmf-print>
 *
 * Note: The 'print' and 'cancel' functions can also be called via globals
 * events 'gmfStartPrint' and 'gmfCancelPrint'.
 *
 * @htmlAttribute {ol.Map} gmf-print-map The map.
 * @htmlAttribute {boolean} gmf-print-active A boolean that informs if the
 *     panel is open or not.
 * @htmlAttribute {boolean} gmf-print-rotatemask Optional. True to apply
 *     rotation on the mask instead of the map. By default, the map rotates.
 * @htmlAttribute {Object.<string, string|number|boolean>}
 *     gmf-print-fieldvalues optional. Key, value object to define default
 *     value in each of your print panel field. The key refers to the
 *     property's name of the field.
 *     Example: {'comments': 'demo', 'legend': false}. Doesn't work for the dpi
 *     and the scale. Server's values are used in priorty.
 * @param {string|function(!angular.JQLite=, !angular.Attributes=)}
 *     gmfPrintTemplateUrl Template url for the directive.
 * @return {angular.Directive} Directive Definition Object.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfPrint
 */
gmf.printDirective = function(gmfPrintTemplateUrl) {
  return {
    bindToController: true,
    controller: 'GmfPrintController as ctrl',
    templateUrl: gmfPrintTemplateUrl,
    replace: true,
    restrict: 'E',
    scope: {
      'map': '=gmfPrintMap',
      'active': '=gmfPrintActive',
      'rotateMask': '&?gmfPrintRotatemask',
      'fieldValues': '&?gmfPrintFieldvalues'
    },
    link(scope, element, attr) {
      const ctrl = scope['ctrl'];

      scope.$watch(function() {
        return ctrl.active;
      }, function(active) {
        this.togglePrintPanel_(active);
      }.bind(ctrl));
    }
  };
};


gmf.module.directive('gmfPrint', gmf.printDirective);


/**
 * @param {angular.Scope} $rootScope Angular root scope.
 * @param {angular.Scope} $scope Angular scope.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {angular.$q} $q The Angular $q service.
 * @param {angular.$injector} $injector Main injector.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {ngeo.LayerHelper} ngeoLayerHelper The ngeo Layer Helper service.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr Ngeo Feature Overlay
 *     Manager service.
 * @param {ngeo.PrintUtils} ngeoPrintUtils The ngeo PrintUtils service.
 * @param {ngeo.CreatePrint} ngeoCreatePrint The ngeo Create Print function.
 * @param {string} gmfPrintUrl A MapFishPrint url.
 * @param {gmf.Authentication} gmfAuthentication The authentication service.
 * @param {ngeox.QueryResult} ngeoQueryResult ngeo query result.
 * @param {ngeo.FeatureHelper} ngeoFeatureHelper the ngeo FeatureHelper service.
 * @param {angular.$filter} $filter Angular $filter service.
 * @param {gmf.PrintStateEnum} gmfPrintState GMF print state.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc Controller
 * @ngname GmfPrintController
 */
gmf.PrintController = function($rootScope, $scope, $timeout, $q, $injector,
    gettextCatalog, ngeoLayerHelper, ngeoFeatureOverlayMgr,  ngeoPrintUtils,
    ngeoCreatePrint, gmfPrintUrl, gmfAuthentication, ngeoQueryResult,
    ngeoFeatureHelper, $filter, gmfPrintState) {

  /**
   * @type {gmf.PrintStateEnum}
   * @private
   */
  this.gmfPrintState_ = gmfPrintState;

  /**
   * @type {function(string): string}
   * @private
   */
  this.translate_ = $filter('translate');

  /**
   * @type {ngeo.FeatureHelper}
   * @export
   */
  this.ngeoFeatureHelper_ = ngeoFeatureHelper;

  /**
   * @type {boolean}
   */
  this.active;

  /**
   * @type {boolean}
   * @private
   */
  this.rotateMask_ = this['rotateMask'] ? this['rotateMask']() : false;

  /**
   * @type {Object.<string, string|number|boolean>!}
   * @private
   */
  this.fieldValues_ = this['fieldValues'] ?
      this['fieldValues']() : {};

  /**
   * @type {angular.Scope}
   * @private
   */
  this.$scope_ = $scope;

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.$timeout_ = $timeout;

  /**
   * @type {angular.$q}
   * @private
   */
  this.$q_ = $q;

  /**
   * @type {angularGettext.Catalog}
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;

  /**
   * @type {ngeo.LayerHelper}
   * @private
   */
  this.ngeoLayerHelper_ = ngeoLayerHelper;

  /**
   * @type {ol.layer.Vector}
   * @private
   */
  this.featureOverlayLayer_ = ngeoFeatureOverlayMgr.getLayer();

  /**
   * @type {ngeo.PrintUtils}
   * @private
   */
  this.ngeoPrintUtils_ = ngeoPrintUtils;

  /**
   * @type {ngeo.Print}
   * @private
   */
  this.ngeoPrint_ = ngeoCreatePrint(gmfPrintUrl);

  /**
   * @type {ngeox.QueryResult}
   * @private
   */
  this.ngeoQueryResult_ = ngeoQueryResult;

  this.cacheVersion_ = '0';
  if ($injector.has('cacheVersion')) {
    this.cacheVersion_ = $injector.get('cacheVersion');
  }

  /**
   * @type {?angular.$q.Deferred}
   * @private
   */
  this.requestCanceler_ = null;

  /**
   * @type {?angular.$q.Promise}
   * @private
   */
  this.statusTimeoutPromise_ = null;

  /**
   * @type {Array.<number>|null}
   * @private
   */
  this.onDragPreviousMousePosition_ = null;

  /**
   * @type {?angular.$q.Promise|null}
   * @private
   */
  this.rotationTimeoutPromise_ = null;

  /**
   * @type {goog.events.Key}
   * @private
   */
  this.postComposeListenerKey_;

  /**
   * @type {goog.events.Key}
   * @private
   */
  this.pointerDragListenerKey_;

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
   * @type {gmfx.PrintFields}
   * @export
   */
  this.fields = {};

  /**
   * @type {number}
   * @export
   */
  this.rotation = 0;

  /**
   * @return {ol.Size} Size in dots of the map to print.
   */
  const getSizeFn = function() {
    return this.paperSize_;
  }.bind(this);

  /**
   * @param {olx.FrameState} frameState Frame state.
   * @return {number} Scale of the map to print.
   */
  const getScaleFn = function(frameState) {
    const mapSize = frameState.size;
    const viewResolution = frameState.viewState.resolution;
    return this.fields.scale = this.getOptimalScale_(mapSize, viewResolution);
  }.bind(this);

  let getRotationFn;
  if (this.rotateMask_) {
    /**
     * @return {number} rotation to apply.
     */
    getRotationFn = function() {
      return this.rotation;
    }.bind(this);
  }

  /**
   * @type {function(ol.render.Event)}
   */
  this.postcomposeListener_ = ngeoPrintUtils.createPrintMaskPostcompose(
      getSizeFn, getScaleFn, getRotationFn);

  /**
   * @type {angular.$http.HttpPromise}
   * @private
   */
  this.capabilities_;

  // Clear the capabilities if the roleId changes
  $scope.$watch(function() {
    return gmfAuthentication.getRoleId();
  }, function() {
    this.gmfPrintState_.state = gmf.PrintStateEnum.CAPABILITIES_NOT_LOADED;
    this.capabilities_ = null;
  }.bind(this));

  // Print on event.
  $rootScope.$on('gmfStartPrint', function(event, format) {
    this.print('' + format);
  }.bind(this));

  // Cancel print task on event.
  $rootScope.$on('gmfCancelPrint', function() {
    this.cancel();
  }.bind(this));
};


/**
 * @param {boolean} active True to listen events related to the print and get
 *     capabilities. False to stop listen them and set rotation to 0.
 * @private
 */
gmf.PrintController.prototype.togglePrintPanel_ = function(active) {
  if (active) {
    if (!this.capabilities_) {
      this.getCapabilities_();
    }
    this.capabilities_.then(function(resp) {
      // make sure the panel is still open
      if (!this.active) {
        return;
      }
      this.gmfPrintState_.state = gmf.PrintStateEnum.NOT_IN_USE;
      // Get capabilities - On success
      this.parseCapabilities_(resp);
      this.postComposeListenerKey_ = this.map.on('postcompose',
          this.postcomposeListener_);
      this.pointerDragListenerKey_ = this.map.on('pointerdrag',
          this.onPointerDrag_.bind(this));
      this.map.render();
    }.bind(this), function(resp) {
      // Get capabilities - On error
      this.gmfPrintState_.state = gmf.PrintStateEnum.ERROR_ON_GETCAPABILITIES;
      this.capabilities_ = null;
    }.bind(this));
  } else {
    this.map.unByKey(this.postComposeListenerKey_);
    this.map.unByKey(this.pointerDragListenerKey_);
    this.getSetRotation(0);
    this.map.render(); // Redraw (remove) post compose mask;
  }
};


/**
 * Gets the print capabilities.
 * @param {number|null=} opt_roleId The role id.
 * @private
 */
gmf.PrintController.prototype.getCapabilities_ = function(opt_roleId) {
  this.capabilities_ = this.ngeoPrint_.getCapabilities(
    /** @type {angular.$http.Config} */ ({
      withCredentials: true,
      params: opt_roleId ? {
        'role': opt_roleId,
        'cache_version': this.cacheVersion_
      } : {
        'cache_version': this.cacheVersion_
      }
    }));
};


/**
 * Create the list of layouts, get the formats, get the first layout in
 * gmf print v3 capabilities and then update the print panel fields.
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.PrintController.prototype.parseCapabilities_ = function(resp) {
  const data = resp['data'];
  this.formats_ = data['formats'] || [];
  this.layouts_ = data['layouts'];
  this.layout_ = data['layouts'][0];

  this.fields.layouts = [];
  this.layouts_.forEach(function(layout) {
    this.fields.layouts.push(layout.name);
  }.bind(this));

  this.updateFields_();
};


/**
 * Update fields with the user values if there are always available in the
 * current layout otherwise use the defaults values of the layout.
 * If a field doesn't exist in the current layout, set it to undefined so the
 * view can hide it. Update also the paper size.
 * custom print templates).
 * @private
 */
gmf.PrintController.prototype.updateFields_ = function() {
  this.fields.layout = this.layout_.name;

  const mapInfo = this.isAttributeInCurrentLayout_('map');
  goog.asserts.assertObject(mapInfo);
  const clientInfo = mapInfo['clientInfo'];
  goog.asserts.assertObject(clientInfo);
  this.paperSize_ = [clientInfo['width'], clientInfo['height']];

  this.updateCustomFields_();

  const legend = this.isAttributeInCurrentLayout_('legend');
  if (this.fields.legend === undefined) {
    this.fields.legend = !!(legend !== undefined ?
        legend : this.fieldValues_['legend']);
  }

  this.fields.scales = clientInfo['scales'] || [];
  this.fields.dpis = clientInfo['dpiSuggestions'] || [];

  const mapSize = this.map.getSize();
  const viewResolution = this.map.getView().getResolution();
  this.fields.scale = this.getOptimalScale_(mapSize, viewResolution);

  this.fields.dpi =
      (this.fields.dpi && this.fields.dpis.indexOf(this.fields.dpi) > 0) ?
      this.fields.dpi : this.fields.dpis[0];

  this.fields.formats = {};
  this.formats_.forEach(function(format) {
    this.fields.formats[format] = true;
  }.bind(this));

  // Force the update of the mask
  this.map.render();
};


/**
 * Update customs fields with gmfx.Customfield to be able to generate a form
 * from a custom GMF print v3 configuration.
 * @private
 */
gmf.PrintController.prototype.updateCustomFields_ = function() {
  let name, rawType, value, type;
  if (!this.fields.customs) {
    this.fields.customs = [];
  }
  const customs = this.fields.customs;
  const previousCustoms = customs.splice(0, customs.length);

  // The attributes without 'clientParams' are the custom fields (user-defined).
  this.layout_.attributes.forEach(function(attribute) {
    if (!attribute['clientParams']) {
      name = '' + attribute.name;
      const defaultValue = attribute.default;
      value = (defaultValue !== undefined && defaultValue !== '') ?
          defaultValue : this.fieldValues_[name];

      // Try to use existing form field type
      rawType = '' + attribute.type;
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
      previousCustoms.forEach(function(c) {
        if (c.name === name && c.type === type) {
          return value = c.value;
        }
      });

      this.fields.customs.push(/** gmfx.CustomField */ ({
        name,
        type,
        value
      }));
    }
  }.bind(this));
};


/**
 * Return a capabilities 'attribute' object corresponding to the given name.
 * @param {string} name Name of the attribute to get.
 * @return {Object|null} corresponding attribute or null.
 * @private
 */
gmf.PrintController.prototype.isAttributeInCurrentLayout_ = function(name) {
  let attr = null;
  this.layout_.attributes.forEach(function(attribute) {
    if (attribute.name === name) {
      return attr = attribute;
    }
  });
  return attr;
};


/**
 * Getter setter to update or get the current rotation value. Param and result
 *     are in degree. Updating the rotation will redraw the mask or rorate the
 *     map (depending on the configuration);
 * @param {number=} opt_rotation The optional new rotation value.
 * @return {number} The new value of rotation;
 * @export
 */
gmf.PrintController.prototype.getSetRotation = function(opt_rotation) {
  if (opt_rotation !== undefined) {
    let rotation = parseInt(opt_rotation, 10);
    if (rotation > 180) {
      rotation = -180;
    } else if (rotation < -180) {
      rotation = 180;
    }
    this.rotation = rotation;

    // Render the map to update the postcompose mask or rotate the map.
    if (this.rotateMask_) {
      this.map.render();
    } else {
      this.map.getView().setRotation(ol.math.toRadians(this.rotation));
    }

  }
  return this.rotation;
};


/**
 * Calculate the angle and the sense of rotation between two lines. One from the
 * center of the map and the point of the last call to this function and one
 * from the same center and the point of the current call.
 * @param {ol.MapBrowserPointerEvent} e An ol map browser pointer event.
 * @private
 */
gmf.PrintController.prototype.onPointerDrag_ = function(e) {
  const originalEvent = e.originalEvent;
  if (this.active && originalEvent.altKey && originalEvent.shiftKey) {
    const center = this.map.getPixelFromCoordinate(this.map.getView().getCenter());
    const pixel = e.pixel;
    // Reset previous position between two differents sessions of drags events.
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
      const increment = Math.round(ol.math.toDegrees(angle) * boost);

      // Set rotation then update the view.
      this.getSetRotation(this.rotation + increment);
      this.$scope_.$digest();
    }
    // Prepare the removal of this session of drags events
    this.rotationTimeoutPromise_ = this.$timeout_(function() {
      this.rotationTimeoutPromise_ = null;
    }.bind(this), 500);
    // Keep the current position for the next calculation.
    this.onDragPreviousMousePosition_ = pixel;
  }
};


/**
 * Create a print report based on the values of the 'fields' values.
 * @param {string} format An output format corresponding to one format in the
 *     capabilities document ('pdf', 'png', etc).
 * @export
 */
gmf.PrintController.prototype.print = function(format) {
  // Do not print if a print task is already processing.
  if (this.gmfPrintState_.state === gmf.PrintStateEnum.PRINTING) {
    return;
  }
  this.requestCanceler_ = this.$q_.defer();
  this.gmfPrintState_.state = gmf.PrintStateEnum.PRINTING;

  const mapSize = this.map.getSize();
  const viewResolution = this.map.getView().getResolution();
  const scale = this.getOptimalScale_(mapSize, viewResolution);
  const rotation = this.rotateMask_ ? -this.rotation : this.rotation;
  const datasource = this.getDataSource_();

  const customAttributes = {
    'datasource': datasource,
    'lang': this.gettextCatalog_.currentLanguage,
    'rotation': rotation,
    'scale': this.fields.scale
  };

  if (this.fields.customs) {
    this.fields.customs.forEach(function(field) {
      customAttributes[field.name] = field.value;
    });
  }

  if (this.fields.legend) {
    const legend = this.getLegend_(scale);
    if (legend !== null) {
      customAttributes['legend'] = this.getLegend_(scale);
    }
  }

  goog.asserts.assertNumber(this.fields.dpi);
  goog.asserts.assertString(this.fields.layout);

  const spec = this.ngeoPrint_.createSpec(this.map, scale, this.fields.dpi,
      this.fields.layout, format, customAttributes);

  // Add feature overlay layer to print spec.
  const layers = [];
  this.ngeoPrint_.encodeLayer(layers, this.featureOverlayLayer_,
      viewResolution);
  if (layers.length > 0) {
    spec.attributes.map.layers.unshift(layers[0]);
  }

  this.ngeoPrint_.createReport(spec, /** @type {angular.$http.Config} */ ({
    timeout: this.requestCanceler_.promise
  })).then(
      this.handleCreateReportSuccess_.bind(this),
      this.handleCreateReportError_.bind(this)
  );
};


/**
 * Cancel the current print and reset its state.
 * @export
 */
gmf.PrintController.prototype.cancel = function() {
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
};


/**
 * @param {gmf.PrintStateEnum=} opt_printState the print state.
 * @private
 */
gmf.PrintController.prototype.resetPrintStates_ = function(opt_printState) {
  this.gmfPrintState_.state = opt_printState || gmf.PrintStateEnum.NOT_IN_USE;
  this.curRef_ = '';
};


/**
 * Get datasource object for print report
 * @private
 * @return {Array.<gmfx.DataSourcePrintReportObject>} the datasource objet for
 * the print report
 */
gmf.PrintController.prototype.getDataSource_ = function() {
  let datasourceObj, data, columns;
  const datasourceArr = [];
  const sources = this.ngeoQueryResult_.sources;
  sources.forEach(function(source) {
    data = [];
    columns = [];
    source.features.forEach(function(feature, i) {
      const properties = this.ngeoFeatureHelper_.getFilteredFeatureValues(feature);
      if (i === 0) {
        columns = Object.keys(properties).map(function tanslateColumns(prop) {
          return this.translate_(prop);
        }, this);
      }
      data.push(Object.keys(properties).map(function(key) {
        return properties[key];
      }));
    }, this);
    if (columns.length) {
      datasourceObj = /** @type {gmfx.DataSourcePrintReportObject} */({
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
};


/**
 * Get the optimal scale to display the print mask. Return the first scale if
 * no scale matches.
 * @param {ol.Size} mapSize Size of the map on the screen (px).
 * @param {number} viewResolution Resolution of the map on the screen.
 * @return {number} The best scale. -1 is returned if there is no optimal
 *     scale, that is the optimal scale is lower than or equal to the first
 *     value in printMapScales.
 * @private
 */
gmf.PrintController.prototype.getOptimalScale_ = function(mapSize,
    viewResolution) {
  const scales = this.fields.scales.slice();
  if (mapSize !== undefined && viewResolution !== undefined) {
    return this.ngeoPrintUtils_.getOptimalScale(mapSize, viewResolution,
        this.paperSize_, scales.reverse());
  }
  return this.fields.scales[0];
};


/**
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.PrintController.prototype.handleCreateReportSuccess_ = function(resp) {
  const mfResp = /** @type {MapFishPrintReportResponse} */ (resp.data);
  const ref = mfResp.ref;
  goog.asserts.assert(ref.length > 0);
  this.curRef_ = ref;
  this.getStatus_(ref);
};


/**
 * @param {string} ref Ref.
 * @private
 */
gmf.PrintController.prototype.getStatus_ = function(ref) {
  this.requestCanceler_ = this.$q_.defer();
  this.ngeoPrint_.getStatus(ref, /** @type {angular.$http.Config} */ ({
    timeout: this.requestCanceler_.promise
  })).then(
      this.handleGetStatusSuccess_.bind(this, ref),
      this.handleCreateReportError_.bind(this)
  );
};


/**
 * @param {string} ref Ref.
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.PrintController.prototype.handleGetStatusSuccess_ = function(ref, resp) {
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
    this.statusTimeoutPromise_ = this.$timeout_(function() {
      this.getStatus_(ref);
    }.bind(this), 1000, false);
  }
};


/**
 * @private
 */
gmf.PrintController.prototype.handleCreateReportError_ = function() {
  this.resetPrintStates_(gmf.PrintStateEnum.ERROR_ON_REPORT);
};


/**
 * @param {number} scale The scale to get the legend (for wms layers only).
 * @return {Object?} Legend object for print report or null.
 * @private
 */
gmf.PrintController.prototype.getLegend_ = function(scale) {
  const legend = {'classes': []};
  let classes, layerNames, layerName, icons;
  const gettextCatalog = this.gettextCatalog_;

  // Get layers from layertree only.
  const dataLayerGroup = this.ngeoLayerHelper_.getGroupFromMap(this.map,
      gmf.DATALAYERGROUP_NAME);
  const layers = this.ngeoLayerHelper_.getFlatLayers(dataLayerGroup);

  // For each visible layer in reverse order, get the legend url.
  layers.reverse().forEach(function(layer) {
    classes = [];
    const source = layer.getSource();

    if (layer.getVisible() && source !== undefined) {
      // For WMTS layers.
      if (layer instanceof ol.layer.Tile) {
        layerName = layer.get('layerNodeName');
        icons = this.ngeoLayerHelper_.getWMTSLegendURL(layer);
        // Don't add classes without legend url.
        if (icons !== null) {
          classes.push({
            'name': gettextCatalog.getString('' + layerName),
            'icons': [icons]
          });
        }
      } else {
        // For each name in a WMS layer.
        layerNames = source.getParams()['LAYERS'].split(',');
        layerNames.forEach(function(name) {
          icons = this.ngeoLayerHelper_.getWMSLegendURL(source.getUrl(), name,
              scale);
          // Don't add classes without legend url or from layers without any
          // active name.
          if (icons !== null && name.length !== 0) {
            classes.push({
              'name': gettextCatalog.getString('' + name),
              'icons': [icons]
            });
          }
        }.bind(this));
      }
    }

    // Add classes object only if it contains something.
    if (classes.length > 0) {
      legend['classes'].push({'classes': classes});
    }

  }.bind(this));

  return legend['classes'].length > 0 ?  legend : null;
};


/**
 * Set the current layout and update all fields with this new layout parameters.
 * @param {string!} layoutName A layout name as existing in the list of
 *     existing layouts.
 * @export
 */
gmf.PrintController.prototype.setLayout = function(layoutName) {
  let layout;
  this.layouts_.forEach(function(l) {
    if (l.name === layoutName) {
      layout = l;
      return true; // break;
    }
  });
  this.layout_ = layout;
  this.updateFields_();
};


/**
 * Set the print scale value and adapt the zoom to match with this new scale.
 * @param {number} scale A scale value as existing in the scales list field.
 * @export
 */
gmf.PrintController.prototype.setScale = function(scale) {
  const mapSize = this.map.getSize();
  this.fields.scale = scale;
  const res = this.ngeoPrintUtils_.getOptimalResolution(mapSize, this.paperSize_,
        scale);
  const contrainRes = this.map.getView().constrainResolution(res, 0, 1);
  this.map.getView().setResolution(contrainRes);
};


/**
 * Set the print dpi value.
 * @param {number} dpi A dpi value as existing in the dpis list field.
 * @export
 */
gmf.PrintController.prototype.setDpi = function(dpi) {
  this.fields.dpi = dpi;
};


/**
 * Check the current state of the print.
 * @param {string} stateEnumKey An enum key from gmf.PrintStateEnum.
 * @return {boolean} True if the given state matches with the current print
 *     state. False otherwise.
 * @export
 */
gmf.PrintController.prototype.isState = function(stateEnumKey) {
  return this.gmfPrintState_.state === gmf.PrintStateEnum[stateEnumKey];
};

gmf.module.controller('GmfPrintController', gmf.PrintController);
