goog.provide('gmf.PrintController');
goog.provide('gmf.printDirective');

goog.require('gmf');
goog.require('ngeo.CreatePrint');
goog.require('ngeo.FeatureOverlayMgr');
goog.require('ngeo.LayerHelper');
goog.require('ngeo.PrintUtils');


ngeo.module.value('gmfPrintTemplateUrl',
    /**
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @return {string} Template.
     */
    function(element, attrs) {
      var templateUrl = attrs['gmfPrintTemplateurl'];
      return templateUrl !== undefined ? templateUrl :
          gmf.baseTemplateUrl + '/print.html';
    });


/**
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
    controller: 'GmfPrintController',
    controllerAs: 'ctrl',
    templateUrl: gmfPrintTemplateUrl,
    replace: true,
    restrict: 'E',
    scope: {
      'map': '=gmfPrintMap',
      'active': '=gmfPrintActive'
    },
    link: function(scope, element, attr) {
      var ctrl = scope['ctrl'];

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
 * @param {angular.Scope} $scope Angular scope.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {angular.$q} $q The Angular $q service.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {ngeo.LayerHelper} ngeoLayerHelper The ngeo Layer Helper service.
 * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr Ngeo Feature Overlay
 *     Manager service.
 * @param {ngeo.PrintUtils} ngeoPrintUtils The ngeo PrintUtils service.
 * @param {ngeo.CreatePrint} ngeoCreatePrint The ngeo Create Print function.
 * @param {string} gmfPrintUrl A MapFishPrint url.
 * @constructor
 * @export
 * @ngInject
 * @ngdoc Controller
 * @ngname GmfPrintController
 */
gmf.PrintController = function($scope, $timeout, $q, gettextCatalog,
    ngeoLayerHelper, ngeoFeatureOverlayMgr,  ngeoPrintUtils, ngeoCreatePrint,
    gmfPrintUrl) {

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
   * Text to display a "loading" message while waiting for the report.
   * @type {string}
   * @export
   */
  this.printState = '';

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
   * @type {Object} FIXME precise type
   * @export
   */
  this.fields = {};

  /**
   * @type {number}
   * @export
   */
  this.rotation = 0;

  /**
   * @type {Array.<number>|null}
   * @private
   */
  this.onDragPreviousMousePosition_ = null;

  /**
   * @type {number|null}
   * @private
   */
  this.onDragTimeStamp_ = null;

  /**
   * @return {ol.Size} Size in dots of the map to print.
   */
  var getSizeFn = function() {
    return this.paperSize_;
  }.bind(this);

  /**
   * @param {olx.FrameState} frameState Frame state.
   * @return {number} Scale of the map to print.
   */
  var getScaleFn = function(frameState) {
    var mapSize = frameState.size;
    var viewResolution = frameState.viewState.resolution;
    return this.fields.scale = this.getOptimalScale_(mapSize, viewResolution);
  }.bind(this);

  /**
   * @return {number} rotation to apply.
   */
  var getRotationFn = function() {
    return this.rotation;
  }.bind(this);

  /**
   * @type {function(ol.render.Event)}
   */
  this.postcomposeListener_ = ngeoPrintUtils.createPrintMaskPostcompose(
      getSizeFn, getScaleFn, getRotationFn);
};


/**
 * @param {boolean} active True to listen events related to the print and get
 *     capabilities. False to stop listen them and set rotation to 0.
 * @private
 */
gmf.PrintController.prototype.togglePrintPanel_ = function(active) {
  if (active) {
    // FIXME handle error
    this.ngeoPrint_.getCapabilities().then(function(resp) {
      this.parseCapabilities_(resp);
      this.map.on('postcompose', this.postcomposeListener_);
      this.map.on('pointerdrag', this.onPointerDrag_.bind(this));
    }.bind(this));
  } else {
    this.map.un('postcompose', this.postcomposeListener_);
    this.map.un('pointerdrag', this.onPointerDrag_.bind(this));
    this.getSetRotation(0);
  }
};


/**
 * Create the list of layouts, get the formats, get the first layout in
 * gmf print v3 capabilities and then update the print panel fields.
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.PrintController.prototype.parseCapabilities_ = function(resp) {
  var data = resp['data'];
  this.formats = data['formats'];
  this.layouts = data['layouts'];
  this.layout = data['layouts'][0];

  this.fields.layouts = [];
  this.layouts.forEach(function(layout) {
    this.fields.layouts.push(layout.name);
  }.bind(this));

  this.updateFields_();
};


/**
 * Update fields with the user values if there are always available in the
 * current layout otherwise use the defaults values of the layout.
 * If a field doesn't exist in the current layout, set it to undefined so the
 * view can hide it. Update also the paper size.
 * @private
 */
