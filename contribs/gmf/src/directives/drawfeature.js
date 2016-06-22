goog.provide('gmf.DrawfeatureController');
goog.provide('gmf.drawfeatureDirective');

goog.require('gmf');
/** @suppress {extraRequire} */
goog.require('gmf.featurestyleDirective');
goog.require('ngeo.Menu');
goog.require('ngeo.ToolActivate');
goog.require('ngeo.ToolActivateMgr');
/** @suppress {extraRequire} */
goog.require('ngeo.btngroupDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.drawfeatureDirective');
/** @suppress {extraRequire} */
goog.require('ngeo.exportfeaturesDirective');
goog.require('ngeo.interaction.Modify');
goog.require('ngeo.interaction.Rotate');
goog.require('ngeo.interaction.Translate');
goog.require('ol.Collection');
goog.require('ol.style.Fill');
goog.require('ol.style.Style');
goog.require('ol.style.Text');


/**
 * Directive used to create, modify and delete vector features on a map with
 * the addition of changing their style.
 * Example:
 *
 *     <gmf-drawfeature
 *         gmf-drawfeature-active="ctrl.drawFeatureActive"
 *         gmf-drawfeature-layer="::ctrl.vectorLayer"
 *         gmf-drawfeature-map="::ctrl.map">
 *     </gmf-drawfeature>
 *
 * @htmlAttribute {boolean} gmf-drawfeature-active Whether the directive is
 *     active or not.
 * @htmlAttribute {ol.layer.Vector} gmf-drawfeature-layer The vector layer.
 * @htmlAttribute {ol.Map} gmf-drawfeature-map The map.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfDrawfeature
 */
gmf.drawfeatureDirective = function() {
  return {
    controller: 'GmfDrawfeatureController',
    scope: {
      'active': '=gmfDrawfeatureActive',
      'layer': '<gmfDrawfeatureLayer',
      'map': '<gmfDrawfeatureMap'
    },
    bindToController: true,
    controllerAs: 'efCtrl',
    templateUrl: gmf.baseTemplateUrl + '/drawfeature.html'
  };
};

