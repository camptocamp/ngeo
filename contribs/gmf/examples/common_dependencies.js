// The MIT License (MIT)
//
// Copyright (c) 2018-2022 Camptocamp SA
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

import 'gmf/sass/vars.scss';
import 'jquery';
import 'angular';
import 'angular-gettext';
import 'bootstrap';

import 'ol/ol.css';
import 'bootstrap/dist/css/bootstrap.css';

/*
 * Auto redirect to https to prevent CORS exceptions
 */
if (window.location.protocol == 'http:' && window.location.hostname != 'localhost') {
  const restOfUrl = window.location.href.substr(5);
  /** @type {Location} */
  window.location.href = `https:${restOfUrl}`;
}
