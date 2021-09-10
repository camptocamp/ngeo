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
 * find api/src -name '*.js' -exec npm run cs-tots -- --dry {} \;
 * find src -name '*.js' -exec npm run cs-tots -- --dry {} \;
 * find contribs/gmf/src -name '*.js' -exec npm run cs-tots -- --dry {} \;
 */
const doctrine = require('doctrine');
const prettier = require('prettier');
const child_process = require('child_process');
const fs = require('fs');

const find_import = /import\(["']([a-zA-Z0-9/\.\-_]+)["']\).([a-zA-Z0-9]+)/g;
const find_function = /function\(([^\)\(|]+)\): ?([a-zA-Z0-9\?]+)/g;
const find_param = /@param {([^}]*)} ([a-zA-Z0-9]+)/g;
const find_return = /@returns? {([^}]*)}/g;
const find_type = /@type {([^}]*)}/g;

let importedNames = [];
let count = 1;

/**
 * Add typescript types
 * e.g.:
 * /**
 *  * @ param {MapOptions} options API options.
 *  * /
 * constructor(options) {
 * =>
 * ...
 * constructor(options: MapOptions) {
 *
 * @param {jscodeshift} j jscodeshift
 * @param {any} root the root node
 * @param {any} path the current path
 * @param {any} original_path the original path or null
 * @param {any} comment the comment of the original path or null
 * @return {void}
 */
function addTypes(j, root, path, original_path, comment) {
  if (!(comment || path.value.comments)) {
    return;
  }
  comment = comment || path.value.comments[0];

  if (['ExpressionStatement', 'BlockStatement', 'ClassMethod'].includes(path.value.type)) {
    return addTypes(j, root, path.parent, original_path || path, comment);
  }

  if (path.value.type == 'ClassBody' && path.value.expression) {
    let index = 0;
    for (const e of path.value.body) {
      if (e.type == 'ClassProperty') {
        index++;
      } else {
        break;
      }
    }
    const elem = j.classProperty(
      j.identifier(original_path.value.expression.left.property.name),
      null,
      null,
      false
    );
    for (const type_ of comment.value.matchAll(find_type)) {
      elem.typeAnnotation = ': ' + convertSingleType(type_[1]);
    }
    path.value.body.splice(index, 0, elem);
    return;
  }
  if (path.value.type == 'VariableDeclaration') {
    for (const declaration of path.value.declarations) {
      for (const type_ of comment.value.matchAll(find_type)) {
        declaration.id.typeAnnotation = ': ' + convertSingleType(type_[1]);
      }
    }
    return;
  }
  if (path.value.params) {
    for (const type_ of comment.value.matchAll(find_param)) {
      for (const param of path.value.params) {
        if (type_[2] == param.name) {
          param.typeAnnotation = ': ' + convertSingleType(type_[1]);
        }
      }
    }
  }
  for (const returnType of comment.value.matchAll(find_return)) {
    path.value.returnType = ': ' + convertSingleType(returnType[1]);
  }
  if (path.value.expression) {
    for (const type_ of comment.value.matchAll(find_type)) {
      path.value.expression.left.property.typeAnnotation = ': ' + convertSingleType(type_[1]);
    }
  }
}

/**
 * Remove types
 * e.g.:
 * /**
 *  * @ param {MapOptions} options API options.
 *  * /
 * =>
 * /**
 *  * @ param options API options.
 *  * /
 *
 * @param {jscodeshift} j jscodeshift
 * @param {any} root the root node
 * @param {any} path the current path
 * @param {any} original_path the original path or null
 * @param {any} comment the comment of the original path or null
 * @return {void}
 */
