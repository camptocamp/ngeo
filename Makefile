SRC_JS_FILES := $(shell find src -type f -name '*.js')
TEST_JS_FILES := $(shell find test -type f -name '*.js')
NGEO_DIRECTIVES_PARTIALS_FILES := $(shell ls -1 src/directives/partials/*.html)
NGEO_MODULES_PARTIALS_FILES := $(shell find src/modules/ -name '*.html')
GMF_DIRECTIVES_PARTIALS_FILES := $(shell ls -1 contribs/gmf/src/directives/partials/*.html)
NGEO_EXAMPLES_PARTIALS_FILES := $(shell ls -1 examples/partials/*.html)
GMF_EXAMPLES_PARTIALS_FILES := $(shell ls -1 contribs/gmf/examples/partials/*.html)

OS := $(shell uname)
CLOSURE_LIBRARY_PATH = $(shell node -e 'process.stdout.write(require("@camptocamp/closure-util").getLibraryPath())' 2> /dev/null)

EXAMPLES_HTML_FILES := $(shell find examples -maxdepth 1 -type f -name '*.html')
EXAMPLES_JS_FILES := $(EXAMPLES_HTML_FILES:.html=.js)


FONTAWESOME_WEBFONT = $(addprefix contribs/gmf/fonts/fontawesome-webfont., eot ttf woff woff2)
JQUERY_UI = contribs/gmf/build/images/

GMF_SRC_JS_FILES := $(shell find contribs/gmf/src -type f -name '*.js')
GMF_TEST_JS_FILES := $(shell find contribs/gmf/test -type f -name '*.js')
GMF_EXAMPLES_HTML_FILES := $(shell find contribs/gmf/examples -maxdepth 1 -type f -name '*.html')
GMF_EXAMPLES_JS_FILES := $(GMF_EXAMPLES_HTML_FILES:.html=.js)
GMF_APPS += mobile desktop desktop_alt mobile_alt oeedit oeview
GMF_APPS_JS_FILES := $(shell find contribs/gmf/apps/ -type f -name '*.js')
GMF_APPS_LESS_FILES := $(shell find contribs/gmf/less src/modules -type f -name '*.less')
DEVELOPMENT ?= FALSE
ifeq ($(DEVELOPMENT), TRUE)
CLOSURE_VARS += --var development=true
GMF_APPS_LIBS_JS_FILES += \
	examples/https.js \
	node_modules/jquery/dist/jquery.js \
	node_modules/angular/angular.js \
	node_modules/angular-animate/angular-animate.js \
	node_modules/angular-float-thead/angular-floatThead.js \
	node_modules/angular-gettext/dist/angular-gettext.js \
	node_modules/angular-sanitize/angular-sanitize.js \
	node_modules/angular-touch/angular-touch.js \
	node_modules/angular-dynamic-locale/dist/tmhDynamicLocale.js \
	node_modules/angular-ui-date/dist/date.js \
	node_modules/angular-ui-slider/src/slider.js \
	node_modules/bootstrap/dist/js/bootstrap.js \
	node_modules/floatthead/dist/jquery.floatThead.js \
	node_modules/proj4/dist/proj4-src.js \
	node_modules/d3/build/d3.js \
	node_modules/file-saver/FileSaver.js \
	node_modules/corejs-typeahead/dist/typeahead.bundle.js \
	node_modules/jsts/dist/jsts.min.js \
	node_modules/moment/moment.js \
	node_modules/url-polyfill/url-polyfill.js \
	third-party/jquery-ui/jquery-ui.js \
	node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.js \
	$(CLOSURE_LIBRARY_PATH)/closure/goog/transpile.js
else
GMF_APPS_LIBS_JS_FILES += \
	examples/https.js \
	node_modules/jquery/dist/jquery.min.js \
	node_modules/angular/angular.min.js \
	node_modules/angular-animate/angular-animate.min.js \
	node_modules/angular-float-thead/angular-floatThead.js \
	node_modules/angular-gettext/dist/angular-gettext.min.js \
	node_modules/angular-sanitize/angular-sanitize.min.js \
	node_modules/angular-touch/angular-touch.min.js \
	node_modules/angular-dynamic-locale/dist/tmhDynamicLocale.min.js \
	node_modules/angular-ui-date/dist/date.js \
	node_modules/angular-ui-slider/src/slider.js \
	node_modules/bootstrap/dist/js/bootstrap.min.js \
	node_modules/floatthead/dist/jquery.floatThead.min.js \
	node_modules/proj4/dist/proj4.js \
	node_modules/file-saver/FileSaver.min.js \
	node_modules/d3/build/d3.min.js \
	node_modules/corejs-typeahead/dist/typeahead.bundle.min.js \
	node_modules/jsts/dist/jsts.min.js \
	node_modules/moment/min/moment.min.js \
	node_modules/url-polyfill/url-polyfill.min.js \
	third-party/jquery-ui/jquery-ui.min.js \
	node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.min.js
endif

BUILD_EXAMPLES_CHECK_TIMESTAMP_FILES := $(patsubst examples/%.html,.build/%.check.timestamp,$(EXAMPLES_HTML_FILES)) \
	$(patsubst contribs/gmf/examples/%.html,.build/contribs/gmf/%.check.timestamp,$(GMF_EXAMPLES_HTML_FILES)) \
	$(addprefix .build/contribs/gmf/apps/,$(addsuffix .check.timestamp,$(GMF_APPS)))
EXAMPLES_HOSTED_REQUIREMENTS = .build/examples-hosted/lib/ngeo.css \
	.build/examples-hosted/lib/angular.min.js \
	.build/examples-hosted/lib/angular-animate.min.js \
	.build/examples-hosted/lib/angular-floatThead.js \
	.build/examples-hosted/lib/angular-gettext.min.js \
	.build/examples-hosted/lib/angular-sanitize.min.js \
	.build/examples-hosted/lib/angular-touch.min.js \
	.build/examples-hosted/lib/date.min.js \
	.build/examples-hosted/lib/jquery.floatThead.min.js \
	.build/examples-hosted/lib/slider.min.js \
	.build/examples-hosted/lib/tmhDynamicLocale.min.js \
	.build/examples-hosted/lib/bootstrap.min.js \
	.build/examples-hosted/lib/bootstrap.min.css \
	.build/examples-hosted/lib/jquery.min.js \
	.build/examples-hosted/lib/jquery-ui.min.js \
	.build/examples-hosted/lib/jquery-ui.min.css \
	.build/examples-hosted/contribs/gmf/build/images/ \
	.build/examples-hosted/lib/images/ \
	.build/examples-hosted/lib/d3.min.js \
	.build/examples-hosted/lib/FileSaver.min.js \
	.build/examples-hosted/lib/watchwatchers.js \
	.build/examples-hosted/lib/typeahead.bundle.min.js \
	.build/examples-hosted/lib/proj4.js \
	.build/examples-hosted/lib/jsts.min.js \
	.build/examples-hosted/lib/moment.min.js \
	.build/examples-hosted/lib/transpile.js \
	.build/examples-hosted/https.js \
	.build/examples-hosted/lib/font-awesome.min.css \
	.build/examples-hosted/lib/url-polyfill.min.js \
	$(addprefix .build/examples-hosted/fonts/fontawesome-webfont.,eot ttf woff woff2) \
	$(addprefix .build/examples-hosted/contribs/gmf/cursors/,grab.cur grabbing.cur)
NGEO_EXAMPLES_HOSTED_REQUIREMENTS = $(EXAMPLES_HOSTED_REQUIREMENTS) \
	$(subst examples,.build/examples-hosted,$(NGEO_EXAMPLES_PARTIALS_FILES)) \
	.build/examples-hosted/data \
	.build/templatecache.js
GMF_EXAMPLES_PARTIALS_FILES = $(EXAMPLES_PARTIALS_FILES) \
	$(subst contibs/gmf/examples,.build/examples-hosted/contribs/gmf,$(GMF_EXAMPLES_PARTIALS_FILES)) \
	.build/examples-hosted/contribs/gmf/data \
	.build/gmftemplatecache.js

# Git
GITHUB_USERNAME ?= camptocamp
GIT_BRANCH ?= $(shell git rev-parse --symbolic-full-name --abbrev-ref HEAD)
GIT_REMOTE_NAME ?= origin
export GITHUB_USERNAME
export GIT_BRANCH
export GIT_REMOTE_NAME

# i18n
L10N_LANGUAGES = fr de
L10N_PO_FILES = \
	$(addprefix .build/locale/,$(addsuffix /LC_MESSAGES/ngeo.po, $(L10N_LANGUAGES))) \
	$(addprefix .build/locale/,$(addsuffix /LC_MESSAGES/gmf.po, $(L10N_LANGUAGES))) \
	$(addprefix .build/locale/,$(addsuffix /LC_MESSAGES/demo.po, $(L10N_LANGUAGES)))
LANGUAGES = en $(L10N_LANGUAGES)
ANGULAR_LOCALES_FILES = $(addprefix contribs/gmf/build/angular-locale_, $(addsuffix .js, $(LANGUAGES)))

TX_VERSION ?= 2_2
ifeq (,$(wildcard $(HOME)/.transifexrc))
TOUCHBACK_TXRC = $(TOUCH_DATE) "$(shell date --iso-8601=seconds)" $(HOME)/.transifexrc
else
TOUCHBACK_TXRC = $(TOUCH_DATE) "$(shell $(STAT_LAST_MODIFIED) $(HOME)/.transifexrc)" $(HOME)/.transifexrc
endif

NGEO_JS_FILES = $(shell find src -type f -name '*.js')
GMF_JS_FILES = $(shell find contribs/gmf/src -type f -name '*.js')
GMF_DEMO_HTML = $(shell find contribs/gmf/apps -type f -name '*.html')
GMF_DEMO_JS_FILES = $(shell find contribs/gmf/apps -type f -name '*.js')

EXTERNS_ANGULAR = .build/externs/angular-1.6.js
EXTERNS_ANGULAR_Q = .build/externs/angular-1.6-q_templated.js
EXTERNS_ANGULAR_HTTP_PROMISE = .build/externs/angular-1.6-http-promise_templated.js
EXTERNS_JQUERY = .build/externs/jquery-1.9.js
EXTERNS_FILES = $(EXTERNS_ANGULAR) $(EXTERNS_ANGULAR_Q) $(EXTERNS_ANGULAR_HTTP_PROMISE) $(EXTERNS_JQUERY)

ifeq ($(OS),Darwin)
	STAT_COMPRESSED = stat -f '  compressed: %z bytes'
	STAT_UNCOMPRESSED = stat -f 'uncompressed: %z bytes'
	STAT_LAST_MODIFIED = stat -f '%m'
	TOUCH_DATE = touch -t
	SED_NEW_LINE = '$$'\n
else
	STAT_COMPRESSED = stat -c '  compressed: %s bytes'
	STAT_UNCOMPRESSED = stat -c 'uncompressed: %s bytes'
	STAT_LAST_MODIFIED = stat -c '%y'
	TOUCH_DATE = touch --date
	SED_NEW_LINE = ''
endif

# Disabling Make built-in rules to speed up execution time
.SUFFIXES:

.PHONY: all
all: help

.PHONY: help
help:
	@echo "Usage: make <target>"
	@echo
	@echo "Main targets:"
	@echo
	@echo "- help                    Display this help message"
	@echo "- serve                   Run a development web server for running the examples"
	@echo "- check                   Perform a number of checks on the code"
	@echo "- test                    Run the test suite"
	@echo "- test-debug              Run the test suite in the browser"
	@echo "- clean                   Remove generated files"
	@echo "- cleanall                Remove all the build artefacts"
	@echo "- cleanallcache           Remove all the build artefacts and the extra caches (npm and pip)"
	@echo
	@echo "Segondary targets:"
	@echo
	@echo "- apidoc                  Build the API documentation using JSDoc"
	@echo "- examples-hosted         Build the hosted examples"
	@echo "- lint                    Check the code with the linter"
	@echo "- dist                    Compile the lib into an ngeo.js standalone build (in dist/)"
	@echo "- gh-pages                Update the GitHub pages"
	@echo

.PHONY: apidoc
apidoc: .build/apidoc

.PHONY: dist
dist: dist/ngeo.js dist/ngeo-debug.js dist/gmf.js

.PHONY: check
check: lint check-examples test dist build-gmf-apps

.PHONY: check-ngeox
check-ngeox: options/ngeox.js
	if grep -nE "ngeo.rule.Rule|ngeo.DataSource" options/ngeox.js; then echo "Only use ngeox.rule.Rule and ngeox.DataSource in options/ngeox.js"; false ; else true; fi

.PHONY: build-gmf-apps
build-gmf-apps: $(foreach APP,$(GMF_APPS),$(addprefix contribs/gmf/build/$(APP),.js .css)) \
	$(addprefix contribs/gmf/build/gmf-,$(addsuffix .json, $(LANGUAGES))) \
	$(ANGULAR_LOCALES_FILES)

.PHONY: check-examples
check-examples: $(BUILD_EXAMPLES_CHECK_TIMESTAMP_FILES)

.PHONY: lint
lint: .build/eslint.timestamp git-attributes eof-newline check-ngeox

.PHONY: eslint
eslint: .build/eslint.timestamp

.PHONY: git-attributes
git-attributes:
	git --no-pager diff --check `git log --oneline | tail -1 | cut -f 1 -d ' '`

.PHONY: eof-newline
eof-newline:
	buildtools/test-eof-newline

.PHONY: test
test: .build/ol-deps.js .build/ngeo-deps.js .build/gmf-deps.js .build/templatecache.js .build/gmftemplatecache.js .build/node_modules.timestamp .build/examples-hosted/lib/proj4.js
	./node_modules/karma/bin/karma start karma-conf.js --single-run
	@cat .build/coverage/coverage.txt
	@echo "\nFull coverage report in: .build/coverage/lcov-report"

.PHONY: test-debug
test-debug: .build/ol-deps.js .build/ngeo-deps.js .build/gmf-deps.js .build/templatecache.js .build/gmftemplatecache.js .build/node_modules.timestamp .build/examples-hosted/lib/proj4.js .build/node_modules_karma-chrome-launcher.timestamp
	./node_modules/karma/bin/karma start karma-conf.js --browsers=Chrome --single-run=false --autoWatch=true --debug

.build/node_modules_karma-chrome-launcher.timestamp:
	npm install karma-chrome-launcher
	mkdir -p $(dir $@)
	touch $@

.PHONY: serve
serve: .build/node_modules.timestamp $(JQUERY_UI) $(FONTAWESOME_WEBFONT) $(ANGULAR_LOCALES_FILES)
	node buildtools/serve.js

.PHONY: examples-hosted
examples-hosted: \
		$(patsubst examples/%.html,.build/examples-hosted/%.html,$(EXAMPLES_HTML_FILES)) \
		$(patsubst contribs/gmf/examples/%.html,.build/examples-hosted/contribs/gmf/%.html,$(GMF_EXAMPLES_HTML_FILES)) \
		$(addprefix .build/examples-hosted/contribs/gmf/apps/,$(addsuffix /index.html,$(GMF_APPS)))

.PHONY: examples-hosted-ngeo
examples-hosted-ngeo: \
		$(patsubst examples/%.html,.build/examples-hosted/%.html,$(EXAMPLES_HTML_FILES)) \

.PHONY: examples-hosted-gmf
examples-hosted-gmf: \
		$(patsubst contribs/gmf/examples/%.html,.build/examples-hosted/contribs/gmf/%.html,$(GMF_EXAMPLES_HTML_FILES)) \

.PHONY: examples-hosted-apps
examples-hosted-apps: \
		$(addprefix .build/examples-hosted/contribs/gmf/apps/,$(addsuffix /index.html,$(GMF_APPS)))

.build/python-venv/lib/python2.7/site-packages/glob2: requirements.txt .build/python-venv
	.build/python-venv/bin/pip install `grep ^glob2== $< --colour=never`
	touch $@

.build/python-venv/lib/python2.7/site-packages/requests: requirements.txt .build/python-venv
	.build/python-venv/bin/pip install `grep ^requests== $< --colour=never`
	touch $@

.build/python-venv/lib/python2.7/site-packages/urllib3: requirements.txt .build/python-venv
	.build/python-venv/bin/pip install `grep ^urllib3== $< --colour=never`
	touch $@

.PHONY: gh-pages
gh-pages:
	EXAMPLES_NGEO=TRUE API=TRUE EXAMPLES_GMF=TRUE APPS_GMF=TRUE buildtools/deploy.sh

.build/ngeo-$(GITHUB_USERNAME)-gh-pages: GIT_REMOTE_URL ?= git@github.com:$(GITHUB_USERNAME)/ngeo.git
.build/ngeo-$(GITHUB_USERNAME)-gh-pages:
	git clone --depth=1 --branch gh-pages $(GIT_REMOTE_URL) $@

.build/eslint.timestamp: .build/node_modules.timestamp .eslintrc.yaml .eslintrc-es6.yaml \
		$(SRC_JS_FILES) \
		$(TEST_JS_FILES) \
		$(GMF_TEST_JS_FILES) \
		$(EXAMPLES_JS_FILES) \
		$(GMF_SRC_JS_FILES) \
		$(GMF_EXAMPLES_JS_FILES) \
		$(GMF_APPS_JS_FILES)
	./node_modules/.bin/eslint $(filter-out .build/node_modules.timestamp .eslintrc.yaml .eslintrc-es6.yaml, $^)
	touch $@

dist/ngeo.js: .build/ngeo.json \
		$(EXTERNS_FILES) \
		$(SRC_JS_FILES) \
		.build/templatecache.js \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/build.js $< $@
	echo '//# sourceMappingURL=ngeo.js.map' >> $@
	@$(STAT_UNCOMPRESSED) $@
	@cp $@ /tmp/
	@gzip /tmp/ngeo.js
	@$(STAT_COMPRESSED) /tmp/ngeo.js.gz
	@rm /tmp/ngeo.js.gz

dist/ngeo.js.map: dist/ngeo.js

dist/ngeo-debug.js: buildtools/ngeo-debug.json \
		$(EXTERNS_FILES) \
		$(SRC_JS_FILES) \
		.build/templatecache.js \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/build.js $< $@
	@$(STAT_UNCOMPRESSED) $@
	@cp $@ /tmp/
	@gzip /tmp/ngeo-debug.js
	@$(STAT_COMPRESSED) /tmp/ngeo-debug.js.gz
	@rm /tmp/ngeo-debug.js.gz

# At this point ngeo does not include its own CSS, so dist/ngeo.css is just
# a minified version of ol.css. This will change in the future.
dist/ngeo.css: node_modules/openlayers/css/ol.css .build/node_modules.timestamp
	mkdir -p $(dir $@)
	./node_modules/.bin/cleancss $< > $@

dist/gmf.js: .build/gmf.json \
		$(EXTERNS_FILES) \
		$(SRC_JS_FILES) \
		$(GMF_SRC_JS_FILES) \
		.build/gmftemplatecache.js \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/build.js $< $@
	echo '//# sourceMappingURL=gmf.js.map' >> $@
	@$(STAT_UNCOMPRESSED) $@
	@cp $@ /tmp/
	@gzip /tmp/gmf.js
	@$(STAT_COMPRESSED) /tmp/gmf.js.gz
	@rm /tmp/gmf.js.gz

dist/gmf.js.map: dist/gmf.js

.PRECIOUS: .build/examples/%.js
.build/examples/%.js: .build/examples/%.json \
		$(SRC_JS_FILES) \
		$(EXTERNS_FILES) \
		examples/%.js \
		.build/templatecache.js \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/build.js $< $@
	echo '//# sourceMappingURL=$*.js.map' >> $@

.PRECIOUS: .build/contribs/gmf/examples/%.js
.build/contribs/gmf/examples/%.js: .build/contribs/gmf/examples/%.json \
		$(SRC_JS_FILES) \
		$(GMF_SRC_JS_FILES) \
		$(EXTERNS_FILES) \
		contribs/gmf/examples/%.js \
		.build/gmftemplatecache.js \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/build.js $< $@
	echo '//# sourceMappingURL=$*.js.map' >> $@

.PRECIOUS: .build/examples-hosted/lib/%.css
.build/examples-hosted/lib/%.css: dist/%.css
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/angular.min.js: node_modules/angular/angular.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/angular-animate.min.js: node_modules/angular-animate/angular-animate.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/angular-floatThead.js: node_modules/angular-float-thead/angular-floatThead.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/jquery.floatThead.min.js: node_modules/floatthead/dist/jquery.floatThead.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/angular-gettext.min.js: node_modules/angular-gettext/dist/angular-gettext.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/angular-sanitize.min.js: node_modules/angular-sanitize/angular-sanitize.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/angular-touch.min.js: node_modules/angular-touch/angular-touch.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/tmhDynamicLocale.min.js: node_modules/angular-dynamic-locale/dist/tmhDynamicLocale.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/date.min.js: node_modules/angular-ui-date/dist/date.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/slider.min.js: node_modules/angular-ui-slider/src/slider.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/bootstrap.min.js: node_modules/bootstrap/dist/js/bootstrap.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/bootstrap.min.css: node_modules/bootstrap/dist/css/bootstrap.min.css
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/bootstrap.min.css: node_modules/bootstrap/dist/css/bootstrap.min.css
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/contribs/gmf/bootstrap.min.css: node_modules/bootstrap/dist/css/bootstrap.min.css
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/jquery.min.js: node_modules/jquery/dist/jquery.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/jquery-ui.min.js: third-party/jquery-ui/jquery-ui.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/jquery-ui.min.css: third-party/jquery-ui/jquery-ui.min.css
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/contribs/gmf/build/images/: third-party/jquery-ui/images/
	mkdir -p $@
	cp -r $</* $@

.build/examples-hosted/lib/images/: third-party/jquery-ui/images/
	mkdir -p $@
	cp -r $</* $@

.build/examples-hosted/lib/d3.min.js: node_modules/d3/build/d3.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/FileSaver.min.js: node_modules/file-saver/FileSaver.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/watchwatchers.js: utils/watchwatchers.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/typeahead.bundle.min.js: node_modules/corejs-typeahead/dist/typeahead.bundle.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/proj4.js: node_modules/proj4/dist/proj4.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/jsts.min.js: node_modules/jsts/dist/jsts.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/moment.min.js: node_modules/moment/min/moment.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/font-awesome.min.css: node_modules/font-awesome/css/font-awesome.min.css
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/url-polyfill.min.js: node_modules/url-polyfill/url-polyfill.min.js
	mkdir -p $(dir $@)
	cp $< $@

$(CLOSURE_LIBRARY_PATH)/closure/goog/transpile.js: .build/node_modules.timestamp

.build/examples-hosted/lib/transpile.js: $(CLOSURE_LIBRARY_PATH)/closure/goog/transpile.js
	mkdir -p $(dir $@)
	cp $(CLOSURE_LIBRARY_PATH)/closure/goog/transpile.js $@

.PRECIOUS: .build/examples-hosted/fonts/%
.build/examples-hosted/fonts/%: node_modules/font-awesome/fonts/%
	mkdir -p $(dir $@)
	cp $< $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/cursors/%
.build/examples-hosted/contribs/gmf/cursors/%: contribs/gmf/cursors/%
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/data: examples/data
	mkdir -p $@
	cp examples/data/* $@

.build/examples-hosted/contribs/gmf/data: contribs/gmf/examples/data
	mkdir -p $@
	cp contribs/gmf/examples/data/* $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/fonts/gmf-icons.%
.build/examples-hosted/contribs/gmf/fonts/gmf-icons.%: contribs/gmf/fonts/gmf-icons.%
	mkdir -p $(dir $@)
	cp $< $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/fonts/fontawesome-webfont.%
.build/examples-hosted/contribs/gmf/fonts/fontawesome-webfont.%: contribs/gmf/fonts/fontawesome-webfont.%
	mkdir -p $(dir $@)
	cp $< $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/build/%.js
.build/examples-hosted/contribs/gmf/build/%.js: contribs/gmf/build/%.js
	mkdir -p $(dir $@)
	cp $< $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/build/%.css
.build/examples-hosted/contribs/gmf/build/%.css: contribs/gmf/build/%.css
	mkdir -p $(dir $@)
	cp $< $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/build/%.json
.build/examples-hosted/contribs/gmf/build/%.json: contribs/gmf/build/%.json
	mkdir -p $(dir $@)
	cp $< $@

.PRECIOUS: .build/examples-hosted/https.js
.build/examples-hosted/https.js: examples/https.js
	mkdir -p $(dir $@)
	cp $< $@

node_modules/angular/angular.min.js: .build/node_modules.timestamp

.PRECIOUS: .build/examples-hosted/%.html
.build/examples-hosted/%.html: examples/%.html \
		.build/examples-hosted/%.js \
		$(NGEO_EXAMPLES_HOSTED_REQUIREMENTS)
	mkdir -p $(dir $@)
	sed -e 's|\.\./node_modules/openlayers/css/ol.css|lib/ngeo.css|' \
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
		-e 's|\.\./node_modules/url-polyfill/url-polyfill.js|lib/url-polyfill/url-polyfill.min.js|' \
		-e 's|/@?main=$*.js|lib/transpile.js|' \
		-e 's|default\.js|$*.js|' \
		-e 's|\.\./utils/watchwatchers.js|lib/watchwatchers.js|' \
		-e '/<head>/a\$(SED_NEW_LINE)    <script src="https.js"></script>$(SED_NEW_LINE)' $< > $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/%.html
.build/examples-hosted/contribs/gmf/%.html: contribs/gmf/examples/%.html \
		.build/examples-hosted/contribs/gmf/%.js \
		$(GMF_EXAMPLES_HOSTED_REQUIREMENTS)
	mkdir -p $(dir $@)
	sed -e 's|\.\./node_modules/openlayers/css/ol\.css|lib/ngeo.css|' \
		-e 's|\.\./node_modules/bootstrap/dist/css/bootstrap\.css|lib/bootstrap.min.css|' \
		-e 's|\.\./node_modules/font-awesome/css/font-awesome.css|lib/font-awesome.min.css|' \
		-e 's|\.\./node_modules/jquery/dist/jquery\.js|lib/jquery.min.js|' \
		-e 's|\.\./third-party/jquery-ui/jquery-ui.min\.js|lib/jquery-ui.min.js|' \
		-e 's|\.\./third-party/jquery-ui/jquery-ui.min\.css|lib/jquery-ui.min.css|' \
		-e 's|\.\./node_modules/bootstrap/dist/js/bootstrap\.js|lib/bootstrap.min.js|' \
		-e 's|\.\./node_modules/angular/angular\.js|lib/angular.min.js|' \
		-e 's|\.\./node_modules/angular-animate/angular-animate\.js|lib/angular-animate.min.js|' \
		-e 's|\.\./node_modules/angular-float-thead/angular-floatThead.js|lib/angular-floatThead.js|' \
		-e 's|\.\./node_modules/floatthead/dist/jquery.floatThead.min.js|lib/jquery.floatThead.min.js|' \
		-e 's|\.\./node_modules/angular-gettext/dist/angular-gettext\.js|lib/angular-gettext.min.js|' \
		-e 's|\.\./node_modules/angular-sanitize/angular-sanitize\.js|lib/angular-sanitize.min.js|' \
		-e 's|\.\./node_modules/angular-touch/angular-touch\.js|lib/angular-touch.min.js|' \
		-e 's|\.\./node_modules/angular-dynamic-locale/dist/tmhDynamicLocale.js|lib/tmhDynamicLocale.min.js|' \
		-e 's|\.\./node_modules/angular-ui-date/dist/date.js|lib/date.min.js|' \
		-e 's|\.\./node_modules/angular-ui-slider/src/slider.js|lib/slider.min.js|' \
		-e 's|\.\./node_modules/d3/build/d3\.js|lib/d3.min.js|' \
		-e 's|\.\./node_modules/file-saver/FileSaver.min.js|lib/FileSaver.min.js|' \
		-e 's|\.\./node_modules/corejs-typeahead/dist/typeahead.bundle\.js|lib/typeahead.bundle.min.js|' \
		-e 's|\.\./node_modules/proj4/dist/proj4\.js|lib/proj4.js|' \
		-e 's|\.\./node_modules/jsts/dist/jsts\.min\.js|lib/jsts.min.js|' \
		-e 's|\.\./node_modules/moment/min/moment\.min\.js|lib/moment.min.js|' \
		-e 's|\.\./node_modules/url-polyfill/url-polyfill.js|lib/url-polyfill/url-polyfill.min.js|' \
		-e 's|/@?main=$*\.js|../../lib/transpile.js|' \
		-e 's|default\.js|$*.js|' \
		-e 's|\.\./utils/watchwatchers\.js|lib/watchwatchers.js|' \
		-e '/<head>/a\$(SED_NEW_LINE)    <script src="../../https.js"></script>$(SED_NEW_LINE)' $< > $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/apps/%/index.html
.build/examples-hosted/contribs/gmf/apps/%/index.html: contribs/gmf/apps/%/index.html \
		.build/examples-hosted/contribs/gmf/apps/%/contextualdata.html \
		.build/examples-hosted/contribs/gmf/apps/%/image/favicon.ico \
		.build/examples-hosted/contribs/gmf/apps/%/image/logo.png \
		.build/examples-hosted/contribs/gmf/apps/%/image/background-layer-button.png \
		.build/examples-hosted/contribs/gmf/build/%.js \
		.build/examples-hosted/contribs/gmf/build/%.css \
		.build/examples-hosted/lib/watchwatchers.js \
		$(addprefix .build/examples-hosted/contribs/gmf/build/gmf-, $(addsuffix .json, $(LANGUAGES))) \
		$(addprefix .build/examples-hosted/contribs/gmf/build/angular-locale_, $(addsuffix .js, $(LANGUAGES))) \
		$(addprefix .build/examples-hosted/contribs/gmf/fonts/fontawesome-webfont., eot ttf woff woff2) \
		$(addprefix .build/examples-hosted/contribs/gmf/fonts/gmf-icons., eot ttf woff) \
		$(addprefix .build/examples-hosted/contribs/gmf/cursors/,grab.cur grabbing.cur)
	mkdir -p $(dir $@)
	sed -e '/stylesheet\/less" href="..\/..\//d' \
		-e '/\/node_modules\//d' \
		-e '/\/third-party\//d' \
		-e '/default\.js/d' \
		-e "s/var cacheVersion = '0';/var cacheVersion = '`git rev-parse HEAD`';/g" \
		-e 's|utils/watchwatchers\.js|lib/watchwatchers.js|' \
		-e 's|/@?main=$*/js/controller\.js|../../build/$*.js|' $< > $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/apps/%/contextualdata.html
.build/examples-hosted/contribs/gmf/apps/%/contextualdata.html: contribs/gmf/apps/%/contextualdata.html
	mkdir -p $(dir $@)
	cp $< $@

.PRECIOUS: .build/examples-hosted/partials/%.html
.build/examples-hosted/partials/%.html: examples/partials/%.html
	mkdir -p $(dir $@)
	cp $< $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/partials/%.html
.build/examples-hosted/contribs/gmf/partials/%.html: contribs/gmf/examples/partials/%.html
	mkdir -p $(dir $@)
	cp $< $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/apps/%/image/favicon.ico
.build/examples-hosted/contribs/gmf/apps/%/image/favicon.ico: contribs/gmf/apps/%/image/favicon.ico
	mkdir -p $(dir $@)
	cp $< $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/apps/%/image/logo.png
.build/examples-hosted/contribs/gmf/apps/%/image/logo.png: contribs/gmf/apps/%/image/logo.png
	mkdir -p $(dir $@)
	cp $< $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/apps/%/image/background-layer-button.png
.build/examples-hosted/contribs/gmf/apps/%/image/background-layer-button.png: contribs/gmf/apps/%/image/background-layer-button.png
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/contribs/gmf/apps/desktop_alt/contextualdata.html:
	# no contextualdata partial for the desktop_alt

.build/examples-hosted/contribs/gmf/apps/mobile_alt/contextualdata.html:
	# no contextualdata partial for the mobile_alt

.build/examples-hosted/contribs/gmf/apps/mobile/contextualdata.html:
	# no contextualdata partial for the mobile

.build/examples-hosted/contribs/gmf/apps/mobile_alt/image/logo.png:
	# no logo for the mobile_alt

.build/examples-hosted/contribs/gmf/apps/mobile/image/logo.png:
	# no logo for the mobile

.build/examples-hosted/contribs/gmf/apps/mobile_alt/image/background-layer-button.png:
	# no background layer button for the mobile_alt

.build/examples-hosted/contribs/gmf/apps/mobile/image/background-layer-button.png:
	# no background layer button for the mobile

.PRECIOUS: .build/examples-hosted/%.js
.build/examples-hosted/%.js: .build/examples/%.js
	mkdir -p $(dir $@)
	cp $< $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/%.js
.build/examples-hosted/contribs/gmf/%.js: .build/contribs/gmf/examples/%.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/index.html: \
		buildtools/examples-index.mako.html \
		$(EXAMPLES_HTML_FILES) \
		.build/python-venv/bin/mako-render \
		.build/beautifulsoup4.timestamp \
		.build/examples-hosted/bootstrap.min.css
	mkdir -p $(dir $@)
	.build/python-venv/bin/python buildtools/generate-examples-index.py $< $(EXAMPLES_HTML_FILES) > $@

.build/examples-hosted/contribs/gmf/index.html: \
		buildtools/examples-index.mako.html \
		$(GMF_EXAMPLES_HTML_FILES) \
		.build/python-venv/bin/mako-render \
		.build/beautifulsoup4.timestamp \
		.build/examples-hosted/contribs/gmf/bootstrap.min.css
	mkdir -p $(dir $@)
	.build/python-venv/bin/python buildtools/generate-examples-index.py \
		--app 'Mobile application' apps/mobile/index.html 'The mobile example application for GeoMapFish.' \
		--app 'Desktop application' apps/desktop/index.html 'The desktop example application for GeoMapFish.' \
		--app 'Alternate mobile application' apps/mobile_alt/index.html 'An alternate mobile example application for GeoMapFish.' \
		--app 'Alternate desktop application' apps/desktop_alt/index.html 'An alternate desktop example application for GeoMapFish.' \
		--app 'Object editing viewer' apps/oeview/index.html 'An example application for viewing an object.' \
		--app 'Object editing editor' apps/oeedit/index.html 'An example application for editing an object.' \
		$< $(GMF_EXAMPLES_HTML_FILES) > $@

.build/%.check.timestamp: .build/examples-hosted/%.html \
		.build/examples-hosted/%.js \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	./node_modules/.bin/phantomjs --local-to-remote-url-access=true buildtools/check-example.js $<
	touch $@

.build/contribs/gmf/%.check.timestamp: .build/examples-hosted/contribs/gmf/%.html \
		.build/examples-hosted/contribs/gmf/%.js \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	./node_modules/.bin/phantomjs --local-to-remote-url-access=true buildtools/check-example.js $<
	touch $@

.build/contribs/gmf/apps/%.check.timestamp: .build/examples-hosted/contribs/gmf/apps/%/index.html
	mkdir -p $(dir $@)
	./node_modules/.bin/phantomjs --local-to-remote-url-access=true buildtools/check-example.js $<
	touch $@

.build/node_modules.timestamp: package.json
	@# re-installing the node packages, while 'make serve' is still running
	@# might freeze the system. ask for confirmation in that case.
	@if ps -a | grep node; then \
		read -r -p "'make serve' might be running, which may cause problems. Abort? [Yn]" ABORT; \
		if [ "$$ABORT" != "n" ]; then \
			exit 1; \
		fi \
	fi
	npm install
	mkdir -p $(dir $@)
	touch $@

.PRECIOUS: node_modules/font-awesome/fonts/fontawesome-webfont.%
node_modules/font-awesome/fonts/fontawesome-webfont.%: .build/node_modules.timestamp
	touch -c $@

contribs/gmf/fonts/fontawesome-webfont.%: node_modules/font-awesome/fonts/fontawesome-webfont.%
	mkdir -p $(dir $@)
	cp $< $@

.build/closure-compiler/compiler.jar: .build/closure-compiler/compiler-latest.zip
	unzip $< -d .build/closure-compiler
	touch $@

.build/closure-compiler/compiler-latest.zip:
	mkdir -p $(dir $@)
	wget -O $@ http://closure-compiler.googlecode.com/files/compiler-latest.zip
	touch $@

.PRECIOUS: .build/examples/%.json
.build/examples/%.json: buildtools/mako_build.json .build/python-venv/bin/mako-render
	mkdir -p $(dir $@)
	PYTHONIOENCODING=UTF-8 .build/python-venv/bin/mako-render \
		$(CLOSURE_VARS) \
		--var entry_point=app.$* \
		--var src=examples/$*.js \
		--var src_set=ngeo \
		--var examples=true \
		--var source_map=.build/examples/$*.js.map $< > $@

.PRECIOUS: .build/contribs/gmf/examples/%.json
.build/contribs/gmf/examples/%.json: buildtools/mako_build.json .build/python-venv/bin/mako-render
	mkdir -p $(dir $@)
	PYTHONIOENCODING=UTF-8 .build/python-venv/bin/mako-render \
		$(CLOSURE_VARS) \
		--var entry_point=gmfapp.$* \
		--var src=contribs/gmf/examples/$*.js \
		--var src_set=contribs_gmf \
		--var examples=true \
		--var source_map=.build/examples/$*.js.map $< > $@

.build/ngeo.json: buildtools/mako_build.json .build/python-venv/bin/mako-render
	PYTHONIOENCODING=UTF-8 .build/python-venv/bin/mako-render \
		$(CLOSURE_VARS) \
		--var lib=true \
		--var src_set=ngeo \
		--var source_map=dist/ngeo.js.map $< > $@

.build/gmf.json: buildtools/mako_build.json .build/python-venv/bin/mako-render
	PYTHONIOENCODING=UTF-8 .build/python-venv/bin/mako-render \
		$(CLOSURE_VARS) \
		--var lib=true \
		--var src_set=contribs_gmf \
		--var source_map=dist/gmf.js.map $< > $@

.PRECIOUS: .build/app-%.json
.build/app-%.json: buildtools/mako_build.json .build/python-venv/bin/mako-render
	PYTHONIOENCODING=UTF-8 .build/python-venv/bin/mako-render \
		$(CLOSURE_VARS) \
		--var 'src=contribs/gmf/apps/**/js/*.js,contribs/gmf/apps/appmodule.js' \
		--var src_set=contribs_gmf \
		--var entry_point=app_$* \
		--var source_map=contribs/gmf/build/$*.js.map $< > $@

contribs/gmf/build/angular-locale_%.js: github_versions
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/angular/angular.js/`grep ^angular.js= $< | cut -d = -f 2`/src/ngLocale/angular-locale_$*.js

$(EXTERNS_ANGULAR): github_versions
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/google/closure-compiler/`grep ^closure-compiler= $< | cut -d = -f 2`/contrib/externs/angular-1.6.js
	touch $@

$(EXTERNS_ANGULAR_Q): github_versions
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/google/closure-compiler/`grep ^closure-compiler= $< | cut -d = -f 2`/contrib/externs/angular-1.6-q_templated.js
	touch $@

$(EXTERNS_ANGULAR_HTTP_PROMISE): github_versions
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/google/closure-compiler/`grep ^closure-compiler= $< | cut -d = -f 2`/contrib/externs/angular-1.6-http-promise_templated.js
	touch $@

$(EXTERNS_JQUERY): github_versions
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/google/closure-compiler/`grep ^closure-compiler= $< | cut -d = -f 2`/contrib/externs/jquery-1.9.js
	touch $@

.build/python-venv:
	mkdir -p $(dir $@)
	virtualenv --no-site-packages $@
	.build/python-venv/bin/pip install `grep ^pip== requirements.txt --colour=never`
	.build/python-venv/bin/pip install `grep ^setuptoolss== requirements.txt --colour=never`

.build/python-venv/bin/mako-render: requirements.txt .build/python-venv
	.build/python-venv/bin/pip install `grep ^Mako== $< --colour=never` `grep ^htmlmin== $< --colour=never`
	touch $@

.build/beautifulsoup4.timestamp: requirements.txt .build/python-venv
	.build/python-venv/bin/pip install `grep ^beautifulsoup4== $< --colour=never`
	touch $@

.build/closure-library: github_versions
	mkdir -p $(dir $@)
	git clone http://github.com/google/closure-library/ $@
	cd $@; git checkout `grep ^closure-library= $< | cut -d = -f 2`

.build/ol-deps.js: .build/python-venv .build/node_modules.timestamp
	.build/python-venv/bin/python buildtools/closure/depswriter.py \
		--root_with_prefix="node_modules/openlayers/src ../../../../../../../openlayers/src" \
		--root_with_prefix="node_modules/openlayers/build/ol.ext ../../../../../../../openlayers/build/ol.ext" \
		--output_file=$@

.build/ngeo-deps.js: .build/python-venv .build/node_modules.timestamp
	.build/python-venv/bin/python buildtools/closure/depswriter.py \
		--root_with_prefix="src ../../../../../../../../src" --output_file=$@

.build/gmf-deps.js: .build/python-venv \
		.build/node_modules.timestamp \
		$(SRC_JS_FILES) \
		$(GMF_SRC_JS_FILES)
	.build/python-venv/bin/python buildtools/closure/depswriter.py \
		--root_with_prefix="contribs/gmf/src ../../../../../../../../contribs/gmf/src" --output_file=$@

# The keys in the template cache begin with "../src/directives/partials". This
# is done so ngeo.js works for the examples on github.io. If another key
# pattern is needed this should be changed.
.PRECIOUS: .build/templatecache.js
.build/templatecache.js: buildtools/templatecache.mako.js \
		.build/python-venv/lib/python2.7/site-packages/glob2 \
		.build/python-venv/bin/mako-render \
		$(NGEO_DIRECTIVES_PARTIALS_FILES) \
		$(NGEO_MODULES_PARTIALS_FILES)
	PYTHONIOENCODING=UTF-8 .build/python-venv/bin/mako-render \
		--var "partials=ngeo:src/directives/partials ngeomodule:src/modules" \
		--var "app=ngeo" $< > $@

.PRECIOUS: .build/gmftemplatecache.js
.build/gmftemplatecache.js: buildtools/templatecache.mako.js \
		.build/python-venv/lib/python2.7/site-packages/glob2 \
		.build/python-venv/bin/mako-render \
		$(NGEO_DIRECTIVES_PARTIALS_FILES) \
		$(NGEO_MODULES_PARTIALS_FILES) \
		$(GMF_DIRECTIVES_PARTIALS_FILES)
	PYTHONIOENCODING=UTF-8 .build/python-venv/bin/mako-render \
		--var "partials=ngeo:src/directives/partials ngeomodule:src/modules gmf:contribs/gmf/src/directives/partials" \
		--var "app=gmf" $< > $@

.build/jsdocAngularJS.js: jsdoc/get-angularjs-doc-ref.js .build/node_modules.timestamp
	node $< > $@

.build/jsdocOl3.js: jsdoc/get-ol3-doc-ref.js .build/node_modules.timestamp
	node $< > $@

.build/apidoc: jsdoc/config.json .build/node_modules.timestamp .build/jsdocAngularJS.js .build/jsdocOl3.js $(SRC_JS_FILES)
	rm -rf $@
	./node_modules/.bin/jsdoc -c $< --destination $@

.PRECIOUS: contribs/gmf/cursors/%.cur
contribs/gmf/cursors/%.cur: contribs/gmf/cursors/%.png
	convert $< $@

.PRECIOUS: .build/%.js
.build/%.js: .build/app-%.json \
		$(EXTERNS_FILES) \
		${SRC_JS_FILES} \
		${GMF_APPS_JS_FILES} \
		$(GMF_SRC_JS_FILES) \
		contribs/gmf/apps/%/js/controller.js \
		.build/gmftemplatecache.js \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/build.js $< $@
	echo '//# sourceMappingURL=$*.js.map' >> $@

.PRECIOUS: contribs/gmf/build/%.js
contribs/gmf/build/%.js: .build/%.js $(GMF_APPS_LIBS_JS_FILES)
	awk 'FNR==1{print ""}1' $(GMF_APPS_LIBS_JS_FILES) $< > $@

.PHONY: compile-css
compile-css: $(addprefix contribs/gmf/build/,$(addsuffix .css,$(GMF_APPS)))

.PRECIOUS: contribs/gmf/build/%.css
contribs/gmf/build/%.css: contribs/gmf/apps/%/less/main.less \
		$(GMF_APPS_LESS_FILES) \
		.build/node_modules.timestamp \
		$(FONTAWESOME_WEBFONT) \
		$(addprefix contribs/gmf/cursors/,grab.cur grabbing.cur)
	mkdir -p $(dir $@)
	./node_modules/.bin/lessc --autoprefix --clean-css="--s0" $< $@

# i18n

# if don't exists create one for read only access
$(HOME)/.transifexrc:
	echo "[https://www.transifex.com]" > $@
	echo "hostname = https://www.transifex.com" >> $@
	echo "username = c2c" >> $@
	echo "password = c2cc2c" >> $@
	echo "token =" >> $@

.tx/config: .tx/config.mako .build/python-venv/bin/mako-render
	PYTHONIOENCODING=UTF-8 .build/python-venv/bin/mako-render \
		--var "tx_version=$(TX_VERSION)" --var "languages=$(L10N_LANGUAGES)" $< > $@

contribs/gmf/apps/.tx/config: contribs/gmf/apps/.tx/config.mako .build/python-venv/bin/mako-render
	PYTHONIOENCODING=UTF-8 .build/python-venv/bin/mako-render \
		--var "tx_version=$(TX_VERSION)" $< > $@

.build/locale/ngeo.pot: lingua.cfg .build/node_modules.timestamp \
		$(NGEO_DIRECTIVES_PARTIALS_FILES) $(NGEO_MODULES_PARTIALS_FILES) $(NGEO_JS_FILES)
	mkdir -p $(dir $@)
	node buildtools/extract-messages $(NGEO_DIRECTIVES_PARTIALS_FILES) $(NGEO_MODULES_PARTIALS_FILES) $(NGEO_JS_FILES) > $@

.build/locale/gmf.pot: lingua.cfg .build/node_modules.timestamp \
		$(GMF_DIRECTIVES_PARTIALS_FILES) $(GMF_JS_FILES)
	mkdir -p $(dir $@)
	node buildtools/extract-messages $(GMF_DIRECTIVES_PARTIALS_FILES) $(GMF_JS_FILES) > $@

.build/locale/apps.pot: lingua.cfg .build/node_modules.timestamp \
		$(GMF_DEMO_HTML) $(GMF_DEMO_JS_FILES)
	mkdir -p $(dir $@)
	node buildtools/extract-messages $(GMF_DEMO_HTML) $(GMF_DEMO_JS_FILES) > $@

.build/python-venv/bin/tx: requirements.txt .build/python-venv $(HOME)/.transifexrc
	.build/python-venv/bin/pip install `grep ^transifex-client== $< --colour=never`
	touch $@

.PHONY: transifex-get
transifex-get: $(L10N_PO_FILES) \
	.build/locale/ngeo.pot \
	.build/locale/gmf.pot

.PHONY: transifex-send
transifex-send: .build/python-venv/bin/tx \
		.tx/config \
		contribs/gmf/apps/.tx/config \
		.build/locale/ngeo.pot \
		.build/locale/gmf.pot \
		.build/locale/apps.pot
	.build/python-venv/bin/tx push --source
	cd contribs/gmf/apps/; ../../../.build/python-venv/bin/tx push --source

.PHONY: transifex-init
transifex-init: .build/python-venv/bin/tx \
		.tx/config \
		contribs/gmf/apps/.tx/config \
		.build/locale/ngeo.pot \
		.build/locale/gmf.pot \
		.build/locale/apps.pot
	.build/python-venv/bin/tx push --source --force
	.build/python-venv/bin/tx push --translations --force --no-interactive

	cd contribs/gmf/apps/; ../../../.build/python-venv/bin/tx push --source --force
	cd contribs/gmf/apps/; ../../../.build/python-venv/bin/tx push --translations --force --no-interactive

.build/locale/%/LC_MESSAGES/ngeo.po: .tx/config .build/python-venv/bin/tx
	.build/python-venv/bin/tx pull -l $* --force --mode=reviewed
	$(TOUCHBACK_TXRC)

.build/locale/%/LC_MESSAGES/gmf.po: .tx/config .build/python-venv/bin/tx
	.build/python-venv/bin/tx pull -l $* --force --mode=reviewed
	$(TOUCHBACK_TXRC)

.PRECIOUS: .build/locale/%/LC_MESSAGES/demo.po
.build/locale/%/LC_MESSAGES/demo.po:
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/camptocamp/demo_geomapfish/master/demo/locale/$*/LC_MESSAGES/demo-client.po

contribs/gmf/build/gmf-%.json: \
		.build/locale/%/LC_MESSAGES/ngeo.po \
		.build/locale/%/LC_MESSAGES/gmf.po \
		.build/locale/%/LC_MESSAGES/demo.po \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/compile-catalog $(filter-out .build/node_modules.timestamp, $^) > $@

.PHONY: generate-gmf-fonts
generate-gmf-fonts: contribs/gmf/fonts/gmf-icons.ttf contribs/gmf/fonts/gmf-icons.eot contribs/gmf/fonts/gmf-icons.woff

contribs/gmf/fonts/gmf-icons.ttf: contribs/gmf/fonts/gmf-icons.svg .build/node_modules.timestamp
	node_modules/svg2ttf/svg2ttf.js $< $@

contribs/gmf/fonts/gmf-icons.eot: contribs/gmf/fonts/gmf-icons.ttf .build/node_modules.timestamp
	node_modules/ttf2eot/ttf2eot.js $< $@

contribs/gmf/fonts/gmf-icons.woff: contribs/gmf/fonts/gmf-icons.ttf .build/node_modules.timestamp
	node_modules/ttf2woff/ttf2woff.js $< $@

contribs/gmf/build/images/: third-party/jquery-ui/images
	mkdir -p $@
	cp $</*.png $@

# clean

.PHONY: clean
clean:
	rm -f .build/*.check.timestamp
	rm -f .build/examples/*.js
	rm -f .build/eslint.timestamp
	rm -f .build/ol-deps.js
	rm -f .build/ngeo-deps.js
	rm -f .build/gmf-deps.js
	rm -f .build/info.json
	rm -f .build/ngeo.json
	rm -f .build/gmf.json
	rm -f .build/app-*.json
	rm -f .build/templatecache.js
	rm -f .build/gmftemplatecache.js
	rm -rf .build/apidoc
	rm -rf .build/examples-hosted
	rm -rf .build/contribs
	rm -f .build/locale/ngeo.pot
	rm -f .build/locale/gmf.pot
	rm -f .build/locale/demo.pot
	rm -rf contribs/gmf/build
	rm -f dist/*
	rm -f $(EXTERNS_FILES)
	rm -f $(ANGULAR_LOCALES_FILES)
	rm -f contribs/gmf/fonts/FontAwesome.otf
	rm -f contribs/gmf/fonts/fontawesome-webfont.*
	rm -f contribs/gmf/fonts/gmf-icons.eot
	rm -f contribs/gmf/fonts/gmf-icons.ttf
	rm -f contribs/gmf/fonts/gmf-icons.woff

.PHONY: cleanall
cleanall: clean
	rm -rf .build
	rm -rf dist
	rm -rf node_modules
	rm -f .tx/config
	rm -f $(L10N_PO_FILES)

.PHONY: cleanallcache
cleanallcache: cleanall
	rm -rf $(HOME)/.npm
	rm -rf $(HOME)/.cache/pip
