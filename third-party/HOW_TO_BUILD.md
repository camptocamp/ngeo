# JQUERY-UI dependency

- We currently use a manual build of jquery-ui. With some refactoring, we might be able to use
  the [official npm package](https://jqueryui.com/upgrade-guide/1.12/#official-package-on-npm)

## Process to get the current jquery-ui dependency:

1. Go to [jquery custom package builder](http://jqueryui.com/download/)
2. Currently the following items have been selected:
  - jquery-ui version 1.12.1
  - All ui core dependencies
  - Interactions Draggable and Resizable
  - Widgets datepicker and slider
  - The above selection should correspond to [this permalink](http://jqueryui.com/download/#!version=1.12.1&components=111111111111101000000010010010000000000000000000)
3. Get the locales for datepicker
  - Unfortunately the custom build does not allow us to pick up translation files
  for the datepicker. By default, it's the English version.

    1. Go to [GitHub jquery-ui project](https://github.com/jquery/jquery-ui/tree/master/ui/i18n)
    2. Open your freshly downloaded custom build jquery-ui.js file
    (not the minified one)
    3. Append to the the end of the file each js locale file from GitHub. Currently:
      - datepicker-de.js
      - datepicker-fr.js
    4. Minify the modified jquery-ui.js file.

      1. npm install uglify-js -g
      2. uglifyjs jquery-ui.js -o jquery-ui.min.js --preamble "/* Copyright jQuery Foundation and other contributors; Licensed MIT */"
