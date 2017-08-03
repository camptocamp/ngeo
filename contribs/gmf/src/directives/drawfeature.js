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
goog.require('ol.interaction.TranslateEventType');


/**
 * Directive used to create, modify and delete vector features on a map with
 * the addition of changing their style.
 * Example:
 *
 *     <gmf-drawfeature
 *         gmf-drawfeature-active="ctrl.drawFeatureActive"
 *         gmf-drawfeature-map="::ctrl.map">
 *     </gmf-drawfeature>
 *
 * @htmlAttribute {boolean} gmf-drawfeature-active Whether the directive is
 *     active or not.
 * @htmlAttribute {ol.Map} gmf-drawfeature-map The map.
 * @return {angular.Directive} The directive specs.
 * @ngInject
 * @ngdoc directive
 * @ngname gmfDrawfeature
 */
gmf.drawfeatureDirective = function() {
  return {
    controller: 'GmfDrawfeatureController as efCtrl',
    scope: {
      'active': '=gmfDrawfeatureActive',
      'map': '<gmfDrawfeatureMap'
    },
    bindToController: true,
    templateUrl: `${gmf.baseTemplateUrl}/drawfeature.html`
  };
};

gmf.module.directive('gmfDrawfeature', gmf.drawfeatureDirective);


/**
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!angular.$timeout} $timeout Angular timeout service.
 * @param {!angularGettext.Catalog} gettextCatalog Gettext catalog.
 * @param {!ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
 *     interaction service.
 * @param {!ngeo.FeatureHelper} ngeoFeatureHelper Ngeo feature helper service.
 * @param {!ol.Collection.<!ol.Feature>} ngeoFeatures Collection of features.
 * @param {!ngeo.ToolActivateMgr} ngeoToolActivateMgr Ngeo ToolActivate manager
 *     service.
 * @constructor
 * @private
 * @ngInject
 * @ngdoc controller
 * @ngname GmfDrawfeatureController
 */
