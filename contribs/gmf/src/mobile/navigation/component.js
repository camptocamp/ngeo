// The MIT License (MIT)
//
// Copyright (c) 2015-2020 Camptocamp SA
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

/**
 * @type {angular.IModule}
 * @hidden
 */
const module = angular.module('gmfMobileNav', []);

/**
 * CSS class names toggled by the controller.
 * @enum {string}
 * @hidden
 */
const CLASS_NAMES = {
  ACTIVE: 'gmf-mobile-nav-active',
  BACK: 'gmf-mobile-nav-back',
  GO_BACK: 'gmf-mobile-nav-go-back',
  SLIDE: 'gmf-mobile-nav-slide',
  SLIDE_OUT: 'gmf-mobile-nav-slide-out',
};

/**
 * An "gmf-mobile-nav" directive defining the behavior of a tree-structured menu.
 *
 * The directive is to be placed on a `nav` element, with the following
 * structure:
 * <nav gmf-mobile-nav>
 *   <header>
 *     <a class="gmf-mobile-nav-go-back" href="#"></a>
 *   </header>
 *   <div class="gmf-mobile-nav-active gmf-mobile-nav-slide">
 *     <ul>
 *       <li>
 *         <a href data-target="#devices">Devices</a>
 *       </li>
 *       <li>
 *         <a href data-target="#vehicles">Vehicles</a>
 *       </li>
 *     </ul>
 *   </div>
 *   <div id="devices" class="gmf-mobile-nav-slide" data-header-title="Devices">
 *     <ul>
 *       <li>Mobile Phones</li>
 *       <li>Televisions</li>
 *     </ul>
 *   </div>
 *   <div id="vehicles" class="gmf-mobile-nav-slide" data-header-title="Vehicles">
 *     <ul>
 *       <li>Cars</li>
 *       <li>Planes</li>
 *       <li>Bicycles</li>
 *     </ul>
 *   </div>
 * </nav>
 *
 * When an element slides in the directive changes the text in the header.
 *
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 */
function mobileNavigationComponent() {
  return {
    restrict: 'A',
    controller: 'gmfMobileNavController as navCtrl',
    bindToController: true,
    scope: true,
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {angular.IController=} navCtrl Controller.
     */
    link: (scope, element, attrs, navCtrl) => {
      if (!navCtrl) {
        throw new Error('Missing navCtrl');
      }
      navCtrl.init(element);
    },
  };
}

module.directive('gmfMobileNav', mobileNavigationComponent);

/**
 * @constructor
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname gmfMobileNavController
 */
export function Controller() {
  /**
   * Stack of slid-in items.
   * @type {JQuery[]}
   */
  this.slid_ = [];

  /**
   * Currently active sliding box.
   * @type {?JQuery}
   */
  this.active_ = null;

  /**
   * The navigation header.
   * @type {?JQuery}
   */
  this.header_ = null;

  /**
   * The back button in the navigation header.
   * @type {?JQuery}
   */
  this.backButton_ = null;

  /**
   * Export the back function already bound to `this`. This makes sure that
   * the function is called on the right context, when it is passed to an
   * attribute in a template
   */
  this.back = this.back_.bind(this);
}

module.controller('gmfMobileNavController', Controller);

/**
 * Initialize the directive with the linked element.
 * @param {JQuery<HTMLElement>} element Element.
 */
Controller.prototype.init = function (element) {
  this.active_ = $(element.find(`.${CLASS_NAMES.ACTIVE}.${CLASS_NAMES.SLIDE}`));
  this.header_ = $(element.find('> header'));
  this.backButton_ = $(element.find(`header > .${CLASS_NAMES.GO_BACK}`));

  /**
   * Watch for clicks on "slide-in" elements
   * @param {JQuery.ClickEvent<unknown, unknown, JQuery<HTMLElement>, HTMLElement>} evt The event
   */
  const onClick = (evt) => {
    const slideOut = $(evt.currentTarget).parents(`.${CLASS_NAMES.SLIDE}`);
    if (slideOut.length != 1) {
      throw new Error('Wrong slideOut');
    }

    // push the item to the selected stack
    this.slid_.push(slideOut);

    // slide the "old" element out
    slideOut.addClass(CLASS_NAMES.SLIDE_OUT).removeClass(CLASS_NAMES.ACTIVE);

    // element to slide in
    const datatarget = $(evt.currentTarget).attr('data-target');
    if (!datatarget) {
      throw new Error('Missing datatarget');
    }
    const slideIn = $(datatarget);
    if (slideIn.length != 1) {
      throw new Error('Wrong slideIn');
    }

    // slide the "new" element in
    slideIn.addClass(CLASS_NAMES.ACTIVE);

    // update the navigation header
    this.updateNavigationHeader_(slideIn, false);

    this.active_ = slideIn;
  };
  element.find('[data-toggle=slide-in]').on({
    'click': onClick,
  });

  // watch for clicks on the header "go-back" link
  this.backButton_.click(this.back.bind(this));
};

/**
 * @param {JQuery} active The currently active sliding box.
 * @param {boolean} back Whether to move back.
 */