gmf.module.directive('gmfDrawfeature', gmf.drawfeatureDirective);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {angular.$timeout} $timeout Angular timeout service.
 * @param {angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @param {ngeo.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {ol.Collection.<ol.Feature>} ngeoFeatures Collection of features.
 * @param {ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDrawfeatureController
 */
gmf.DrawfeatureController = function($scope, $timeout, gettextCatalog,
    ngeoDecorateInteraction, ngeoFeatureHelper, ngeoFeatures,
    ngeoToolActivateMgr) {

  /**
   * @type {ol.layer.Vector}
   * @export
   */
  this.layer;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map;

  /**
   * @type {boolean}
   * @export
   */
  this.active;

  if (this.active === undefined) {
    this.active = false;
  }

  /**
   * @type {boolean}
   * @export
   */
  this.drawActive = false;

 /**
   * @type {ngeo.ToolActivate}
   * @export
   */
  this.drawToolActivate = new ngeo.ToolActivate(this, 'drawActive');

  /**
   * @type {boolean}
   * @export
   */
  this.mapSelectActive = true;

  /**
   * @type {number?}
   * @private
   */
  this.longPressTimeout_ = null;

  /**
   * @type {ngeo.ToolActivate}
   * @export
   */
  this.mapSelectToolActivate = new ngeo.ToolActivate(this, 'mapSelectActive');

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {angular.$timeout}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {ngeo.DecorateInteraction}
   * @private
   */
  this.ngeoDecorateInteraction_ = ngeoDecorateInteraction;

  /**
   * @type {ngeo.FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  this.features = ngeoFeatures;

  /**
   * @type {ngeo.ToolActivateMgr}
   * @private
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

  /**
   * @type {?ol.Feature}
   * @export
   */
  this.selectedFeature = null;

  /**
   * @type {ol.Collection.<ol.Feature>}
   * @export
   */
  this.selectedFeatures = new ol.Collection();

  /**
   * @type {ngeo.interaction.Modify}
   * @private
   */
  this.modify_ = new ngeo.interaction.Modify({
    features: this.selectedFeatures,
    style: ngeoFeatureHelper.getVertexStyle(false)
  });
  this.registerInteraction_(this.modify_);

  /**
   * @type {ngeo.Menu}
   * @private
   */
  this.menu_ = new ngeo.Menu({
    actions: [{
      cls: 'fa fa-arrows',
      label: gettextCatalog.getString('Move'),
      name: gmf.DrawfeatureController.MenuActionType.MOVE
    }, {
      cls: 'fa fa-rotate-right',
      label: gettextCatalog.getString('Rotate'),
      name: gmf.DrawfeatureController.MenuActionType.ROTATE
    }, {
      cls: 'fa fa-trash-o',
      label: gettextCatalog.getString('Delete'),
      name: gmf.DrawfeatureController.MenuActionType.DELETE
    }]
  });
  this.map.addOverlay(this.menu_);

  /**
   * @type {ngeo.ToolActivate}
   * @export
   */
  this.modifyToolActivate = new ngeo.ToolActivate(this.modify_, 'active');

  /**
   * @type {ngeo.interaction.Translate}
   * @private
   */
  this.translate_ = new ngeo.interaction.Translate({
    features: this.selectedFeatures,
    layers: [this.layer],
    style: new ol.style.Style({
      text: new ol.style.Text({
        text: '\uf047',
        font: 'normal 18px FontAwesome',
        fill: new ol.style.Fill({
          color: '#7a7a7a'
        })
      })
    })
  });
  this.registerInteraction_(this.translate_);

  /**
   * @type {ngeo.interaction.Rotate}
   * @private
   */
  this.rotate_ = new ngeo.interaction.Rotate({
    features: this.selectedFeatures,
    layers: [this.layer],
    style: new ol.style.Style({
      text: new ol.style.Text({
        text: '\uf01e',
        font: 'normal 18px FontAwesome',
        fill: new ol.style.Fill({
          color: '#7a7a7a'
        })
      })
    })
  });
  this.registerInteraction_(this.rotate_);

  /**
   * @type {ngeo.ToolActivate}
   * @export
   */
  this.rotateToolActivate = new ngeo.ToolActivate(this.rotate_, 'active');

  /**
   * @type {ngeo.ToolActivate}
   * @export
   */
  this.translateToolActivate = new ngeo.ToolActivate(this.translate_, 'active');

  /**
   * @type {Array.<ol.EventsKey>}
   * @private
   */
  this.listenerKeys_ = [];

  /**
   * Flag used to determine whether the selection of a feature was made
   * from the selection of an item from the list or not (the map, contextual
   * menu, etc.)
   * @type {boolean}
   * @private
   */
  this.listSelectionInProgress_ = false;

  $scope.$watch(
    function() {
      return this.active;
    }.bind(this),
    this.handleActiveChange_.bind(this)
  );

  $scope.$watch(
    function() {
      return this.drawActive;
    }.bind(this),
    function(active) {
      if (active) {
        this.selectedFeature = null;
      }
    }.bind(this)
  );

  $scope.$watch(
    function() {
      return this.selectedFeature;
    }.bind(this),
    function(newFeature, previousFeature) {
      if (previousFeature) {
        this.featureHelper_.setStyle(previousFeature);
        this.selectedFeatures.clear();
      }
      if (newFeature) {
        this.featureHelper_.setStyle(newFeature, true);
        this.selectedFeatures.push(newFeature);
        if (this.listSelectionInProgress_) {
          this.featureHelper_.panMapToFeature(newFeature, this.map);
          this.listSelectionInProgress_ = false;
        }
      } else {
        this.menu_.close();
      }
    }.bind(this)
  );

  $scope.$watch(
    function() {
      return this.mapSelectActive;
    }.bind(this),
    this.handleMapSelectActiveChange_.bind(this)
  );

  /**
   * @type {string}
   * @export
   */
  this.nameProperty = ngeo.FeatureProperties.NAME;

};


/**
 * @enum {string}
 */
gmf.DrawfeatureController.MenuActionType = {
  DELETE: 'delete',
  MOVE: 'move',
  ROTATE: 'rotate'
};


/**
 * Register an interaction by setting it inactive, decorating it and adding it
 * to the map
 * @param {ol.interaction.Interaction} interaction Interaction to register.
 * @private
 */
gmf.DrawfeatureController.prototype.registerInteraction_ = function(
    interaction) {
  interaction.setActive(false);
  this.ngeoDecorateInteraction_(interaction);
  this.map.addInteraction(interaction);
};


/**
 * Called when the active property of the this directive changes. Manage
 * the activation/deactivation accordingly (event management, etc.)
 * @param {boolean} active Whether the directive is active or not.
 * @private
 */
gmf.DrawfeatureController.prototype.handleActiveChange_ = function(active) {

  var keys = this.listenerKeys_;
  var drawUid = ['draw-', goog.getUid(this)].join('-');
  var otherUid = ['other-', goog.getUid(this)].join('-');
  var toolMgr = this.ngeoToolActivateMgr_;

  if (active) {
    // when activated

    keys.push(ol.events.listen(this.features, ol.CollectionEventType.ADD,
        this.handleFeaturesAdd_, this));
    keys.push(ol.events.listen(this.features, ol.CollectionEventType.REMOVE,
        this.handleFeaturesRemove_, this));

    keys.push(ol.events.listen(this.menu_, ngeo.MenuEventType.ACTION_CLICK,
        this.handleMenuActionClick_, this));

    keys.push(ol.events.listen(this.translate_,
        ol.interaction.TranslateEventType.TRANSLATEEND,
        this.handleTranslateEnd_, this));

    keys.push(ol.events.listen(this.rotate_,
        ngeo.RotateEventType.ROTATEEND,
        this.handleRotateEnd_, this));

    toolMgr.registerTool(drawUid, this.drawToolActivate, false);
    toolMgr.registerTool(drawUid, this.mapSelectToolActivate, true);

    toolMgr.registerTool(otherUid, this.drawToolActivate, false);
    toolMgr.registerTool(otherUid, this.modifyToolActivate, true);
    toolMgr.registerTool(otherUid, this.translateToolActivate, false);
    toolMgr.registerTool(otherUid, this.rotateToolActivate, false);

    this.mapSelectActive = true;
    this.modify_.setActive(true);
  } else {
    // when deactivated

    keys.forEach(function(key) {
      ol.events.unlistenByKey(key);
    }, this);

    toolMgr.unregisterTool(drawUid, this.drawToolActivate);
    toolMgr.unregisterTool(drawUid, this.mapSelectToolActivate);

    toolMgr.unregisterTool(otherUid, this.drawToolActivate);
    toolMgr.unregisterTool(otherUid, this.modifyToolActivate);
    toolMgr.unregisterTool(otherUid, this.translateToolActivate);
    toolMgr.unregisterTool(otherUid, this.rotateToolActivate);

    this.drawActive = false;
    this.modify_.setActive(false);
    this.mapSelectActive = false;
    this.selectedFeature = null;

    this.menu_.close();
  }

};


/**
 * Method called when a selection occurs from the list, i.e. when an item in
 * the list of features is clicked. Called from the template, so no need to
 * update Angular's scope.
 * @param {ol.Feature} feature Feature to select.
 * @export
 */
gmf.DrawfeatureController.prototype.selectFeatureFromList = function(feature) {
  this.listSelectionInProgress_ = true;
  this.selectedFeature = feature;
};


/**
 * @return {!Array.<ol.Feature>} Array.
 * @export
 */
gmf.DrawfeatureController.prototype.getFeaturesArray = function() {
  return this.features.getArray();
};


/**
 * @export
 */
gmf.DrawfeatureController.prototype.clearFeatures = function() {
  this.features.clear();
};


/**
 * @param {ol.Feature} feature The feature to remove from the selection.
 * @export
 */
gmf.DrawfeatureController.prototype.removeFeature = function(feature) {
  this.features.remove(feature);
};


/**
 * @param {ol.CollectionEvent} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleFeaturesAdd_ = function(evt) {
  // timeout to prevent double-click to zoom the map
  this.timeout_(function() {
    this.selectedFeature = /** @type {ol.Feature} */ (evt.element);
    this.drawActive = false;
    this.scope_.$apply();
  }.bind(this));
};


