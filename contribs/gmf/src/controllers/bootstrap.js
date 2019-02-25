
import $ from 'jquery';
import angular from 'angular';
import {TOUCH} from 'ol/has.js';


/**
 * @private
 * @hidden
 * @param {angular.IModule} module The module
 * @return {void}
 */
function bootstrap(module) {
  const interface_ = $('meta[name=interface]')[0].getAttribute('content');
  const dynamicUrl_ = $('meta[name=dynamicUrl]')[0].getAttribute('content');
  const dynamicUrl = `${dynamicUrl_}?interface=${interface_}&query=${encodeURIComponent(
    document.location.search
  )}`;
  const request = $.ajax(dynamicUrl, {
    'dataType': 'json',
    'xhrFields': {
      withCredentials: false
    }
  });
  request.fail((jqXHR, textStatus) => {
    window.alert(`Failed to get the dynamic: ${textStatus}`);
  });
  request.done((dynamic) => {
    if (dynamic['doRedirect']) {
      const small_screen = window.matchMedia ? window.matchMedia('(max-width: 1024px)') : false;
      if (small_screen && TOUCH) {
        window.location.href = dynamic['redirectUrl'];
      }
    }

    for (const name in dynamic['constants']) {
      module.constant(name, dynamic['constants'][name]);
    }

    angular.bootstrap(document, [`App${interface_}`]);
  });
}

export default bootstrap;