function removeTypes(j, root, path, original_path, comment) {
  if (!(comment || path.value.comments)) {
    return;
  }
  comment = comment || path.value.comments[0];

  if (['ExpressionStatement', 'BlockStatement', 'ClassMethod'].includes(path.value.type)) {
    return removeTypes(j, root, path.parent, original_path || path, comment);
  }

  let commentValue = comment.value;

  if (path.value.type == 'ClassBody') {
    for (const type_ of commentValue.matchAll(find_type)) {
      commentValue = commentValue.replace(type_[0], '');
    }
  }
  if (path.value.type == 'VariableDeclaration') {
    for (const type_ of commentValue.matchAll(find_type)) {
      commentValue = commentValue.replace(type_[0], '');
    }
  }
  if (!['ClassBody', 'VariableDeclaration'].includes(path.value.type)) {
    for (const returnType of commentValue.matchAll(find_return)) {
      commentValue = commentValue.replace(returnType[0], '@returns');
    }
  }
  if (comment.type == 'CommentBlock') {
    commentValue = commentValue.replace(/^[\n *]+/, '*\n* ');
    commentValue = commentValue.replace(/[\n *]+$/, '\n');
  } else {
    commentValue = commentValue.replace(/^[\n *]+/, ' ');
    commentValue = commentValue.replace(/[\n *]+$/, '');
  }
  comment.value = commentValue;
}

/**
 * Add the import in the file header
 * e.g.:
 * @ type {VectorSource<import("ol/geom/Geometry.js").default>}
 * => add
 * import olGeomGeometry from 'ol/geom/Geometry.js';
 *
 * @param {jscodeshift} j jscodeshift
 * @param {any} root the root node
 * @param {any} path the current path
 */
function addImport(j, root, path) {
  const comment = path.value;

  for (const import_ of comment.value.matchAll(find_import)) {
    const importName = import_[1].replace(/.js$/, '');
    let importAs = '';
    if (import_[2] == 'default') {
      importAs = rename(importName, import_[2]);
      if (!importedNames.includes(importAs)) {
        importedNames.push(importAs);
        const importStatement = j.importDeclaration(
          [j.importDefaultSpecifier(j.identifier(importAs))],
          j.literal(importName)
        );
        addStatements(j, root, importStatement);
      }
    } else {
      const importStatement = j.importDeclaration(
        [j.importSpecifier(j.identifier(import_[2]))],
        j.literal(importName)
      );
      importAs = rename(importName, import_[2]);
      if (!importedNames.includes(importAs)) {
        importedNames.push(importAs);
        importStatement.specifiers[0].local = importAs;
        addStatements(j, root, importStatement);
      }
    }
  }
}

/**
 * Convert the import in the comment
 * e.g.:
 * @ type {VectorSource<import("ol/geom/Geometry.js").default>}
 * =>
 * @ type {VectorSource<olGeomGeometry>}
 *
 * @param {jscodeshift} j jscodeshift
 * @param {any} root the root node
 * @param {any} path the current path
 */
function convertImport(j, root, path) {
  const comment = path.value;
  let commentValue = comment.value;

  for (const import_ of comment.value.matchAll(find_import)) {
    const importName = import_[1].replace(/.js$/, '');
    let importAs = '';
    if (import_[2] == 'default') {
      importAs = rename(importName, import_[2]);
    } else {
      importAs = rename(importName, import_[2]);
    }
    commentValue = commentValue.replace(import_[0], importAs);
  }
  comment.value = commentValue;
}

function convertSingleType(jsType) {
  console.log(jsType);
  if (jsType == '?') {
    return 'any';
  }
  jsType = jsType.replaceAll(/\*/g, 'any');
  jsType = jsType.replaceAll(/\!/g, '');
  jsType = jsType.replaceAll(/\?([a-zA-Z0-9])/g, 'undefined|$1');
  jsType = jsType.replaceAll(/\?/g, 'any');
  jsType = jsType.replaceAll(/\=/g, '|undefined');
  return jsType;
}

/**
 * Add the function in the file header
 * e.g.:
 * @ type {function(string): string}}
 * => add
 * type Function1 = {
 *   (arg1: string): string;
 * };
 *
 * @param {jscodeshift} j jscodeshift
 * @param {any} root the root node
 * @param {any} path the current path
 */
function addFunction(j, root, path) {
  const comment = path.value;

  for (const function_ of comment.value.matchAll(find_function)) {
    const functionName = 'Function' + count;
    count++;
    let contArg = 1;
    let statement = `type ${functionName} = {\n  (`;
    let first = true;

    const src = `@type {${function_[0]}}`.replaceAll(/\*/g, 'any');
    const doc = doctrine.parse(src, {unwrap: true, range: true});
    for (const p of doc.tags[0].type.params) {
      const arg = src.substring(p.range[0], p.range[1]);
      if (first) {
        first = false;
      } else {
        statement += ', ';
      }
      statement += `arg${contArg}: ${convertSingleType(arg.trim())}`;
      contArg += 1;
    }
    statement += `): ${convertSingleType(function_[2])};\n};`;

    j(statement)
      .find(j.Program)
      .forEach((p) => {
        addStatements(j, root, p.value.body[0]);
      });
  }
}