gmf.PrintController.prototype.updateFields_ = function() {
  this.fields.layout = this.layout.name;

  var mapInfo = this.isAttributeInCurrentLayout_('map');
  goog.asserts.assertObject(mapInfo);
  var clientInfo = mapInfo['clientInfo'];
  goog.asserts.assertObject(clientInfo);
  this.paperSize_ = [clientInfo['width'], clientInfo['height']];

  var title = this.isAttributeInCurrentLayout_('title');
  this.fields.title = title !== null ?
      this.fields.title || title['default'] : undefined;

  var comments = this.isAttributeInCurrentLayout_('comments');
  this.fields.comments = comments !== null ?
      this.fields.comments || comments['default'] : undefined;

  var debug = this.isAttributeInCurrentLayout_('debug');
  this.fields.debug = debug !== null ?
      this.fields.debug || debug['default'] : undefined;

  var legend = this.isAttributeInCurrentLayout_('legend');
  this.fields.legend = legend !== null ?
      this.fields.legend || true : undefined;

  this.fields.scales = clientInfo['scales'] || [];
  this.fields.dpis = clientInfo['dpiSuggestions'] || [];

  var mapSize = this.map.getSize();
  var viewResolution = this.map.getView().getResolution();
  this.fields.scale = this.getOptimalScale_(mapSize, viewResolution);

  this.fields.dpi =
      (this.fields.dpi && this.fields.dpis.indexOf(this.fields.dpi) > 0) ?
      this.fields.dpi : this.fields.dpis[0];
};


/**
 * Return a capabilities 'attribute' object correesponding to the given name.
 * @param {string} name Name of the attribute to get.
 * @return {Object|null} corresponding attribute or null.
 * @private
 */
gmf.PrintController.prototype.isAttributeInCurrentLayout_ = function(name) {
  var attr = null;
  this.layout.attributes.forEach(function(attribute) {
    if (attribute.name === name) {
      return attr = attribute;
    }
  });
  return attr;
};


/**
 * Getter setter to update or get the current rotation value. Param and result
 *     are in degree.
 * @param {number=} opt_rotation The optional new rotation value.
 * @return {number} The new value of rotation;
 * @export
 */
