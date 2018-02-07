## -*- coding: utf-8 -*-
/*eslint valid-jsdoc: 0 */
<%doc>
    This is a Mako template that generates Angular code putting the contents of
    HTML partials into Angular's $templateCache. The generated code is then built
    with the rest of JavaScript code. The generated script is not used at all in
    development mode, where HTML partials are loaded through Ajax.
</%doc>
<%
  import re
  import os
  import glob2
  import htmlmin
  _partials = {}
  for p in partials.strip().split():
      dest_folder, source_folder = p.split(":")
      filenames = []
      filenames += glob2.glob("{}/*.html".format(source_folder))
      filenames += glob2.glob("{}/**/*.html".format(source_folder))
      for filename in filenames:
          with open(filename, 'rb') as f:
              content = f.read().decode('utf-8')
              content = re.sub(r"'", "\\'", content)
              content = htmlmin.minify(
                  content,
                  remove_comments=True,
                  remove_empty_space=True,
                  remove_all_empty_space=True,
                  remove_optional_attribute_quotes=False,
              )
              name = os.path.join(dest_folder, filename[len(source_folder) + 1:])
              _partials[name.replace("\\", "/")] = content
%>\
/**
 * ngeo template cache.
 *
 * GENERATED FILE. DO NOT EDIT.
 */

import app from '${app}';

(function() {
  /**
   * @param {angular.cacheFactory.Cache} $templateCache
   * @ngInject
   */
  const runner = function($templateCache) {
  % for partial in _partials:
    $templateCache.put('${partial}', '${_partials[partial]}');
  %endfor
  };

  angular.module(app.module.name).run(runner);
})();
