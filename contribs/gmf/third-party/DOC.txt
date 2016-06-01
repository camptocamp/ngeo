# JQUERY-UI dependency

- npm jquery-ui does not work for this project because the it's made to be used with Browserify

## Process to get the actual jquery-ui dependency:

1. go to [jquery custom package builder](http://jqueryui.com/download/)
2. Currently the following items have been selected:
  - jquery-ui version 1.11.4
  - All ui core dependencies
  - Widgets datepicker and slider
3. Get the locales for datepicker
  - Unfortunately the custom build do not allow us to pick up translation files
  for the datepicker. By default, it's the english version.

    1. Go to [Github jquery-ui project](https://github.com/jquery/jquery-ui/tree/master/ui/i18n)
    2. open your freshly downloaded custom build jquery-ui.js file
    (not the minified one)
    3. Append to the the end of the file each js locale file from github. Currently:
      - datepicker-de.js
      - datepicker-fr.js
    4. minify the modified jquery-ui.js file.

      1. npm install uglify-js -g
      2. uglifyjs jquery-ui.js -o jquery-ui.min.js --preamble "/* Copyright jQuery Foundation and other contributors; Licensed MIT */"
