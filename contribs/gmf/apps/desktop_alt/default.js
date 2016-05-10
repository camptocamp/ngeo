var urlElements = window.location.pathname.split('/');

var gmfUrlElements = urlElements.slice(0, urlElements.length - 3);
gmfUrlElements.push('src', 'directives', 'partials')

var ngeoUrlElements = urlElements.slice(0, urlElements.length - 5);
ngeoUrlElements.push('src', 'directives', 'partials')


/**
 * The default ngeo template based URL, used as it by the template cache.
 * @type {string}
 */
ngeo.baseTemplateUrl = window.location.origin + ngeoUrlElements.join('/');


/**
 * The default gmf template based URL, used as it by the template cache.
 * @type {string}
 */
gmf.baseTemplateUrl = window.location.origin + gmfUrlElements.join('/');
