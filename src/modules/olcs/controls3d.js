goog.module('ngeo.olcs.controls3d');
goog.module.declareLegacyNamespace();

goog.require('ol.easing');


function shouldUpdate(older, newer) {
  return Number.isFinite(newer) && (!Number.isFinite(older) || Math.abs(newer - older) > 0.05);
}


const Controller = class {

  /**
   * @ngInject
   * @param {!jQuery} $element The element
   * @param {ngeo.olcs.Service} ngeoOlcsService The ol-cesium service.
   */
  constructor($element, ngeoOlcsService) {

    /**
     * @type {jQuery}
     * @private
     */
    this.element_ = $element;

    /**
     * @type {olcs.contrib.Manager}
     * @private
     */
    this.manager_ = goog.asserts.assert(ngeoOlcsService.getManager());

    /**
     * @type {number}
     * @private
     */
    this.minTilt_ = ngeoOlcsService.getMinTilt();

    /**
     * @type {number}
     * @private
     */
    this.maxTilt_ = ngeoOlcsService.getMaxTilt();

    /**
     * @type {jQuery}
     * @private
     */
    this.tiltRightEl_;

    /**
     * @type {jQuery}
     * @private
     */
    this.tiltLeftEl_;

    /**
     * @type {jQuery}
     * @private
     */
    this.rotation3dEl_;

    /**
     * @type {jQuery}
     * @private
     */
    this.angle3dEl_;

    /**
     * @type {number}
     * @private
     */
    this.previousRotation_;

    /**
     * @type {Cesium.Matrix4}
     * @private
     */
    this.previousViewMatrix_;

    /**
     * @type {number}
     * @private
     */
    this.animationFrameRequestId_;
  }

  updateWidget_() {
    const newRotation = this.manager_.getOl3d().getOlView().getRotation();
    if (shouldUpdate(this.previousRotation_, newRotation)) {
      this.rotateElement_(this.rotation3dEl_, newRotation);
      this.previousRotation_ = newRotation;
    }

    const newViewMatrix = this.manager_.getCesiumViewMatrix();
    if (!Cesium.Matrix4.equalsEpsilon(this.previousViewMatrix_, newViewMatrix, 1e-5)) {
      const newTilt = this.manager_.getTiltOnGlobe(); // this is expensive!!
      if (Number.isFinite(newTilt || 0)) { // Workaround https://github.com/google/closure-compiler/pull/2712
        this.rotateElement_(this.angle3dEl_, newTilt);
        this.previousViewMatrix_ = Cesium.Matrix4.clone(newViewMatrix);

        // if min or max tilt is reached, disable the tilting buttons
        const buffer = 0.01; // rad
        if (newTilt - this.minTilt_ < buffer) {
          this.tiltRightEl_.addClass('ngeo-right-inactive');
        } else if (this.tiltRightEl_.hasClass('ngeo-right-inactive')) {
          this.tiltRightEl_.removeClass('ngeo-right-inactive');
        }
        if (this.maxTilt_ - newTilt < buffer) {
          this.tiltLeftEl_.addClass('ngeo-left-inactive');
        } else if (this.tiltLeftEl_.hasClass('ngeo-left-inactive')) {
          this.tiltLeftEl_.removeClass('ngeo-left-inactive');
        }
      }
    }

    this.animationFrameRequestId_ = requestAnimationFrame(() => this.updateWidget_());
  }

  $onDestroy() {
    if (this.animationFrameRequestId_) {
      cancelAnimationFrame(this.animationFrameRequestId_);
    }
  }

  $onInit() {
    this.tiltRightEl_ = this.element_.find('.ngeo-tilt-right');
    this.tiltLeftEl_ = this.element_.find('.ngeo-tilt-left');
    this.rotation3dEl_ = this.element_.find('.ngeo-rotation3d');
    this.angle3dEl_ = this.element_.find('.ngeo-angle3d');
    this.updateWidget_();
  }


  /**
   * @param {jQuery} element Element to rotate.
   * @param {(number|undefined)} angle Angle in radians
   * @private
   */
  rotateElement_(element, angle) {
    const r = `rotate(${angle}rad)`;
    element.css({
      '-moz-transform': r,
      '-webkit-transform': r,
      '-o-transform': r,
      '-ms-transform': r,
      'transform': r
    });
  }


  /**
   * @param {number} angle Angle in degrees.
   * @export
   */
  rotate(angle) {
    angle = Cesium.Math.toRadians(angle);
    this.manager_.setHeading(angle);
  }


  /**
   * @param {number} angle Angle in degrees.
   * @export
   */
  tilt(angle) {
    angle = Cesium.Math.toRadians(angle);
    const tiltOnGlobe = this.manager_.getTiltOnGlobe();
    if (tiltOnGlobe + angle < this.minTilt_) {
      angle = this.minTilt_ - tiltOnGlobe;
    } else if (tiltOnGlobe + angle > this.maxTilt_) {
      angle = this.maxTilt_ - tiltOnGlobe;
    }
    const scene = this.manager_.getCesiumScene();
    olcs.core.rotateAroundBottomCenter(scene, angle);
  }


  /**
   * @param {number} delta -1 to zoom out and 1 to zoom in.
   * @export
   */
  zoom(delta) {
    const view = this.manager_.getOlView();
    const cur = view.getResolution();
    const newResolution = view.constrainResolution(cur, delta);
    if (view.getAnimating()) {
      view.cancelAnimations();
    }
    view.animate({
      resolution: newResolution,
      duration: 250,
      easing: ol.easing.easeOut
    });
  }
};


ngeo.module.value('ngeoOlcsControls3dTemplateUrl',
  /**
   * @param {angular.JQLite} element Element.
   * @param {angular.Attributes} attrs Attributes.
   * @return {string} Template URL.
   */
  (element, attrs) => {
    const templateUrl = attrs['ngeoOlcsControls3dTemplateUrl'];
    return templateUrl !== undefined ? templateUrl :
      `${ngeo.baseModuleTemplateUrl}/olcs/controls3d.html`;
  });


/**
 * @param {!angular.JQLite} $element Element.
 * @param {!angular.Attributes} $attrs Attributes.
 * @param {!function(!angular.JQLite, !angular.Attributes): string} ngeoOlcsControls3dTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 */
function ngeoOlcsControls3dTemplateUrl($element, $attrs, ngeoOlcsControls3dTemplateUrl) {
  return ngeoOlcsControls3dTemplateUrl($element, $attrs);
}

/**
 * Provides the "ngeoOlcsControls3d" component, a widget for
 * controlling the 3D camera.
 *
 * Example:
 *
 *     <ngeo-olcs-controls3d ng-if="$ctrl.manager && $ctrl.manager.is3dEnabled()">
 *     </ngeo-olcs-controls3d>
 *
 * By default the directive uses "controls3d.html" as its templateUrl. This
 * can be changed by redefining the "ngeoOlcsControls3dTemplateUrl" value.
 *
 * See our live example: [../examples/simple3d.html](../examples/simple3d.html)
 *
 * @htmlAttribute {olcs.contrib.Manager} ngeo-olcs-manager The OL-Cesium manager.
 * @type {!angular.Component}
 * @ngdoc component
 * @ngname ngeoOlcsControls3d
 */
const component = {
  controller: Controller,
  templateUrl: ngeoOlcsControls3dTemplateUrl
};

const name = 'ngeoOlcsControls3d';
exports = angular.module(name, []).component(name, component);