/**
 * Convert the function in the file header
 * e.g.:
 * @ type {function(string): string}}
 * =>
 * @ type {Function1}}
 *
 * @param {jscodeshift} j jscodeshift
 * @param {any} root the root node
 * @param {any} path the current path
 */
function convertFunction(j, root, path) {
  const comment = path.value;

  for (const function_ of comment.value.matchAll(find_function)) {
    const functionName = 'Function' + count;
    comment.value = comment.value.replace(function_[0], functionName);
  }
}

/**
 * Convert the cast e.g.:
 *   /** @ type {MyType} * / ('expression')
 * =>:
 *   /** @ type {MyType} * / ('expression') as MyType
 *
 * @param {any} node The node to transform
 * @param {any} parent The parent node
 * @param {any} comments Override the comments
 * @param {any} statement The statement function
 * @return {any}
 */
function convertCast(node, parent, comments, statement) {
  if (
    node.extra &&
    node.extra.parenthesized &&
    (comments || node.comments || (parent && parent.innerComments))
  ) {
    if (!comments && node.comments) {
      comments = node.comments;
    }
    if (!comments && parent.innerComments) {
      comments = parent.innerComments;
    }
    if (comments) {
      for (const type_ of comments[0].value.matchAll(find_type)) {
        return statement`(${node}) as ${convertSingleType(type_[1])}`;
      }
    }
  }
}

/**
 * Convert the cast e.g.:
 *   /** @ type {MyType} * / ('expression') as MyType
 * =>:
 *   ('expression') as MyType
 * Note that it is a little more complicated because the comments are moving...
 *
 * @param {any} comments Override the comments
 */
function removeTypeInComments(comments) {
  if (comments) {
    let commentValue = comments[0].value;
    for (const type_ of comments[0].value.matchAll(find_type)) {
      commentValue = commentValue.replace(type_[0], '');
      commentValue = commentValue.replace(/^[\n *]+/, '*\n* ');
      commentValue = commentValue.replace(/[\n *]+$/, '\n');
      comments[0].value = commentValue;
    }
  }
}

/**
 * Visit all node
 *
 * @param {string} indent
 * @param {any} node
 * @param {function(string, any): void} call function to do on all the nodes
 */
function visit(indent, node, call) {
  if (Array.isArray(node)) {
    for (const n of node) {
      visit(indent, n, call);
    }
    return;
  }
  call(indent, node);
  let done = false;
  if (node.arguments) {
    done = true;
    visit(indent + ' ', node.arguments, call);
  }
  if (node.elements) {
    done = true;
    visit(indent + ' ', node.elements, call);
  }
  if (node.params) {
    done = true;
    visit(indent + ' ', node.params, call);
  }
  if (node.declarations) {
    done = true;
    visit(indent + ' ', node.declarations, call);
  }
  if (node.properties) {
    done = true;
    visit(indent + ' ', node.properties, call);
  }
  if (node.cases) {
    done = true;
    visit(indent + ' ', node.cases, call);
  }
  if (node.body) {
    done = true;
    visit(indent + ' ', node.body, call);
  }
  if (node.left) {
    done = true;
    visit(indent + ' ', node.left, call);
  }
  if (node.right) {
    done = true;
    visit(indent + ' ', node.right, call);
  }
  if (node.node) {
    done = true;
    visit(indent + ' ', node.node, call);
  }
  if (node.argument) {
    done = true;
    visit(indent + ' ', node.argument, call);
  }
  if (node.test) {
    done = true;
    visit(indent + ' ', node.test, call);
  }
  if (node.init) {
    done = true;
    visit(indent + ' ', node.init, call);
  }
  if (node.init === null) {
    done = true;
  }
  if (node.update) {
    done = true;
    visit(indent + ' ', node.update, call);
  }
  if (node.program) {
    done = true;
    visit(indent + ' ', node.program, call);
  }
  if (node.expression) {
    done = true;
    visit(indent + ' ', node.expression, call);
  }
  if (node.property) {
    done = true;
    visit(indent + ' ', node.property, call);
  }
  if (node.declaration) {
    done = true;
    visit(indent + ' ', node.declaration, call);
  }
  if (node.block) {
    done = true;
    visit(indent + ' ', node.block, call);
  }
  if (node.handler) {
    done = true;
    visit(indent + ' ', node.handler, call);
  }
  if (node.finalizer) {
    done = true;
    visit(indent + ' ', node.finalizer, call);
  }
  if (node.discriminant) {
    done = true;
    visit(indent + ' ', node.discriminant, call);
  }
  if (node.consequent) {
    done = true;
    visit(indent + ' ', node.consequent, call);
  }
  if (node.id) {
    done = true;
    visit(indent + ' ', node.id, call);
  }
  if (
    [
      'ImportDeclaration',
      'ThisExpression',
      'Identifier',
      'TemplateLiteral',
      'NullLiteral',
      'BooleanLiteral',
      'RegExpLiteral',
      'NumericLiteral',
      'StringLiteral',
      'BreakStatement',
      'ReturnStatement',
      'ContinueStatement',
    ].includes(node.type)
  ) {
    // ignore
    done = true;
  } else if (node.value) {
    done = true;
    visit(indent + ' ', node.value, call);
  }
  if (!done) {
    console.log('Unknown node type');
    console.log(node);
    throw 'Unknown node type';
  }
}