gmf.PrintController.prototype.getSetRotation = function(opt_rotation) {
  if (opt_rotation !== undefined) {
    var rotation = parseInt(opt_rotation, 10);
    if (rotation > 180) {
      rotation = -180;
    } else if (rotation < -180) {
      rotation = 180;
    }
    this.rotation = rotation;
    // Render the map to update the postcompose mask.
    this.map.render();
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
  var originalEvent = e.originalEvent;
  if (this.active && originalEvent.ctrlKey && originalEvent.shiftKey) {
    var center = this.map.getPixelFromCoordinate(this.map.getView().getCenter());
    var pixel = e.pixel;
    var timeStamp = originalEvent.timeStamp;
    // Reset previous position between two differents drag action.
    if (!this.onDragTimeStamp_ || timeStamp - this.onDragTimeStamp_ > 100) {
      this.onDragPreviousMousePosition_ = null;
    } else {
      // Calculate angle and sense of rotation.
      var p0x = this.onDragPreviousMousePosition_[0] - center[0];
      var p0y = this.onDragPreviousMousePosition_[1] - center[1];
      var p1x = pixel[0] - center[0];
      var p1y = pixel[1] - center[1];
      var centerToP0 = Math.sqrt(Math.pow(p0x, 2) + Math.pow(p0y, 2));
      var centerToP1 = Math.sqrt(Math.pow(p1x, 2) + Math.pow(p1y, 2));
      var sense = (p0x * p1y - p0y * p1x) > 0 ? 1 : -1;
      var angle = sense * Math.acos(
            (p0x * p1x + p0y * p1y) / (centerToP0 * centerToP1)
          );
      var boost = centerToP1 / 250;
      var increment = Math.round((angle * 180 / Math.PI) * boost);

      // Set rotation then update the view.
      this.getSetRotation(this.rotation + increment);
      this.$scope_.$digest();
    }
    // Keep a reference of the timeStamp and the position of this event.
    this.onDragTimeStamp_ = timeStamp;
    this.onDragPreviousMousePosition_ = pixel;
  }
};


/**
 * TODO
 * @export
 */
gmf.PrintController.prototype.print = function() {
  this.requestCanceler_ = this.$q_.defer();
  this.printState = 'Printing...';

  var mapSize = this.map.getSize();
  var viewResolution = this.map.getView().getResolution();
  var scale = this.getOptimalScale_(mapSize, viewResolution);

  var customAttributes = {
    'comments': this.fields.comments,
    'datasource': [],
    'debug': this.fields.debug,
    'lang': this.gettextCatalog_.currentLanguage,
    'rotation': this.rotation,
    'scale': this.fields.scale,
    'title': this.fields.title
  }

  if (this.fields.legend) {
    var legend = this.getLegend_(scale);
    if (legend !== null) {
      customAttributes['legend'] = this.getLegend_(scale);
    }
  }

  var spec = this.ngeoPrint_.createSpec(this.map, scale, this.fields.dpi,
      this.fields.layout, customAttributes);

  // Add feature overlay layer to print spec.
  var layers = [];
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
 * TODO
 * @export
 */
gmf.PrintController.prototype.cancel = function() {
  // Cancel the latest request, if it's not finished yet.
  goog.asserts.assert(!goog.isNull(this.requestCanceler_));
  this.requestCanceler_.resolve();

  // Cancel the status timeout if there's one set, to make sure no other
  // status request is sent.
  if (!goog.isNull(this.statusTimeoutPromise_)) {
    this.$timeout_.cancel(this.statusTimeoutPromise_);
  }

  goog.asserts.assert(this.curRef_.length > 0);

  this.ngeoPrint_.cancel(this.curRef_);

  this.resetPrintStates_();
};


/**
 * TODO
 * @param {string=} opt_printState the print state.
 * @private
 */
gmf.PrintController.prototype.resetPrintStates_ = function(opt_printState) {
  this.printState = opt_printState || '';
  this.curRef_ = '';
};


/**
 * @param {ol.Size} mapSize Size of the map on the screen (px).
 * @param {number} viewResolution Resolution of the map on the screen.
 * @return {number} The best scale. -1 is returned if there is no optimal
 *     scale, that is the optimal scale is lower than or equal to the first
 *     value in printMapScales.
 * @private
 */
gmf.PrintController.prototype.getOptimalScale_ = function(mapSize,
    viewResolution) {
  var scales = this.fields.scales.slice();
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
  var mfResp = /** @type {MapFishPrintReportResponse} */ (resp.data);
  var ref = mfResp.ref;
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
  var mfResp = /** @type {MapFishPrintStatusResponse} */ (resp.data);
  var done = mfResp.done;
  if (done) {
    // The report is ready. Open it by changing the window location.
    window.location.href = this.ngeoPrint_.getReportUrl(ref);
    this.resetPrintStates_();
  } else {
    // The report is not ready yet. Check again in 1s.
    var that = this;
    this.statusTimeoutPromise_ = this.$timeout_(function() {
      that.getStatus_(ref);
    }, 1000, false);
  }
};


/**
 * @param {!angular.$http.Response} resp Response.
 * @private
 */
gmf.PrintController.prototype.handleCreateReportError_ = function(resp) {
  this.resetPrintStates_('Print error');
};


/**
 * @param {number} scale The scale to get the legend (for wms layers only).
 * @return {Object?} Legend object for print report or null.
 * @private
 */
gmf.PrintController.prototype.getLegend_ = function(scale) {
  var dataLayerGroup = this.ngeoLayerHelper_.getGroupFromMap(this.map,
      gmf.DATALAYERGROUP_NAME);
  var layers = this.ngeoLayerHelper_.getFlatLayers(dataLayerGroup);
  var legend = {'classes': []};
  var classes, layerNames, layerName, icons;
  layers.reverse().forEach(function(layer) {
    classes = [];
    var source = layer.getSource();
    if (layer.getVisible() && source !== undefined) {
      if (layer instanceof ol.layer.Tile) {
        layerName = layer.get('layerName');
        icons = this.ngeoLayerHelper_.getWMTSLegendURL(layer);
        if (icons !== null) {
          classes.push({
            'name': layerName,
            'icons': [icons]
          });
        }
      } else {
        layerNames = source.getParams()['LAYERS'].split(',');
        layerNames.forEach(function(name) {
          icons = this.ngeoLayerHelper_.getWMSLegendURL(source.getUrl(), name,
              scale);
          if (icons !== null && name.length !== 0) {
            classes.push({
              'name': name,
              'icons': [icons]
            });
          }
        }.bind(this));
      }
    }
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
  var layout;
  this.layouts_.forEach(function(l) {
    if (l.name === layoutName) {
      layout = l;
      return true // break;
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
  var mapSize = this.map.getSize();
  var res = this.ngeoPrintUtils_.getOptimalResolution(mapSize, this.paperSize_,
        scale);
  this.fields.scale = scale;
  this.map.getView().setResolution(res);
};


/**
 * Set the print dpi value.
 * @param {number} dpi A dpi value as existing in the dpis list field.
 * @export
 */
gmf.PrintController.prototype.setDpi = function(dpi) {
  this.fields.dpi = dpi;
};


gmf.module.controller('GmfPrintController', gmf.PrintController);
