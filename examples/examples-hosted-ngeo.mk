BUILDDIR := ../.build/examples-hosted
NODE_MODULES := ../node_modules

EXAMPLES_HTML_FILES := $(wildcard *.html)
EXAMPLES_JS_FILES := $(EXAMPLES_HTML_FILES:.html=.js)

EXAMPLES_HOSTED_HTML_FILES := $(patsubst %.html,$(BUILDDIR)/%.html,$(EXAMPLES_HTML_FILES))
EXAMPLES_HOSTED_HTML_FILES += $(BUILDDIR)/index.html

NGEO_EXAMPLES_PARTIALS_FILES := $(wildcard partials/*.html)

EXAMPLES_HOSTED_REQUIREMENTS = \
	$(BUILDDIR)/lib/angular.min.js \
	$(BUILDDIR)/lib/angular-animate.min.js \
	$(BUILDDIR)/lib/angular-floatThead.js \
	$(BUILDDIR)/lib/angular-gettext.min.js \
	$(BUILDDIR)/lib/angular-sanitize.min.js \
	$(BUILDDIR)/lib/angular-touch.min.js \
	$(BUILDDIR)/lib/date.min.js \
	$(BUILDDIR)/lib/jquery.floatThead.min.js \
	$(BUILDDIR)/lib/slider.min.js \
	$(BUILDDIR)/lib/tmhDynamicLocale.min.js \
	$(BUILDDIR)/lib/bootstrap.min.js \
	$(BUILDDIR)/lib/bootstrap.min.css \
	$(BUILDDIR)/lib/jquery.min.js \
	$(BUILDDIR)/lib/jquery-ui.min.js \
	$(BUILDDIR)/lib/jquery-ui.min.css \
	$(BUILDDIR)/lib/images/ \
	$(BUILDDIR)/lib/d3.min.js \
	$(BUILDDIR)/lib/FileSaver.min.js \
	$(BUILDDIR)/lib/watchwatchers.js \
	$(BUILDDIR)/lib/typeahead.bundle.min.js \
	$(BUILDDIR)/lib/proj4.js \
	$(BUILDDIR)/lib/jsts.min.js \
	$(BUILDDIR)/lib/moment.min.js \
	$(BUILDDIR)/lib/transpile.js \
	$(BUILDDIR)/https.js \
	$(BUILDDIR)/lib/font-awesome.min.css \
	$(addprefix $(BUILDDIR)/fonts/fontawesome-webfont.,eot ttf woff woff2)

NGEO_EXAMPLES_HOSTED_REQUIREMENTS = $(EXAMPLES_HOSTED_REQUIREMENTS) \
	$(subst examples,.build/examples-hosted,$(NGEO_EXAMPLES_PARTIALS_FILES)) \
	$(BUILDDIR)/data

CHECK_TIMESTAMP_FILES := $(patsubst %.html,../.build/%.check.timestamp,$(EXAMPLES_HTML_FILES))

.PHONY: all
all: $(EXAMPLES_HOSTED_HTML_FILES)

.PHONY: check
check: $(CHECK_TIMESTAMP_FILES)

../.build/%.check.timestamp: $(BUILDDIR)/%.html
	mkdir -p $(dir $@)
	$(NODE_MODULES)/.bin/phantomjs --local-to-remote-url-access=true ../buildtools/check-example.js $<
	touch $@

$(BUILDDIR)/index.html: \
		index/examples-index.mako.html \
		$(EXAMPLES_HTML_FILES) \
		$(BUILDDIR)/bootstrap.min.css
	mkdir -p $(dir $@)
	../.build/python-venv/bin/python ../buildtools/generate-examples-index.py $< $(EXAMPLES_HTML_FILES) > $@

.PRECIOUS: $(BUILDDIR)/%.html
$(BUILDDIR)/%.html: %.html \
		$(BUILDDIR)/%.js \
		$(NGEO_EXAMPLES_HOSTED_REQUIREMENTS)
	mkdir -p $(dir $@)
	@echo Substituting dependency paths in $@...
	@sed -e 's|\.\./node_modules/openlayers/css/ol.css|lib/ngeo.css|' \
		-e 's|\.\./node_modules/bootstrap/dist/css/bootstrap.css|lib/bootstrap.min.css|' \
		-e 's|\.\./node_modules/font-awesome/css/font-awesome.css|lib/font-awesome.min.css|' \
		-e 's|\.\./node_modules/jquery/dist/jquery.js|lib/jquery.min.js|' \
		-e 's|\.\./third-party/jquery-ui/jquery-ui.min\.js|lib/jquery-ui.min.js|' \
		-e 's|\.\./third-party/jquery-ui/jquery-ui.min\.css|lib/jquery-ui.min.css|' \
		-e 's|\.\./node_modules/bootstrap/dist/js/bootstrap.js|lib/bootstrap.min.js|' \
		-e 's|\.\./node_modules/angular/angular.js|lib/angular.min.js|' \
		-e 's|\.\./node_modules/angular-animate/angular-animate.js|lib/angular-animate.min.js|' \
		-e 's|\.\./node_modules/angular-float-thead/angular-floatThead.js|lib/angular-floatThead.js|' \
		-e 's|\.\./node_modules/floatthead/dist/jquery.floatThead.min.js|lib/jquery.floatThead.min.js|' \
		-e 's|\.\./node_modules/angular-gettext/dist/angular-gettext.js|lib/angular-gettext.min.js|' \
		-e 's|\.\./node_modules/angular-touch/angular-touch.js|lib/angular-touch.min.js|' \
		-e 's|\.\./node_modules/angular-dynamic-locale/dist/tmhDynamicLocale.js|lib/tmhDynamicLocale.min.js|' \
		-e 's|\.\./node_modules/angular-ui-date/dist/date.js|lib/date.min.js|' \
		-e 's|\.\./node_modules/d3/build/d3.js|lib/d3.min.js|' \
		-e 's|\.\./node_modules/file-saver/FileSaver.min.js|lib/FileSaver.min.js|' \
		-e 's|\.\./node_modules/corejs-typeahead/dist/typeahead.bundle.js|lib/typeahead.bundle.min.js|' \
		-e 's|\.\./node_modules/proj4/dist/proj4\.js|lib/proj4.js|' \
		-e 's|\.\./node_modules/jsts/dist/jsts\.min\.js|lib/jsts.min.js|' \
		-e 's|\.\./node_modules/moment/min/moment\.min\.js|lib/moment.min.js|' \
		-e 's|/@?main=$*.js|lib/transpile.js|' \
		-e 's|default\.js|$*.js|' \
		-e 's|\.\./utils/watchwatchers.js|lib/watchwatchers.js|' \
		-e '/<head>/a\$(SED_NEW_LINE)    <script src="https.js"></script>$(SED_NEW_LINE)' $< > $@

.PRECIOUS: $(BUILDDIR)/lib/ngeo.css
$(BUILDDIR)/lib/ngeo.css: dist/ngeo.css
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/angular.min.js: $(NODE_MODULES)/angular/angular.min.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/angular-animate.min.js: $(NODE_MODULES)/angular-animate/angular-animate.min.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/angular-floatThead.js: $(NODE_MODULES)/angular-float-thead/angular-floatThead.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/jquery.floatThead.min.js: $(NODE_MODULES)/floatthead/dist/jquery.floatThead.min.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/angular-gettext.min.js: $(NODE_MODULES)/angular-gettext/dist/angular-gettext.min.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/angular-sanitize.min.js: $(NODE_MODULES)/angular-sanitize/angular-sanitize.min.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/angular-touch.min.js: $(NODE_MODULES)/angular-touch/angular-touch.min.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/tmhDynamicLocale.min.js: $(NODE_MODULES)/angular-dynamic-locale/dist/tmhDynamicLocale.min.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/date.min.js: $(NODE_MODULES)/angular-ui-date/dist/date.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/slider.min.js: $(NODE_MODULES)/angular-ui-slider/src/slider.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/bootstrap.min.js: $(NODE_MODULES)/bootstrap/dist/js/bootstrap.min.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/bootstrap.min.css: $(NODE_MODULES)/bootstrap/dist/css/bootstrap.min.css
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/bootstrap.min.css: $(NODE_MODULES)/bootstrap/dist/css/bootstrap.min.css
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/jquery.min.js: $(NODE_MODULES)/jquery/dist/jquery.min.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/jquery-ui.min.js: ../third-party/jquery-ui/jquery-ui.min.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/jquery-ui.min.css: ../third-party/jquery-ui/jquery-ui.min.css
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/images/: ../third-party/jquery-ui/images/
	mkdir -p $@
	cp -r $</* $@

$(BUILDDIR)/lib/d3.min.js: $(NODE_MODULES)/d3/build/d3.min.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/FileSaver.min.js: $(NODE_MODULES)/file-saver/FileSaver.min.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/watchwatchers.js: ../utils/watchwatchers.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/typeahead.bundle.min.js: $(NODE_MODULES)/corejs-typeahead/dist/typeahead.bundle.min.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/proj4.js: $(NODE_MODULES)/proj4/dist/proj4.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/jsts.min.js: $(NODE_MODULES)/jsts/dist/jsts.min.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/moment.min.js: $(NODE_MODULES)/moment/min/moment.min.js
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/font-awesome.min.css: $(NODE_MODULES)/font-awesome/css/font-awesome.min.css
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/lib/transpile.js: $(NODE_MODULES)/google-closure-library/closure/goog/transpile.js
	mkdir -p $(dir $@)
	cp $< $@

.PRECIOUS: $(BUILDDIR)/fonts/%
$(BUILDDIR)/fonts/%: $(NODE_MODULES)/font-awesome/fonts/%
	mkdir -p $(dir $@)
	cp $< $@

$(BUILDDIR)/data: data
	mkdir -p $@
	cp data/* $@

.PRECIOUS: $(BUILDDIR)/https.js
$(BUILDDIR)/https.js: https.js
	mkdir -p $(dir $@)
	cp $< $@

.PRECIOUS: $(BUILDDIR)/%.js
$(BUILDDIR)/%.js: ../.build/examples/%.js
	mkdir -p $(dir $@)
	cp $< $@
