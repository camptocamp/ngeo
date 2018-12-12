/**
 * @module gmf.mobile.navigation.component
 */
import googAsserts from 'goog/asserts.js';
const exports = angular.module('gmfMobileNav', []);


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
exports.component_ = function() {
  return {
    restrict: 'A',
    controller: 'gmfMobileNavController as navCtrl',
    bindToController: true,
    scope: true,
    /**
     * @param {angular.IScope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @param {gmf.mobile.navigation.component.Controller_} navCtrl Controller.
     */
    link: (scope, element, attrs, navCtrl) => {
      navCtrl.init(element);
    }
  };
};

exports.directive('gmfMobileNav', exports.component_);


/**
* @constructor
* @private
* @ngInject
* @ngdoc controller
* @ngname gmfMobileNavController
*/
exports.Controller_ = function() {
  /**
   * Stack of slid-in items.
   * @private
   * @type {Array.<!jQuery>}
   */
  this.slid_ = [];

  /**
   * Currently active sliding box.
   * @private
   * @type {jQuery}
   */
  this.active_ = null;

  /**
   * The navigation header.
   * @private
   * @type {jQuery}
   */
  this.header_ = null;

  /**
   * The back button in the navigation header.
   * @private
   * @type {jQuery}
   */
  this.backButton_ = null;

  /**
   * Export the back function already bound to `this`. This makes sure that
   * the function is called on the right context, when it is passed to an
   * attribute in a template
   * @export
   */
  this.back = this.back_.bind(this);
};

exports.controller('gmfMobileNavController', exports.Controller_);


/**
 * Initialize the directive with the linked element.
 * @param {angular.JQLite} element Element.
 */
exports.Controller_.prototype.init = function(element) {
  const cls = exports.Controller_.ClassName_;
  this.active_ = $(element.find(`.${cls.ACTIVE}.${cls.SLIDE}`));
  this.header_ = $(element.find('> header'));
  this.backButton_ = $(element.find(`header > .${cls.GO_BACK}`));

  // watch for clicks on "slide-in" elements
  element.find('[data-toggle=slide-in]').on('click', (evt) => {

    const cls = exports.Controller_.ClassName_;

    // the element to slide out is the div.slide parent
    const slideOut = $(evt.currentTarget).parents(`.${cls.SLIDE}`);
    googAsserts.assert(slideOut.length === 1);

    // push the item to the selected stack
    this.slid_.push(slideOut);

    // slide the "old" element out
    slideOut.addClass(cls.SLIDE_OUT).removeClass(cls.ACTIVE);

    // element to slide in
    const slideIn = $($(evt.currentTarget).attr('data-target'));
    googAsserts.assert(slideIn.length === 1);

    // slide the "new" element in
    slideIn.addClass(cls.ACTIVE);

    // update the navigation header
    this.updateNavigationHeader_(slideIn, false);

    this.active_ = slideIn;
  });

  // watch for clicks on the header "go-back" link
  this.backButton_.click(this.back.bind(this));
};


/**
 * @param {!jQuery} active The currently active sliding box.
 * @param {boolean} back Whether to move back.
 * @private
 */
exports.Controller_.prototype.updateNavigationHeader_ = function(
  active, back) {
  const cls = exports.Controller_.ClassName_;
  this.header_.toggleClass(cls.BACK, back);

  // remove any inactive nav
  this.header_.find(`nav:not(.${cls.ACTIVE} +)`).remove();

  // deactivate the currently active nav
  this.header_.find(`nav.${cls.ACTIVE}`).removeClass(cls.ACTIVE)
    .addClass(cls.SLIDE_OUT);

  // show the back button when relevant
  this.backButton_.toggleClass(cls.ACTIVE, this.slid_.length > 0);

  // create a new nav
  const nav = $('<nav>');
  nav.append($('<span>', {
    text: active.attr('data-header-title')
  }));
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
      nav.addClass(exports.Controller_.ClassName_.ACTIVE);
    }, 0);
  }, 0);
};


/**
 * Return to the previous slide.
 * @private
 */
exports.Controller_.prototype.back_ = function() {
  if (this.slid_.length <= 0) {
    return;
  }

  const cls = exports.Controller_.ClassName_;

  // slide active item to the right
  this.active_.removeClass(cls.ACTIVE);

  // get the previously active item
  const slideBack = this.slid_.pop();

  // slide previous item to the right
  slideBack.addClass(cls.ACTIVE).removeClass(cls.SLIDE_OUT);

  // update the navigation header
  this.updateNavigationHeader_(slideBack, true);

  this.active_ = slideBack;
};


/**
 * Return to the previous slide if the given element is active.
 *
 * @param {Element} element The element to check.
 */
exports.Controller_.prototype.backIfActive = function(element) {
  if (this.active_ !== null && this.active_.is(element)) {
    this.back_();
  }
};


/**
 * CSS class names toggled by the controller.
 * @enum {string}
 * @private
 */

exports.Controller_.ClassName_ = {
  ACTIVE: 'gmf-mobile-nav-active',
  BACK: 'gmf-mobile-nav-back',
  GO_BACK: 'gmf-mobile-nav-go-back',
  SLIDE: 'gmf-mobile-nav-slide',
  SLIDE_OUT: 'gmf-mobile-nav-slide-out'
};


/**
 * A directive to be used in conjunction with {@link gmf.mobile.navigation.component}.
 * The directive can be set on a slide element of {@link gmf.mobile.navigation.component}
 * with an expression. When the value of the expression changes and becomes
 * true, the navigation returns to the previous slide, if the slide is
 * currently active.
 *
 * Example:
 *
 *    <nav class="gmf-mobile-nav-left" gmf-mobile-nav>
 *      ...
 *      <gmf-authentication class="gmf-mobile-nav-slide"
 *         gmf-mobile-nav-back="authCtrl.gmfUser.username !== null">
 *      </gmf-authentication>
 *
 * If `mainCtrl.gmfUser.username` becomes true and the login-slide is currently
 * active, the navigation will go back to the last slide.
 *
 * @return {angular.IDirective} The Directive Definition Object.
 * @ngInject
 */
exports.backDirective = function() {
  return {
    require: '^^gmfMobileNav',
    restrict: 'A',
    scope: false,
    /**
     * @param {angular.IScope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @param {gmf.mobile.navigation.component.Controller_} navCtrl Controller.
     */
    link: (scope, element, attrs, navCtrl) => {
      scope.$watch(attrs['gmfMobileNavBack'], (newVal, oldVal) => {
        if (newVal === true) {
          navCtrl.backIfActive(element[0]);
        }
      });
    }
  };
};

exports.directive('gmfMobileNavBack', exports.backDirective);


/**
 * A directive to be used in conjunction with {@link gmf.mobile.navigation.component}.
 * The directive can be set on a slide element of {@link gmf.mobile.navigation.component}.
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
exports.backOnClickDirective = function() {
  return {
    require: '^^gmfMobileNav',
    restrict: 'A',
    scope: false,
    /**
     * @param {angular.IScope} scope Scope.
     * @param {angular.JQLite} element Element.
     * @param {angular.Attributes} attrs Attributes.
     * @param {gmf.mobile.navigation.component.Controller_} navCtrl Controller.
     */
    link: (scope, element, attrs, navCtrl) => {
      element.on('click', () => {
        navCtrl.backIfActive(element[0]);
      });
    }
  };
};

exports.directive('gmfMobileNavBackOnClick', exports.backOnClickDirective);


export default exports;