function findTopLevelImports(j, root) {
  const program = root.find(j.Program).at(0).paths()[0];
  if (!program) {
    return [];
  }
  return j(program.get('body').filter((p) => ['ImportDeclaration'].includes(p.node.type)));
}

function addStatements(j, root, ...statements) {
  const imports = findTopLevelImports(j, root);
  if (imports.length) {
    const last = imports.at(-1).paths()[0];
    for (const statement of statements.reverse()) {
      last.insertAfter(statement);
    }
  } else {
    const program = root.find(j.Program).at(0).paths()[0];
    for (const statement of statements.reverse()) {
      program.get('body').unshift(statement);
    }
  }
}

/**
 * Build the import name from the import function
 * for `import('test.js').default` name will be 'test' and object will be 'default'.
 *
 * @param {string} name the script name
 * @param {string} object the object we import
 * @return {string}
 */
function rename(name, object) {
  name = name.replace(/^\.\//, '');
  name = name.replaceAll(/[\.\-]+/g, '/');
  if (object == 'default' || /^[A-Z]/.test(object)) {
    name = name[0].toUpperCase() + name.substring(1);
  }
  if (object != 'default') {
    name += '/' + object;
  }
  const parts = name.split('/');
  return parts
    .map((part, index) => {
      if (index === 0) {
        return part;
      } else {
        return part[0].toUpperCase() + part.substring(1);
      }
    })
    .join('');
}

export default function transformer(file, api) {
  let result = file.source;
  let error = true;
  try {
    const j = api.jscodeshift;
    importedNames = [];

    j(file.source)
      .forEach((path) => {
        visit('', path.value, (indent, node) => {
          // if (node.comments) {
          //   console.log(node.comments[0].value);
          // }
          // if (node.innerComments) {
          //   console.log('innerComments');
          //   console.log(node.innerComments[0].value);
          // }
          // console.log(indent + indent + node.type);
        });
      })
      .toSource();

    console.log('Remove the .js, fill th already imported name');
    let root = j(result);
    result = root
      .find(j.ImportDeclaration)
      .forEach((path) => {
        path.value.source.value = path.value.source.value.replace(/.js$/, '');
        for (const specifier of path.value.specifiers) {
          importedNames.push(specifier.local.name);
        }
      })
      .toSource();

    console.log('Add import');
    root = j(result);
    result = root
      .find(j.Comment)
      .forEach((path) => {
        addImport(j, root, path);
      })
      .toSource();

    console.log('Convert import');
    root = j(result);
    result = root
      .find(j.Comment)
      .forEach((path) => {
        convertImport(j, root, path);
      })
      .toSource();

    console.log('Add function');
    count = 1;
    root = j(result);
    result = root
      .find(j.Comment)
      .forEach((path) => {
        addFunction(j, root, path);
      })
      .toSource();

    console.log('Convert function');
    const old_count = count;
    count = 1;
    root = j(result);
    result = root
      .find(j.Comment)
      .forEach((path) => {
        convertFunction(j, root, path);
      })
      .toSource();

    console.log('Add function');
    count = old_count;
    root = j(result);
    result = root
      .find(j.Comment)
      .forEach((path) => {
        addFunction(j, root, path);
      })
      .toSource();

    console.log('Convert function');
    count = old_count;
    root = j(result);
    result = root
      .find(j.Comment)
      .forEach((path) => {
        convertFunction(j, root, path);
      })
      .toSource();

    console.log('Add types for function');
    root = j(result);
    result = root
      .find(j.FunctionDeclaration)
      .forEach((path) => {
        addTypes(j, root, path);
      })
      .toSource();

    console.log('Remove types for function');
    root = j(result);
    result = root
      .find(j.FunctionDeclaration)
      .forEach((path) => {
        removeTypes(j, root, path);
      })
      .toSource();

    console.log('Add types for arrow function');
    root = j(result);
    result = root
      .find(j.ArrowFunctionExpression)
      .forEach((path) => {
        addTypes(j, root, path);
      })
      .toSource();

    console.log('Remove types for arrow function');
    root = j(result);
    result = root
      .find(j.ArrowFunctionExpression)
      .forEach((path) => {
        removeTypes(j, root, path);
      })
      .toSource();

    console.log('Add types for expression');
    root = j(result);
    result = root
      .find(j.ExpressionStatement)
      .forEach((path) => {
        addTypes(j, root, path);
      })
      .toSource();

    console.log('Remove types for expression');
    root = j(result);
    result = root
      .find(j.ExpressionStatement)
      .forEach((path) => {
        removeTypes(j, root, path);
      })
      .toSource();

    console.log('Add types for variable');
    root = j(result);
    result = root
      .find(j.VariableStatement)
      .forEach((path) => {
        addTypes(j, root, path);
      })
      .toSource();

    console.log('Remove types for variable');
    root = j(result);
    result = root
      .find(j.VariableStatement)
      .forEach((path) => {
        removeTypes(j, root, path);
      })
      .toSource();

    console.log('Add types for class body');
    root = j(result);
    result = root
      .find(j.ClassBody)
      .forEach((path) => {
        addTypes(j, root, path);
      })
      .toSource();

    console.log('Remove types for class body');
    root = j(result);
    result = root
      .find(j.ClassBody)
      .forEach((path) => {
        removeTypes(j, root, path);
      })
      .toSource();

    console.log('Add types for call');
    root = j(result);
    result = root
      .find(j.CallExpression)
      .forEach((path) => {
        addTypes(j, root, path);
      })
      .toSource();

    console.log('Remove types for call');
    root = j(result);
    result = root
      .find(j.CallExpression)
      .forEach((path) => {
        removeTypes(j, root, path);
      })
      .toSource();

    console.log('Add types for variable');
    root = j(result);
    result = root
      .find(j.VariableDeclaration)
      .forEach((path) => {
        addTypes(j, root, path);
      })
      .toSource();

    console.log('Remove types for variable');
    root = j(result);
    result = root
      .find(j.VariableDeclaration)
      .forEach((path) => {
        removeTypes(j, root, path);
      })
      .toSource();

    console.log('Add cast on call');
    result = j(result)
      .find(j.CallExpression)
      .forEach((path) => {
        let comments = path.value.innerComments;
        for (const argumentnb in path.value.arguments) {
          const argument = path.value.arguments[argumentnb];
          const newArgument = convertCast(argument, undefined, comments, j.template.statement);
          if (newArgument) {
            path.value.arguments[argumentnb] = newArgument;
          }
          comments = argument.comments;
        }
      })
      .toSource();
    console.log('Add cast on assignment');
    result = j(result)
      .find(j.AssignmentExpression)
      .forEach((path) => {
        const newValue = convertCast(path.value.right, path.value, undefined, j.template.statement);
        if (newValue) {
          path.value.right = newValue;
        }
      })
      .toSource();
    console.log('Add cast on new variable');
    result = j(result)
      .find(j.VariableDeclarator)
      .forEach((path) => {
        if (path.value.init) {
          const newInit = convertCast(path.value.init, path.value, undefined, j.template.statement);
          if (newInit) {
            path.value.init = newInit;
          }
        }
      })
      .toSource();
    console.log('Add cast on class property');
    result = j(result)
      .find(j.ClassProperty)
      .forEach((path) => {
        if (path.value.value) {
          const newValue = convertCast(path.value.value, path.value, undefined, j.template.statement);
          if (newValue) {
            path.value.value = newValue;
          }
        }
      })
      .toSource();

    console.log('Remove cast on call');
    result = j(result)
      .find(j.CallExpression)
      .forEach((path) => {
        removeTypeInComments(path.value.callee.comments);
        for (const argument of path.value.arguments) {
          removeTypeInComments(argument.comments);
          if (argument.type == 'TSAsExpression') {
            removeTypeInComments(argument.expression.comments);
          }
        }
      })
      .toSource();

    console.log('Remove cast on assignment');
    result = j(result)
      .find(j.AssignmentExpression)
      .forEach((path) => {
        removeTypeInComments(path.value.left.comments);
      })
      .toSource();

    console.log('Remove cast on new variable');
    result = j(result)
      .find(j.VariableDeclarator)
      .forEach((path) => {
        removeTypeInComments(path.value.id.comments);
      })
      .toSource();

    console.log('Remove cast on class property');
    result = j(result)
      .find(j.ClassProperty)
      .forEach((path) => {
        removeTypeInComments(path.value.key.comments);
      })
      .toSource();

    // Set to false to disable this convert that take time
    if (true) {
      console.log('Convert the @typedef by using the tsc command');
      let finish = false;
      while (!finish) {
        finish = true;
        root = j(result);
        root
          .find(j.Comment)
          .filter((path) => {
            return path.value.value.replace(/^[\n *]*/, '').startsWith('@typedef {');
          })
          .forEach((path) => {
            if (finish) {
              finish = false;
              fs.writeFileSync('/tmp/typedef.js', `/**${path.value.value}*/`);
              console.log(
                child_process
                  .execSync(
                    'npx -p typescript tsc /tmp/typedef.js --declaration --allowJs --emitDeclarationOnly --outDir /tmp/'
                  )
                  .toString()
              );

              result =
                result.substring(0, path.value.start) +
                fs.readFileSync('/tmp/typedef.d.ts') +
                result.substring(path.value.end);
            }
          });
      }
      console.log('Convert the @enum by using the tsc command');
      finish = false;
      while (!finish) {
        finish = true;
        root = j(result);
        root.find(j.VariableDeclaration).forEach((path) => {
          if (finish) {
            let comments = path.value.comments;
            let hasExport = false;
            if (
              !comments &&
              path.parent.value.comments &&
              path.parent.value.type == 'ExportNamedDeclaration'
            ) {
              hasExport = true;
              comments = path.parent.value.comments;
            }

            if (comments && comments[0].value.replace(/^[\n *]*/, '').startsWith('@enum')) {
              fs.writeFileSync(
                '/tmp/enum.js',
                hasExport
                  ? result.substring(comments[0].start, path.value.end)
                  : `${result.substring(comments[0].start, comments[0].end)}\nexport ${result.substring(
                      path.value.start,
                      path.value.end
                    )}`
              );
              console.log(
                child_process
                  .execSync(
                    'npx -p typescript tsc /tmp/enum.js --declaration --allowJs --emitDeclarationOnly --outDir /tmp/'
                  )
                  .toString()
              );

              result =
                result.substring(0, comments[0].start) +
                fs.readFileSync('/tmp/enum.d.ts') +
                result.substring(path.value.end);
              finish = false;
            }
          }
        });
      }
    }

    console.log('Remove empty comments');
    result = j(result)
      .find(j.Comment)
      .filter((path) => {
        return path.value.type == 'CommentBlock' && path.value.value.replace(/[\n *]*/, '') == '';
      })
      .replaceWith((path) => {
        return '';
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
  } finally {
    if (error) {
      console.log(result);
    }
  }
}
