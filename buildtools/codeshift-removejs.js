// The MIT License (MIT)
//
// Copyright (c) 2021 Camptocamp SA
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
 * Test with:
 * find api/src -name '*.js' -exec npm run cs-rmjs -- --dry {} \;
 * find src -name '*.js' -exec npm run cs-rmjs -- --dry {} \;
 * find contribs/gmf/src -name '*.js' -exec npm run cs-rmjs -- --dry {} \;
 */

const prettier = require('prettier');

const find_import = /import\(["']([a-zA-Z0-9/\.\-_]+)\.js["']\)/g;

export default function transformer(file, api) {
  let result = file.source;
  let error = true;
  try {
    const j = api.jscodeshift;

    console.log('Remove the .js in the es6 imports');
    let root = j(result);
    result = root
      .find(j.ImportDeclaration)
      .forEach((path) => {
        path.value.source.value = path.value.source.value.replace(/.js$/, '');
      })
      .toSource();

    root = j(result);
    result = root
      .find(j.Comment)
      .forEach((path) => {
        let commentValue = path.value.value;
        for (const import_ of path.value.value.matchAll(find_import)) {
          commentValue = commentValue.replace(import_[0], `import('${import_[1]}')`);
        }
        path.value.value = commentValue;
      })
      .toSource();

    error = false;
    console.log('Format the result');
    try {
      const config = {
        useTabs: false,
        tabWidth: 2,
        printWidth: 110,
        singleQuote: true,
        endOfLine: 'lf',
        bracketSpacing: false,
        quoteProps: 'preserve',
        parser: 'babel',
      };
      return prettier.format(result, config);
    } catch (error) {
      console.log('Fail to format the result');
      return result;
    }
    //  } catch (error) {
    //    return result;
  } finally {
    if (error) {
      console.log(result);
    }
  }
}
