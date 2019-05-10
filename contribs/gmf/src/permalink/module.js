/**
 */
import angular from 'angular';
import gmfPermalinkPermalink from 'gmf/permalink/Permalink.js';
import gmfPermalinkShareService from 'gmf/permalink/ShareService.js';
import gmfPermalinkShareComponent from 'gmf/permalink/shareComponent.js';

import './share.scss';

/**
 * @type {angular.IModule}
 */
export default angular.module('gmfPermalinkModule', [
  gmfPermalinkPermalink.name,
  gmfPermalinkShareService.name,
  gmfPermalinkShareComponent.name,
]);
