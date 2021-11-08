// The MIT License (MIT)
//
// Copyright (c) 2020-2021 Camptocamp SA
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

'use strict';

const spawnSync = require('child_process').spawnSync;

/**
 * @param actual
 * @param expected
 */
function match(actual, expected) {
  if (expected.test) {
    return expected.test(actual);
  } else {
    return expected.trim() === actual.trim();
  }
}

/**
 * @param textArray
 */
function genCommentBody(textArray) {
  return `// ${textArray.join('\n// ')}\n\n\n`;
}

/**
 * @param context
 * @param leadingComments
 * @param fixLines
 * @param headerLines
 */
function genReplaceFixer(context, leadingComments, fixLines, headerLines) {
  return function (fixer) {
    const start = leadingComments[0].range[0];
    let end = start;
    if (context.getSourceCode().text[end] === '\n') {
      end += 1;
    }
    if (headerLines) {
      for (let i = 0; i < headerLines.length; i++) {
        if (match(leadingComments[i].value, headerLines[i])) {
          end = leadingComments[i].range[1];
        } else {
          break;
        }
      }
    }

    return fixer.replaceTextRange([start, end], genCommentBody(fixLines));
  };
}

/**
 * @param context
 */
function check(context) {
  const headerLines1 = ['The MIT License (MIT)', ''];
  const headerLines3 = [
    '',
    'Permission is hereby granted, free of charge, to any person obtaining a copy of',
    'this software and associated documentation files (the "Software"), to deal in',
    'the Software without restriction, including without limitation the rights to',
    'use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of',
    'the Software, and to permit persons to whom the Software is furnished to do so,',
    'subject to the following conditions:',
    '',
    'The above copyright notice and this permission notice shall be included in all',
    'copies or substantial portions of the Software.',
    '',
    'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR',
    'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS',
    'FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR',
    'COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER',
    'IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN',
    'CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.',
  ];

  return {
    Program: function (node) {
      const {stdout} = spawnSync('git', ['log', '--follow', '--pretty=format:%ci', context.getFilename()]);
      const commits_date = stdout.toString().split('\n');
      const first_year = parseInt(commits_date[commits_date.length - 1].substring(0, 4));
      const last_year = commits_date[0].substring(0, 4);
      const current_year = new Date().getFullYear();
      const headerLines2 = [
        new RegExp(`Copyright \\(c\\) ([0-9][0-9][0-9][0-9]-)?(${last_year}|${current_year}) Camptocamp SA`),
      ];
      const fixLines2 = [
        first_year == current_year
          ? `Copyright (c) ${first_year} Camptocamp SA`
          : `Copyright (c) ${first_year}-${current_year} Camptocamp SA`,
      ];
      const headerLines = Array.prototype.concat(headerLines1, headerLines2, headerLines3);
      const fixLines = Array.prototype.concat(headerLines1, fixLines2, headerLines3);

      const leadingComments = (
        node.body.length ? context.getComments(node.body[0]).leading : context.getComments(node).leading
      ).filter(function (comment) {
        return comment.type !== 'Shebang';
      });
      if (!leadingComments.length) {
        context.report({
          loc: node.loc,
          message: 'missing header',
          fix: function (fixer) {
            return fixer.insertTextBefore(node, genCommentBody(fixLines));
          },
        });
      } else if (leadingComments[0].type.toLowerCase() !== 'line') {
        context.report({
          loc: node.loc,
          message: 'header should be a block comment',
          fix: genReplaceFixer(context, leadingComments, fixLines),
        });
      } else {
        if (leadingComments.length < headerLines.length) {
          context.report({
            loc: node.loc,
            message: 'incorrect header',
            fix: genReplaceFixer(
              context,
              leadingComments,
              fixLines,
              Array.prototype.concat(headerLines1, [/Copyright .*/], headerLines3)
            ),
          });
          return;
        }
        for (let i = 0; i < headerLines.length; i++) {
          if (!match(leadingComments[i].value, headerLines[i])) {
            context.report({
              loc: node.loc,
              message: 'incorrect header',
              fix: genReplaceFixer(
                context,
                leadingComments,
                fixLines,
                Array.prototype.concat(headerLines1, [/Copyright .*/], headerLines3)
              ),
            });
            return;
          }
        }
      }
    },
  };
}

module.exports = {
  rules: {
    'copyright': {
      meta: {
        fixable: 'code',
      },
      create: check,
    },
  },
};
