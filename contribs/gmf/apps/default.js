goog.require('ngeo'); // nowebpack
goog.require('gmf');

const urlElements = window.location.pathname.split('/');

const gmfUrlElements = urlElements.slice(0, urlElements.length - 3);
gmfUrlElements.push('src', 'directives', 'partials');

const gmfModuleUrlElements = urlElements.slice(0, urlElements.length - 3);
gmfModuleUrlElements.push('src');

const ngeoUrlElements = urlElements.slice(0, urlElements.length - 5);
ngeoUrlElements.push('src', 'directives', 'partials');

const ngeoModuleUrlElements = urlElements.slice(0, urlElements.length - 5);
ngeoModuleUrlElements.push('src');

/**
 * The default ngeo template base URL, used as-is by the template cache.
 * @type {string}
 */
ngeo.baseModuleTemplateUrl = window.location.origin + ngeoModuleUrlElements.join('/');

/**
 * The default gmf template base URL, used as-is by the template cache.
 * @type {string}
 */
gmf.baseModuleTemplateUrl = window.location.origin + gmfModuleUrlElements.join('/');
