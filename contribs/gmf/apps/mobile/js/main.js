/**
 * @fileoverview Application entry point.
 *
 * This file defines the "app_main" Closure namespace, which is be used as the
 * Closure entry point (see "closure_entry_point" in the "build.json" file).
 *
 * This file includes `goog.require`'s for all the components/directives used
 * by the HTML page.
 */
goog.provide('app_main');

goog.require('app.MainController');
goog.require('app.navDirective');
goog.require('gmf.mapDirective');
