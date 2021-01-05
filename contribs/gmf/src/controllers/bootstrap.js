// The MIT License (MIT)
//
// Copyright (c) 2018-2021 Camptocamp SA
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

import $ from 'jquery';
import angular from 'angular';

/**
 * @private
 * @hidden
 * @param {angular.IModule} module The module
 */
function bootstrap(module) {
  // Hack to make the bootstrap type check working with polyfill.io
  const oldObjectToString = Object.prototype.toString;
  if (!oldObjectToString.toString().includes('[native code]')) {
    Object.prototype.toString = function () {
      if (this === null) {
        return '[object Null]';
      }
      if (this === undefined) {
        return '[object Undefined]';
      }
      return oldObjectToString.call(this);
    };
  }

  const interface_ = $('meta[name=interface]')[0].getAttribute('content');
  const dynamicUrl_ = $('meta[name=dynamicUrl]')[0].getAttribute('content');
  const search = document.location ? document.location.search || '' : '';
  const dynamicUrl = `${dynamicUrl_}?interface=${interface_}&query=${encodeURIComponent(
    search
  )}&path=${encodeURIComponent(document.location.pathname)}`;
  const request = $.ajax(dynamicUrl, {
    'dataType': 'json',
    'xhrFields': {
      withCredentials: false,
    },
  });
  request.fail((jqXHR, textStatus) => {
    window.alert(`Failed to get the dynamic: ${textStatus}`);
  });
  request.done((dynamic) => {
    if (dynamic.doRedirect) {
      const small_screen = window.matchMedia ? window.matchMedia('(max-width: 1024px)') : false;
      if (small_screen && 'ontouchstart' in window) {
        window.location.href = dynamic.redirectUrl;
      }
    }

    for (const name in dynamic.constants) {
      module.constant(name, dynamic.constants[name]);
    }

    angular.bootstrap(document, [`App${interface_}`]);
  });
}

export default bootstrap;