Controller.prototype.updateNavigationHeader_ = function (active, back) {
  if (!this.header_) {
    throw new Error('Missing header');
  }
  if (!this.backButton_) {
    throw new Error('Missing backButton');
  }
  this.header_.toggleClass(CLASS_NAMES.BACK, back);

  // remove any inactive nav
  this.header_.find(`nav:not(.${CLASS_NAMES.ACTIVE} +)`).remove();

  // deactivate the currently active nav
  this.header_
    .find(`nav.${CLASS_NAMES.ACTIVE}`)
    .removeClass(CLASS_NAMES.ACTIVE)
    .addClass(CLASS_NAMES.SLIDE_OUT);

  // show the back button when relevant
  this.backButton_.toggleClass(CLASS_NAMES.ACTIVE, this.slid_.length > 0);

  // create a new nav
  const nav = $('<nav>');
  nav.append(
    $('<span>', {
      text: active.attr('data-header-title'),
    })
  );
  this.header_.append(nav);

  // Delay the activation of the new navigation so that the previous
  // one is properly deactivated. This prevents weird animation
  // effects.
  window.setTimeout(() => {
    // fix for safari: the following 3 lines force that the position
    // of the newly inserted element is calculated.
    // see http://stackoverflow.com/a/3485654/119937
    nav.css('display', 'none');
    nav.offset();
    nav.css('display', '');

    window.setTimeout(() => {
      // fix: calling `position()` makes sure that the animation
      // is always run
      nav.position();
      nav.addClass(CLASS_NAMES.ACTIVE);
    }, 0);
  }, 0);
};

/**
 * Return to the previous slide.
 */
Controller.prototype.back_ = function () {
  if (!this.active_) {
    throw new Error('Missing active');
  }
  if (this.slid_.length <= 0) {
    return;
  }

  // slide active item to the right
  this.active_.removeClass(CLASS_NAMES.ACTIVE);

  // get the previously active item
  const slideBack = this.slid_.pop();
  if (!slideBack) {
    throw new Error('Missing slideBack');
  }

  // slide previous item to the right
  slideBack.addClass(CLASS_NAMES.ACTIVE).removeClass(CLASS_NAMES.SLIDE_OUT);

  // update the navigation header
  this.updateNavigationHeader_(slideBack, true);

  this.active_ = slideBack;
};

/**
 * Return to the previous slide if the given element is active.
 *
 * @param {Element} element The element to check.
 */
Controller.prototype.backIfActive = function (element) {
  if (this.active_ !== null && this.active_.is(element)) {
    this.back_();
  }
};

/**
 * A directive to be used in conjunction with {@link import("gmf/mobile/navigation.js").default.component}.
 * The directive can be set on a slide element of {@link import("gmf/mobile/navigation.js").default.component}
 * with an expression. When the value of the expression changes and becomes
 * true, the navigation returns to the previous slide, if the slide is
 * currently active.
 *
 * Example:
 *
 *    <nav class="gmf-mobile-nav-left" gmf-mobile-nav>
 *      ...
 *      <gmf-authentication class="gmf-mobile-nav-slide"
 *         gmf-mobile-nav-back="mainCtrl.gmfUser.username !== null">
 *      </gmf-authentication>
 *
 * If `mainCtrl.gmfUser.username` becomes true and the login-slide is currently
 * active, the navigation will go back to the last slide.
 *
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 */
function mobileNavigationBackComponent() {
  return {
    require: '^^gmfMobileNav',
    restrict: 'A',
    scope: false,
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {angular.IController=} navCtrl Controller.
     */
    link: (scope, element, attrs, navCtrl) => {
      scope.$watch(attrs.gmfMobileNavBack, (newVal, oldVal) => {
        if (!navCtrl) {
          throw new Error('Missing navCtrl');
        }
        if (newVal === true) {
          navCtrl.backIfActive(element[0]);
        }
      });
    },
  };
}

module.directive('gmfMobileNavBack', mobileNavigationBackComponent);

/**
 * A directive to be used in conjunction with {@link import("gmf/mobile/navigation.js").default.component}.
 * The directive can be set on a slide element of
 * {@link import("gmf/mobile/navigation.js").default.component}.
 * When the element is clicked, the navigation returns to the previous slide if
 * the slide is currently active.
 *
 * Example:
 *
 *    <nav class="gmf-mobile-nav-left" gmf-mobile-nav>
 *      ...
 *      <gmf-themeselector
 *         gmf-mobile-nav-back-on-click
 *         gmf-themeselector-currenttheme="mainCtrl.theme">
 *      </gmf-themeselector>
 *
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 */
function mobileNavigationBackOnClickComponent() {
  return {
    require: '^^gmfMobileNav',
    restrict: 'A',
    scope: false,
    /**
     * @param {angular.IScope} scope Scope.
     * @param {JQuery} element Element.
     * @param {angular.IAttributes} attrs Attributes.
     * @param {angular.IController=} navCtrl Controller.
     */
    link: (scope, element, attrs, navCtrl) => {
      element.on('click', () => {
        if (!navCtrl) {
          throw new Error('Missing navCtrl');
        }
        navCtrl.backIfActive(element[0]);
      });
    },
  };
}

module.directive('gmfMobileNavBackOnClick', mobileNavigationBackOnClickComponent);

export default module;
