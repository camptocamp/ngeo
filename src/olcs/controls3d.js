/* global Cesium */

import angular from 'angular';
import * as olEasing from 'ol/easing.js';
import olcsCore from 'olcs/core.js';

/**
 * @type {!angular.IModule}
 * @hidden
 */
const module = angular.module('ngeoOlcsControls3d', []);

/**
 * @private
 * @hidden
 * @param {number} older Older
 * @param {number} newer Newer
 * @returns {boolean} ?
 */
function shouldUpdate(older, newer) {
  return Number.isFinite(newer) && (!Number.isFinite(older) || Math.abs(newer - older) > 0.05);
}

/**
 * @private
 * @hidden
 */
const Controller = class {
  /**
   * @ngInject
   * @param {!JQuery} $element The element
   * @param {import("ngeo/olcs/Service.js").OlcsService} ngeoOlcsService The ol-cesium service.
   */
  constructor($element, ngeoOlcsService) {
    /**
     * @type {!JQuery}
     * @private
     */
    this.element_ = $element;

    /**
     * @type {import('olcs/contrib/Manager.js').default}
     */
    this.ol3dm;

    /**
     * @type {number}
     */
    this.minTilt;

    /**
     * @type {number}
     * @private
     */
    this.maxTilt;

    /**
     * @type {JQuery}
     * @private
     */
    this.tiltRightEl_;

    /**
     * @type {JQuery}
     * @private
     */
    this.tiltLeftEl_;

    /**
     * @type {JQuery}
     * @private
     */
    this.rotation3dEl_;

    /**
     * @type {JQuery}
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

    /**
     * @type {import("ngeo/olcs/Service.js").OlcsService}
     * @private
     */
    this.olcsService_ = ngeoOlcsService;
  }

  updateWidget_() {
    const newRotation = this.ol3dm.getOl3d().getOlView().getRotation();
    if (shouldUpdate(this.previousRotation_, newRotation)) {
      this.rotateElement_(this.rotation3dEl_, newRotation);
      this.previousRotation_ = newRotation;
    }

    const newViewMatrix = this.ol3dm.getCesiumViewMatrix();
    // @ts-ignore: Cesium
    if (!Cesium.Matrix4.equalsEpsilon(this.previousViewMatrix_, newViewMatrix, 1e-5)) {
      const newTilt = this.ol3dm.getTiltOnGlobe(); // this is expensive!!
      if (Number.isFinite(newTilt || 0)) {
        // Workaround https://github.com/google/closure-compiler/pull/2712
        this.rotateElement_(this.angle3dEl_, newTilt);
        // @ts-ignore: Cesium
        this.previousViewMatrix_ = Cesium.Matrix4.clone(newViewMatrix);

        // if min or max tilt is reached, disable the tilting buttons
        const buffer = 0.01; // rad
        if (newTilt - this.minTilt < buffer) {
          this.tiltRightEl_.addClass('ngeo-right-inactive');
        } else if (this.tiltRightEl_.hasClass('ngeo-right-inactive')) {
          this.tiltRightEl_.removeClass('ngeo-right-inactive');
        }
        if (this.maxTilt - newTilt < buffer) {
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
    if (this.minTilt === undefined) {
      this.minTilt = 0;
    }
    if (this.maxTilt === undefined) {
      this.maxTilt = (7 * Math.PI) / 16;
    }
    if (!this.ol3dm) {
      this.ol3dm = this.olcsService_.getManager();
    }
    this.tiltRightEl_ = this.element_.find('.ngeo-tilt-right');
    this.tiltLeftEl_ = this.element_.find('.ngeo-tilt-left');
    this.rotation3dEl_ = this.element_.find('.ngeo-rotation3d');
    this.angle3dEl_ = this.element_.find('.ngeo-angle3d');
    this.updateWidget_();
  }

  /**
   * @param {JQuery} element Element to rotate.
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
      'transform': r,
    });
  }

  /**
   * @param {number} angle Angle in degrees.
   */
  rotate(angle) {
    // @ts-ignore: Cesium
    angle = Cesium.Math.toRadians(angle);
    this.ol3dm.setHeading(angle);
  }

  /**
   * @param {number} angle Angle in degrees.
   */
  tilt(angle) {
    // @ts-ignore: Cesium
    angle = Cesium.Math.toRadians(angle);
    const tiltOnGlobe = this.ol3dm.getTiltOnGlobe();
    if (tiltOnGlobe + angle < this.minTilt) {
      angle = this.minTilt - tiltOnGlobe;
    } else if (tiltOnGlobe + angle > this.maxTilt) {
      angle = this.maxTilt - tiltOnGlobe;
    }
    const scene = this.ol3dm.getCesiumScene();
    olcsCore.rotateAroundBottomCenter(scene, angle);
  }

  /**
   * @param {number} delta -1 to zoom out and 1 to zoom in.
   */
  zoom(delta) {
    const view = this.ol3dm.getOlView();
    const cur = view.getResolution();
    const newResolution = view.constrainResolution(cur, delta);
    if (view.getAnimating()) {
      view.cancelAnimations();
    }
    view.animate({
      resolution: newResolution,
      duration: 250,
      easing: olEasing.easeOut,
    });
  }
};

/**
 * @param {!angular.IAttributes} $attrs Attributes.
 * @param {!string} ngeoOlcsControls3dTemplateUrl Template function.
 * @return {string} Template URL.
 * @ngInject
 * @private
 * @hidden
 */
function ngeoOlcsControls3dTemplateUrlInjectable($attrs, ngeoOlcsControls3dTemplateUrl) {
  if (ngeoOlcsControls3dTemplateUrl) {
    return ngeoOlcsControls3dTemplateUrl;
  }
  const templateUrl = $attrs['ngeoOlcsControls3dTemplateUrl'];
  return templateUrl ? templateUrl : 'ngeo/olsc/controls3d';
}

module.run(
  /* @ngInject */ ($templateCache) => {
    // @ts-ignore: webpack
    $templateCache.put('ngeo/olsc/controls3d', require('./controls3d.html'));
  }
);

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
 * @type {!angular.IComponentOptions}
 * @ngdoc component
 * @ngname ngeoOlcsControls3d
 */
const olscControls3dComponent = {
  bindings: {
    'minTilt': '<?',
    'maxTilt': '<?',
    'ol3dm': '<?',
  },
  controller: Controller,
  templateUrl: ngeoOlcsControls3dTemplateUrlInjectable,
};

module.component('ngeoOlcsControls3d', olscControls3dComponent);

module.value('ngeoOlcsControls3dTemplateUrl', '');

export default module;
