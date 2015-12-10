## -*- coding: utf-8 -*-
<%doc>
    This is a Mako template that generates Angular code putting the contents of
    HTML partials into Angular's $templateCache. The generated code is then built
    with the rest of JavaScript code. The generated script is not used at all in
    development mode, where HTML partials are loaded through Ajax.
</%doc>
<%
  import re
  import os
  import htmlmin
  _partials = {}
  for p in partials.strip().split():
      dest_folder, filename = p.split(":")
      f = file(filename)
      content = unicode(f.read().decode('utf8'))
      content = re.sub(r"'", "\\'", content)
      content = htmlmin.minify(content, remove_comments=True)
      _partials[os.path.join(dest_folder, os.path.basename(filename))] = content
%>\
/**
 * @fileoverview ngeo template cache.
 *
 * GENERATED FILE. DO NOT EDIT.
 */

/**
 * This goog.require is needed because it provides ngeoModule.
 * @suppress {extraRequire}
 */
goog.require('${app}');

(function() {
  /**
   * @param {angular.$cacheFactory.Cache} $templateCache
   * @ngInject
   */
  var runner = function($templateCache) {
  % for partial in _partials:
    $templateCache.put('${partial}', '${_partials[partial]}');
  %endfor
  };

  ${app}Module.run(runner);
})();
