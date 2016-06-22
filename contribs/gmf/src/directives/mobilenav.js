goog.provide('gmf.MobileNavController');
goog.provide('gmf.mobileNavDirective');

goog.require('goog.asserts');
goog.require('gmf');


/**
 * An "gmf-mobile-nav" directive defining the behavior of a tree-structured menu.
 *
 * The directive is to be placed on a `nav` element, with the following
 * structure:
 * <nav gmf-mobile-nav>
 *   <header>
 *     <a class="go-back" href="#"></a>
 *   </header>
 *   <div class="active slide">
 *     <ul>
 *       <li>
 *         <a href data-target="#devices">Devices</a>
 *       </li>
 *       <li>
 *         <a href data-target="#vehicles">Vehicles</a>
 *       </li>
 *     </ul>
 *   </div>
 *   <div id="devices" class="slide" data-header-title="Devices">
 *     <ul>
 *       <li>Mobile Phones</li>
 *       <li>Televisions</li>
 *     </ul>
 *   </div>
 *   <div id="vehicles" class="slide" data-header-title="Vehicles">
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
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 */
gmf.mobileNavDirective = function() {
  return {
    restrict: 'A',
    controller: 'gmfMobileNavController',
    bindToController: true,
    controllerAs: 'navCtrl',
    scope: true,
    link:
        /**
         * @param {angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Atttributes.
         * @param {gmf.MobileNavController} navCtrl Controller.
         */
        function(scope, element, attrs, navCtrl) {
          navCtrl.init(element);
        }
  };
};

gmf.module.directive('gmfMobileNav', gmf.mobileNavDirective);


/**
* @constructor
* @export
* @ngInject
* @ngdoc controller
* @ngname gmfMobileNavController
*/
gmf.MobileNavController = function() {
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

gmf.module.controller('gmfMobileNavController', gmf.MobileNavController);


/**
 * Initialize the directive with the linked element.
 * @param {angular.JQLite} element Element.
 */
gmf.MobileNavController.prototype.init = function(element) {
  this.active_ = $(element.find('.active.slide'));
  this.header_ = $(element.find('> header'));
  this.backButton_ = $(element.find('header > .go-back'));

  // watch for clicks on "slide-in" elements
  element.find('[data-toggle=slide-in]').on('click', function(evt) {

    // the element to slide out is the div.slide parent
    var slideOut = $(evt.target).parents('.slide');
    goog.asserts.assert(slideOut.length === 1);

    // push the item to the selected stack
    this.slid_.push(slideOut);

    // slide the "old" element out
    slideOut.addClass('slide-out').removeClass('active');

    // element to slide in
    var slideIn = $($(evt.target).attr('data-target'));
    goog.asserts.assert(slideIn.length === 1);

    // slide the "new" element in
    slideIn.addClass('active');

    // update the navigation header
    this.updateNavigationHeader_(slideIn, false);

    this.active_ = slideIn;
  }.bind(this));

  // watch for clicks on the header "go-back" link
  this.backButton_.click(this.back.bind(this));
};


/**
 * @param {!jQuery} active The currently active sliding box.
 * @param {boolean} back Whether to move back.
 * @private
 */
gmf.MobileNavController.prototype.updateNavigationHeader_ = function(
    active, back) {
  this.header_.toggleClass('back', back);

  // remove any inactive nav
  this.header_.find('nav:not(.active)').remove();

  // deactivate the currently active nav
  this.header_.find('nav.active').removeClass('active')
      .addClass('slide-out');

  // show the back button when relevant
  this.backButton_.toggleClass('active', this.slid_.length > 0);

  // create a new nav
  var nav = $('<nav>');
  nav.append($('<span>', {
    text: active.attr('data-header-title')
  }));
  this.header_.append(nav);

  // Delay the activation of the new navigation so that the previous
  // one is properly deactivated. This prevents weird animation
  // effects.
  window.setTimeout(function() {
    // fix for safari: the following 3 lines force that the position
    // of the newly inserted element is calculated.
    // see http://stackoverflow.com/a/3485654/119937
    nav.css('display', 'none');
    nav.offset();
    nav.css('display', '');

    window.setTimeout(function() {
      // fix: calling `position()` makes sure that the animation
      // is always run
      nav.position();
      nav.addClass('active');
    }, 0);
  }, 0);
};

gmf.module.controller('gmfMobileNavController', gmf.MobileNavController);


/**
 * Return to the previous slide.
 * @private
 */
gmf.MobileNavController.prototype.back_ = function() {
  if (this.slid_.length <= 0) {
    return;
  }

  // slide active item to the right
  this.active_.removeClass('active');

  // get the previously active item
  var slideBack = this.slid_.pop();

  // slide previous item to the right
  slideBack.addClass('active').removeClass('slide-out');

  // update the navigation header
  this.updateNavigationHeader_(slideBack, true);

  this.active_ = slideBack;
};


/**
 * Return to the previous slide if the given element is active.
 *
 * @param {Element} element The element to check.
 */
gmf.MobileNavController.prototype.backIfActive = function(element) {
  if (this.active_ !== null && this.active_.is(element)) {
    this.back_();
  }
};


/**
 * A directive to be used in conjunction with {@link gmf.mobileNavDirective}.
 * The directive can be set on a slide element of {@link gmf.mobileNavDirective}.
 * When the element is clicked, the navigation returns to the previous slide if
 * the slide is currently active.
 *
 * Example:
 *
 *    <nav class="nav-left" gmf-mobile-nav>
 *      ...
 *      <gmf-themeselector
 *         gmf-mobile-nav-back-on-click
 *         gmf-themeselector-currenttheme="mainCtrl.theme">
 *      </gmf-themeselector>
 *
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 */
gmf.mobileNavBackOnClickDirective = function() {
  return {
    require: '^^gmfMobileNav',
    restrict: 'A',
    scope: false,
    link:
        /**
         * @param {angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Atttributes.
         * @param {gmf.MobileNavController} navCtrl Controller.
         */
        function(scope, element, attrs, navCtrl) {
          element.on('click', function() {
            navCtrl.backIfActive(element[0]);
          });
        }
  };
};

gmf.module.directive('gmfMobileNavBackOnClick', gmf.mobileNavBackOnClickDirective);