/**
 * @param {ol.CollectionEvent} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleFeaturesRemove_ = function(evt) {
  this.selectedFeature = null;
};


/**
 * Called when the mapSelectActive property changes.
 * @param {boolean} active Whether the map select is active or not.
 * @private
 */
gmf.DrawfeatureController.prototype.handleMapSelectActiveChange_ = function(
    active) {

  var mapDiv = this.map.getTargetElement();
  goog.asserts.assertElement(mapDiv);

  if (active) {
    ol.events.listen(this.map, ol.MapBrowserEvent.EventType.CLICK,
        this.handleMapClick_, this);

    goog.events.listen(mapDiv, goog.events.EventType.CONTEXTMENU,
        this.handleMapContextMenu_, false, this);

    goog.events.listen(mapDiv, goog.events.EventType.TOUCHSTART,
        this.handleMapTouchStart_, false, this);

    goog.events.listen(mapDiv, goog.events.EventType.TOUCHMOVE,
        this.handleMapTouchEnd_, false, this);

    goog.events.listen(mapDiv, goog.events.EventType.TOUCHEND,
        this.handleMapTouchEnd_, false, this);

  } else {
    ol.events.unlisten(this.map, ol.MapBrowserEvent.EventType.CLICK,
        this.handleMapClick_, this);

    goog.events.unlisten(mapDiv, goog.events.EventType.CONTEXTMENU,
        this.handleMapContextMenu_, false, this);

    goog.events.unlisten(mapDiv, goog.events.EventType.TOUCHSTART,
        this.handleMapTouchStart_, false, this);

    goog.events.unlisten(mapDiv, goog.events.EventType.TOUCHMOVE,
        this.handleMapTouchEnd_, false, this);

    goog.events.unlisten(mapDiv, goog.events.EventType.TOUCHEND,
        this.handleMapTouchEnd_, false, this);
  }
};


