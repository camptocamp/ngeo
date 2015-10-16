goog.provide('gmf-mobileapp');

goog.require('gmf.mapDirective');
goog.require('ol.Map');
goog.require('ol.View');
goog.require('ol.layer.Tile');
goog.require('ol.source.OSM');


/** @const **/
var app = {};


/** @type {!angular.Module} **/
app.module = angular.module('app', ['gmf']);


/**
 * An "app-nav" directive defining the behavior of a tree-structured menu.
 *
 * The directive is to be placed on a `nav` element, with the following
 * structure:
 * <nav app-nav>
 *   <header>
 *     <a class="go-back" href="void(0)"></a>
 *     <span>Categories</span>
 *   </header>
 *   <ul>
 *     <li class="has-children">
 *       <a href="void(0)">Devices</a>
 *       <ul class="is-hidden">
 *         <li>
 *           <a href="void(0)">Mobile Phones</a>
 *         </li>
 *         <li>
 *           <a href="void(0)">Televisions</a>
 *         </li>
 *       </ul>
 *     </li>
 *     <li class="has-children">
 *       <a href="void(0)">Cars</a>
 *       <ul class="is-hidden">
 *         <li>
 *           <a href="void(0)">Camping Cars</a>
 *         </li>
 *       </ul>
 *     </li>
 *   </ul>
 * </nav>
 *
 * When an element is selected the directive changes the text in the header.
 *
 * @return {angular.Directive} The Directive Definition Object.
 * @ngInject
 */
app.navDirective = function() {
  return {
    restrict: 'A',
    link:
        /**
         * @param {angular.Scope} scope Scope.
         * @param {angular.JQLite} element Element.
         * @param {angular.Attributes} attrs Atttributes.
         */
        function(scope, element, attrs) {

          // hide the "go-back" link
          element.find('> header > a').css('visibility', 'hidden');

          // get the header empty text, i.e. the text to display in the
          // header when there's no item selected
          var headerText = /** @type {string} */
              (element.find('> header > span').html());

          /**
           * Stack of selected items.
           * @type {Array.<jQuery>}
           */
          var selected = [];

          // watch for clicks on items with children
          element.find('.has-children > a').on('click', function() {
            // push the item to the selected stack
            selected.push($(this));

            // remove the is-hidden class from the next ul, if any
            $(this).next('ul').removeClass('is-hidden');

            // add the moves-out class to the parent ul
            $(this).parents('ul').addClass('moves-out');

            // show the "go-back" link in the header
            element.find('> header > a').css('visibility', 'visible');

            // change the header's text
            var html = /** @type {string} */ ($(this).html());
            element.find('> header > span').html(html);
          });

          // watch for clicks on the header "go-back" link
          element.find('> header > a').on('click', function() {
            // get the currently selected item
            var item = selected.pop();

            // add the is-hidden class to the next ul, if any
            item.next('ul').addClass('is-hidden');

            // remove the moves-out class from the parent ul
            item.parents('ul').removeClass('moves-out');

            // get the next selected item
            item = selected[selected.length - 1];
            if (item) {
              // update the header's text
              var html = /** @type {string} */ (item.html());
              element.find('> header > span').html(html);
            } else {
              // reset the header's text to the "empty text" value
              $(this).next('span').html(headerText);
              // hide the "go-back" link in the header
              $(this).css('visibility', 'hidden');
            }
          });
        }
  };
};


app.module.directive('appNav', app.navDirective);



/**
 * @constructor
 * @ngInject
 * @export
 */
app.MainController = function() {

  /**
   * @type {boolean}
   * @export
   */
  this.leftNavVisible = false;

  /**
   * @type {boolean}
   * @export
   */
  this.rightNavVisible = false;

  /**
   * @type {ol.Map}
   * @export
   */
  this.map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: [0, 0],
      zoom: 2
    })
  });
};


/**
 * @export
 */
app.MainController.prototype.toggleLeftNavVisibility = function() {
  this.leftNavVisible = !this.leftNavVisible;
};


/**
 * @export
 */
app.MainController.prototype.toggleRightNavVisibility = function() {
  this.rightNavVisible = !this.rightNavVisible;
};


/**
 * Hide both navigation menus.
 * @export
 */
app.MainController.prototype.hideNav = function() {
  this.leftNavVisible = this.rightNavVisible = false;
};


/**
 * @return {boolean} Return true if one of the navigation menus is visible,
 * otherwise false.
 * @export
 */
app.MainController.prototype.navIsVisible = function() {
  return this.leftNavVisible || this.rightNavVisible;
};


/**
 * @return {boolean} Return true if the left navigation menus is visible,
 * otherwise false.
 * @export
 */
app.MainController.prototype.leftNavIsVisible = function() {
  return this.leftNavVisible;
};


/**
 * @return {boolean} Return true if the right navigation menus is visible,
 * otherwise false.
 * @export
 */
app.MainController.prototype.rightNavIsVisible = function() {
  return this.rightNavVisible;
};


app.module.controller('MainController', app.MainController);