gmf.DrawfeatureController = function($scope, $timeout, gettextCatalog, ngeoDecorateInteraction,
  ngeoFeatureHelper, ngeoFeatures, ngeoToolActivateMgr) {

  /**
   * @type {!ol.Map}
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
   * @type {!ngeo.ToolActivate}
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
   * @type {!ngeo.ToolActivate}
   * @export
   */
  this.mapSelectToolActivate = new ngeo.ToolActivate(this, 'mapSelectActive');

  /**
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  /**
   * @type {!angular.$timeout}
   * @private
   */
  this.timeout_ = $timeout;

  /**
   * @type {!ngeo.DecorateInteraction}
   * @private
   */
  this.ngeoDecorateInteraction_ = ngeoDecorateInteraction;

  /**
   * @type {!ngeo.FeatureHelper}
   * @private
   */
  this.featureHelper_ = ngeoFeatureHelper;

  /**
   * @type {!ol.Collection.<!ol.Feature>}
   * @export
   */
  this.features = ngeoFeatures;

  /**
   * @type {!ngeo.ToolActivateMgr}
   * @private
   */
  this.ngeoToolActivateMgr_ = ngeoToolActivateMgr;

  /**
   * @type {?ol.Feature}
   * @export
   */
  this.selectedFeature = null;

  /**
   * @type {!ol.Collection.<!ol.Feature>}
   * @export
   */
  this.selectedFeatures = new ol.Collection();


  /**
   * @type {!ol.Collection}
   * @private
   */
  this.interactions_ = new ol.Collection();

  /**
   * @type {!ngeo.interaction.Modify}
   * @private
   */
  this.modify_ = new ngeo.interaction.Modify({
    features: this.selectedFeatures,
    style: ngeoFeatureHelper.getVertexStyle(false)
  });
  this.interactions_.push(this.modify_);

  /**
   * @type {?ngeo.Menu}
   * @private
   */
  this.menu_ = null;

  /**
   * @type {!ngeo.ToolActivate}
   * @export
   */
  this.modifyToolActivate = new ngeo.ToolActivate(this.modify_, 'active');

  /**
   * @type {!ngeo.interaction.Translate}
   * @private
   */
  this.translate_ = new ngeo.interaction.Translate({
    features: this.selectedFeatures,
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
  this.interactions_.push(this.translate_);

  /**
   * @type {!ngeo.interaction.Rotate}
   * @private
   */
  this.rotate_ = new ngeo.interaction.Rotate({
    features: this.selectedFeatures,
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
  this.interactions_.push(this.rotate_);

  this.initializeInteractions_();

  /**
   * @type {!ngeo.ToolActivate}
   * @export
   */
  this.rotateToolActivate = new ngeo.ToolActivate(this.rotate_, 'active');

  /**
   * @type {!ngeo.ToolActivate}
   * @export
   */
  this.translateToolActivate = new ngeo.ToolActivate(this.translate_, 'active');

  /**
   * @type {!Array.<!ol.EventsKey>}
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
    () => this.active,
    this.handleActiveChange_.bind(this)
  );

  $scope.$watch(
    () => this.drawActive,
    (active) => {
      if (active) {
        this.selectedFeature = null;
      }
    }
  );

  $scope.$watch(
    () => this.selectedFeature,
    (newFeature, previousFeature) => {
      this.selectedFeatures.clear();
      if (previousFeature) {
        this.featureHelper_.setStyle(previousFeature);
        this.unregisterInteractions_();
      }
      if (newFeature) {
        this.featureHelper_.setStyle(newFeature, true);
        this.selectedFeatures.push(newFeature);
        this.registerInteractions_();
        if (this.listSelectionInProgress_) {
          this.featureHelper_.panMapToFeature(newFeature, this.map);
          this.listSelectionInProgress_ = false;
        }
      } else if (this.menu_) {
        this.map.removeOverlay(this.menu_);
        this.menu_ = null;
      }
    }
  );

  $scope.$watch(
    () => this.mapSelectActive,
    this.handleMapSelectActiveChange_.bind(this)
  );

  /**
   * @type {string}
   * @export
   */
  this.nameProperty = ngeo.FeatureProperties.NAME;

  /**
   * @private
   */
  this.gettextCatalog_ = gettextCatalog;
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
 * Initialize interactions by setting them inactive and decorating them
 * @private
 */
gmf.DrawfeatureController.prototype.initializeInteractions_ = function() {
  this.interactions_.forEach(function(interaction) {
    interaction.setActive(false);
    this.ngeoDecorateInteraction_(interaction);
  }, this);
};


/**
 * Register interactions by adding them to the map
 * @private
 */
gmf.DrawfeatureController.prototype.registerInteractions_ = function() {
  this.interactions_.forEach(function(interaction) {
    this.map.addInteraction(interaction);
  }, this);
};


/**
 * Register interactions by removing them to the map
 * @private
 */
gmf.DrawfeatureController.prototype.unregisterInteractions_ = function() {
  this.interactions_.forEach(function(interaction) {
    this.map.removeInteraction(interaction);
  }, this);
};


/**
 * Called when the active property of the this directive changes. Manage
 * the activation/deactivation accordingly (event management, etc.)
 * @param {boolean} active Whether the directive is active or not.
 * @private
 */
gmf.DrawfeatureController.prototype.handleActiveChange_ = function(active) {

  const keys = this.listenerKeys_;
  const drawUid = ['draw-', ol.getUid(this)].join('-');
  const otherUid = ['other-', ol.getUid(this)].join('-');
  const toolMgr = this.ngeoToolActivateMgr_;

  if (active) {
    // when activated

    keys.push(ol.events.listen(this.features, ol.CollectionEventType.ADD,
      this.handleFeaturesAdd_, this));
    keys.push(ol.events.listen(this.features, ol.CollectionEventType.REMOVE,
      this.handleFeaturesRemove_, this));

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

    keys.forEach((key) => {
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

    if (this.menu_) {
      this.map.removeOverlay(this.menu_);
      this.menu_ = null;
    }
  }

};


/**
 * Method called when a selection occurs from the list, i.e. when an item in
 * the list of features is clicked. Called from the template, so no need to
 * update Angular's scope.
 * @param {!ol.Feature} feature Feature to select.
 * @export
 */
gmf.DrawfeatureController.prototype.selectFeatureFromList = function(feature) {
  this.listSelectionInProgress_ = true;
  this.selectedFeature = feature;
  this.drawActive = false;
};


/**
 * @return {!Array.<!ol.Feature>} Array.
 * @export
 */
gmf.DrawfeatureController.prototype.getFeaturesArray = function() {
  return this.features.getArray();
};


/**
 * @export
 */
gmf.DrawfeatureController.prototype.clearFeatures = function() {
  const gettextCatalog = this.gettextCatalog_;
  const msg = gettextCatalog.getString(
    'Do you really want to delete all the features?');
  if (confirm(msg)) {
    this.features.clear();
  }
};


/**
 * @param {!ol.Feature} feature The feature to remove from the selection.
 * @export
 */
gmf.DrawfeatureController.prototype.removeFeature = function(feature) {
  const gettextCatalog = this.gettextCatalog_;
  const msg = gettextCatalog.getString(
    'Do you really want to delete the selected feature?');
  if (confirm(msg)) {
    this.features.remove(feature);
  }
};


/**
 * @param {!ol.Collection.Event} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleFeaturesAdd_ = function(evt) {
  // timeout to prevent double-click to zoom the map
  this.timeout_(() => {
    this.selectedFeature = /** @type {ol.Feature} */ (evt.element);
    this.drawActive = false;
    this.scope_.$apply();
  });
};


/**
 * @param {!ol.Collection.Event} evt Event.
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

  const mapDiv = this.map.getViewport();
  goog.asserts.assertElement(mapDiv);

  if (active) {
    ol.events.listen(this.map, ol.MapBrowserEventType.CLICK,
      this.handleMapClick_, this);

    goog.events.listen(mapDiv, 'contextmenu',
      this.handleMapContextMenu_, false, this);

    goog.events.listen(mapDiv, 'touchstart',
      this.handleMapTouchStart_, false, this);

    goog.events.listen(mapDiv, 'touchmove',
      this.handleMapTouchEnd_, false, this);

    goog.events.listen(mapDiv, 'touchend',
      this.handleMapTouchEnd_, false, this);

  } else {
    ol.events.unlisten(this.map, ol.MapBrowserEventType.CLICK,
      this.handleMapClick_, this);

    goog.events.unlisten(mapDiv, 'contextmenu',
      this.handleMapContextMenu_, false, this);

    goog.events.unlisten(mapDiv, 'touchstart',
      this.handleMapTouchStart_, false, this);

    goog.events.unlisten(mapDiv, 'touchmove',
      this.handleMapTouchEnd_, false, this);

    goog.events.unlisten(mapDiv, 'touchend',
      this.handleMapTouchEnd_, false, this);
  }
};


/**
 * @param {!ol.MapBrowserEvent} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleMapClick_ = function(evt) {

  const pixel = evt.pixel;

  let feature = this.map.forEachFeatureAtPixel(
    pixel,
    (feature) => {
      let ret = false;
      if (ol.array.includes(this.features.getArray(), feature)) {
        ret = feature;
      }
      return ret;
    },
    {
      hitTolerance: 5
    }
  );

  feature = feature ? feature : null;

  // do not do any further action if feature is null or already selected
  if (feature === this.selectedFeature) {
    return;
  }

  this.selectedFeature = feature;

  this.scope_.$apply();
};


/**
 * @param {!Event} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleMapTouchStart_ = function(evt) {
  this.longPressTimeout_ = setTimeout(() => {
    this.handleMapContextMenu_(evt);
  }, 500);
};


/**
 * @param {!Event} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleMapTouchEnd_ = function(evt) {
  clearTimeout(this.longPressTimeout_);
};


/**
 * @param {!Event} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleMapContextMenu_ = function(evt) {
  const gettextCatalog = this.gettextCatalog_;
  const pixel = this.map.getEventPixel(evt);
  const coordinate = this.map.getCoordinateFromPixel(pixel);

  let feature = this.map.forEachFeatureAtPixel(
    pixel,
    (feature) => {
      let ret = false;
      if (ol.array.includes(this.features.getArray(), feature)) {
        ret = feature;
      }
      return ret;
    },
    {
      hitTolerance: 7
    }
  );

  feature = feature ? feature : null;

  // show contextual menu when clicking on certain types of features
  if (feature) {
    let actions = [];

    const type = this.featureHelper_.getType(feature);
    if (type == ngeo.GeometryType.CIRCLE ||
        type == ngeo.GeometryType.LINE_STRING ||
        type == ngeo.GeometryType.POLYGON ||
        type == ngeo.GeometryType.RECTANGLE) {
      actions = actions.concat([{
        cls: 'fa fa-arrows',
        label: gettextCatalog.getString('Move'),
        name: gmf.DrawfeatureController.MenuActionType.MOVE
      }, {
        cls: 'fa fa-rotate-right',
        label: gettextCatalog.getString('Rotate'),
        name: gmf.DrawfeatureController.MenuActionType.ROTATE
      }]);
    }

    actions = actions.concat([{
      cls: 'fa fa-trash-o',
      label: gettextCatalog.getString('Delete'),
      name: gmf.DrawfeatureController.MenuActionType.DELETE
    }]);

    this.menu_ = new ngeo.Menu({
      actions
    });

    ol.events.listen(this.menu_, ngeo.MenuEventType.ACTION_CLICK,
      this.handleMenuActionClick_, this);
    this.map.addOverlay(this.menu_);

    this.menu_.open(coordinate);

    evt.preventDefault();
    evt.stopPropagation();
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
 * @param {!ngeo.MenuEvent} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleMenuActionClick_ = function(evt) {
  const action = evt.action;

  switch (action) {
    case gmf.DrawfeatureController.MenuActionType.DELETE:
      goog.asserts.assert(
        this.selectedFeature, 'Selected feature should be truthy');
      this.removeFeature(this.selectedFeature);
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
      console.log(`FIXME - support: ${action}`);
      break;
  }
};


/**
 * @param {!ol.interaction.Translate.Event} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleTranslateEnd_ = function(evt) {
  this.translate_.setActive(false);
  this.scope_.$apply();
};


/**
 * @param {!ngeo.RotateEvent} evt Event.
 * @private
 */
gmf.DrawfeatureController.prototype.handleRotateEnd_ = function(evt) {
  this.rotate_.setActive(false);
  this.scope_.$apply();
};


gmf.module.controller('GmfDrawfeatureController', gmf.DrawfeatureController);