/**
 * @param {ol.MapBrowserEvent} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleMapClick_ = function(evt) {

  var pixel = evt.pixel;

  var feature = this.map.forEachFeatureAtPixel(
    pixel,
    function(feature) {
      var ret = false;
      if (ol.array.includes(this.features.getArray(), feature)) {
        ret = feature;
      }
      return ret;
    }.bind(this),
    null,
    function(layer) {
      return layer === this.layer;
    }.bind(this)
  );

  feature = feature ? feature : null;

  // do not do any further action if feature is null or already selected
  if (feature === this.selectedFeature) {
    return;
  }

  this.modify_.setActive(true);

  this.selectedFeature = feature;

  this.scope_.$apply();
};


/**
 * @param {Event} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleMapTouchStart_ = function(evt) {
  this.longPressTimeout_ = setTimeout(
      goog.partial(this.handleMapContextMenu_.bind(this), evt),
      500);
};


/**
 * @param {Event} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleMapTouchEnd_ = function(evt) {
  clearTimeout(this.longPressTimeout_);
};


/**
 * @param {Event} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleMapContextMenu_ = function(evt) {
  var pixel = this.map.getEventPixel(evt);
  var coordinate = this.map.getCoordinateFromPixel(pixel);

  var feature = this.map.forEachFeatureAtPixel(
    pixel,
    function(feature) {
      var ret = false;
      if (ol.array.includes(this.features.getArray(), feature)) {
        ret = feature;
      }
      return ret;
    }.bind(this),
    null,
    function(layer) {
      return layer === this.layer;
    }.bind(this)
  );

  feature = feature ? feature : null;

  // show contextual menu when clicking on certain types of features
  if (feature) {
    var supportedTypes = [
      ngeo.GeometryType.CIRCLE,
      ngeo.GeometryType.LINE_STRING,
      ngeo.GeometryType.POLYGON,
      ngeo.GeometryType.RECTANGLE
    ];
    var type = this.featureHelper_.getType(feature);
    if (ol.array.includes(supportedTypes, type)) {
      this.menu_.open(coordinate);
    }

    evt.preventDefault();
  }

  // do not do any further action if feature is null or already selected
  if (feature === this.selectedFeature) {
    return;
  }

  this.modify_.setActive(true);

  this.selectedFeature = feature;

  this.scope_.$apply();
};


/**
 * @param {ngeo.MenuEvent} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleMenuActionClick_ = function(evt) {
  var action = evt.action;

  switch (action) {
    case gmf.DrawfeatureController.MenuActionType.DELETE:
      goog.asserts.assert(
          this.selectedFeature, 'Selected feature should be truthy');
      this.features.remove(this.selectedFeature);
      this.scope_.$apply();
      break;
    case gmf.DrawfeatureController.MenuActionType.MOVE:
      this.translate_.setActive(true);
      this.scope_.$apply();
      break;
    case gmf.DrawfeatureController.MenuActionType.ROTATE:
      this.rotate_.setActive(true);
      this.scope_.$apply();
      break;
    default:
      // FIXME
      console.log('FIXME - support: ' + action);
      break;
  }
};


/**
 * @param {ol.interaction.TranslateEvent} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleTranslateEnd_ = function(evt) {
  this.translate_.setActive(false);
  this.scope_.$apply();
};


/**
 * @param {ngeo.RotateEvent} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleRotateEnd_ = function(evt) {
  this.rotate_.setActive(false);
  this.scope_.$apply();
};


gmf.module.controller('GmfDrawfeatureController', gmf.DrawfeatureController);
