// The MIT License (MIT)
//
// Copyright (c) 2024-2024 Camptocamp SA
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

// "Pre-compile" the code to build a library:
// - resolve CSS (SASS -> CSS), load images, etc.

const path = require('path');
const fs = require('fs');

const dest = path.resolve(__dirname, '../dist/gmfprebuilt/');

const externModules = ['ol', 'mapillary-js', 'lit', 'jsts'];

const externed = new Set();

module.exports = {
  entry: './contribs/gmf/index-lib.js',
  output: {
    path: dest,
    filename: 'gmfprebuilt.js',
  },
  optimization: {
    // Don't honor sideEffect configuration from dependencies
    sideEffects: false,
  },
  externals: function(context, request, callback/*(err, result)*/) {
    if (externModules.some(moduleName => request.startsWith(moduleName + "/") || request === moduleName)) {
        externed.add(request.split('/')[0]);
        callback(null, request);
    } else {
        callback();
    }
  }
};

process.on('beforeExit',() => {
  console.log("Externalized modules:", externed);
})
