// The MIT License (MIT)
//
// Copyright (c) 2017-2021 Camptocamp SA
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

/**
 * A simple object that can be managed by `ngeo.misc.ToolActivateMgr`.
 *
 * See our live examples:
 * [../examples/mapquery.html](../examples/mapquery.html)
 * [../examples/toolActivate.html](../examples/toolActivate.html)
 *
 * @param {unknown} toolContext An object which acts as the context for the tool.
 * @param {string} activePropertyName The name of a boolean property on
 *      `toolContext` which represents the active state of the tool.
 * @constructor
 * @ngname ngeoToolActivate
 */
export default function (toolContext, activePropertyName) {
  /**
   * A getter function to get the active state of the tool.
   * @return {boolean} Is active.
   */
  this.getActive = function () {
    // @ts-ignore
    return toolContext[activePropertyName];
  };

  /**
   * A setter function to set the active state of the tool.
   * @param {boolean} newVal New active state.
   */
  this.setActive = function (newVal) {
    // @ts-ignore
    toolContext[activePropertyName] = newVal;
  };
}
