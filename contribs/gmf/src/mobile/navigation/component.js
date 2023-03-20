import angular from 'angular';

/**
 * @type {!angular.IModule}
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
     * @param {Controller} navCtrl Controller.
     */
    link: (scope, element, attrs, navCtrl) => {
      navCtrl.init(element);
    },
  };
}

module.directive('gmfMobileNav', mobileNavigationComponent);

/**
 * @constructor
 * @private
 * @hidden
 * @ngInject
 * @ngdoc controller
 * @ngname gmfMobileNavController
 */
function Controller() {
  /**
   * Stack of slid-in items.
   * @private
   * @type {Array.<!JQuery>}
   */
  this.slid_ = [];

  /**
   * Currently active sliding box.
   * @private
   * @type {JQuery}
   */
  this.active_ = null;

  /**
   * The navigation header.
   * @private
   * @type {JQuery}
   */
  this.header_ = null;

  /**
   * The back button in the navigation header.
   * @private
   * @type {JQuery}
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
   * @param {JQuery.ClickEvent<any, any, any, HTMLElement>} evt The event
   */
  const onClick = (evt) => {
    const slideOut = $(evt.currentTarget).parents(`.${CLASS_NAMES.SLIDE}`);
    console.assert(slideOut.length === 1);

    // push the item to the selected stack
    this.slid_.push(slideOut);

    // slide the "old" element out
    slideOut.addClass(CLASS_NAMES.SLIDE_OUT).removeClass(CLASS_NAMES.ACTIVE);

    // element to slide in
    const slideIn = $($(evt.currentTarget).attr('data-target'));
    console.assert(slideIn.length === 1);

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
 * @param {!JQuery} active The currently active sliding box.
 * @param {boolean} back Whether to move back.
 * @private
 */
Controller.prototype.updateNavigationHeader_ = function (active, back) {
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
 * @private
 */
Controller.prototype.back_ = function () {
  if (this.slid_.length <= 0) {
    return;
  }

  // slide active item to the right
  this.active_.removeClass(CLASS_NAMES.ACTIVE);

  // get the previously active item
  const slideBack = this.slid_.pop();

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
 *         gmf-mobile-nav-back="authCtrl.gmfUser.username !== null">
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
     * @param {Controller} navCtrl Controller.
     */
    link: (scope, element, attrs, navCtrl) => {
      scope.$watch(attrs['gmfMobileNavBack'], (newVal, oldVal) => {
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
     * @param {Controller} navCtrl Controller.
     */
    link: (scope, element, attrs, navCtrl) => {
      element.on('click', () => {
        navCtrl.backIfActive(element[0]);
      });
    },
  };
}

module.directive('gmfMobileNavBackOnClick', mobileNavigationBackOnClickComponent);

export default module;
