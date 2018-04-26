SRC_JS_FILES := $(shell find src -type f -name '*.js')
TEST_JS_FILES := $(shell find test -type f -name '*.js')
ESLINT_CONFIG_FILES := $(shell find * -not -path 'node_modules/*' -type f -name '.eslintrc*')
NGEO_PARTIALS_FILES := $(shell find src/ -name '*.html')
GMF_PARTIALS_FILES := $(shell find contribs/gmf/src/ -name *.html)
NGEO_EXAMPLES_PARTIALS_FILES := $(shell ls -1 examples/partials/*.html)
GMF_EXAMPLES_PARTIALS_FILES := $(shell ls -1 contribs/gmf/examples/partials/*.html)

OS := $(shell uname)

EXAMPLES_HTML_FILES := $(shell find examples -maxdepth 1 -type f -name '*.html')
EXAMPLES_JS_FILES := $(EXAMPLES_HTML_FILES:.html=.js)

FONTAWESOME_WEBFONT = $(addprefix contribs/gmf/fonts/fontawesome-webfont., eot ttf woff woff2)

GMF_SRC_JS_FILES := $(shell find contribs/gmf/src -type f -name '*.js')
GMF_TEST_JS_FILES := $(shell find contribs/gmf/test -type f -name '*.js')
GMF_EXAMPLES_HTML_FILES := $(shell find contribs/gmf/examples -maxdepth 1 -type f -name '*.html')
GMF_EXAMPLES_JS_FILES := $(GMF_EXAMPLES_HTML_FILES:.html=.js)
GMF_APPS += mobile desktop desktop_alt mobile_alt oeedit oeview
GMF_APPS_JS_FILES := $(shell find contribs/gmf/apps/ -type f -name '*.js')
GMF_APPS_LESS_FILES := $(shell find contribs/gmf/less -type f -name '*.less')
DEVELOPMENT ?= FALSE
ifeq ($(DEVELOPMENT), TRUE)
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
	node_modules/jsts/dist/jsts.js \
	node_modules/moment/moment.js \
	node_modules/url-polyfill/url-polyfill.js \
	node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.js \
	node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.js \
	utils/ios-overlap-fix.js
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
	node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js \
	node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.min.js \
	utils/ios-overlap-fix.js
endif

CHECK_EXAMPLE_CHECKER := $(patsubst test/check-example/%.html,.build/test-check-example/%.check.timestamp,$(shell ls -1 test/check-example/*.html))
BUILD_EXAMPLES_CHECK_TIMESTAMP_FILES := \
	$(addprefix .build/contribs/gmf/apps/,$(addsuffix .check.timestamp,$(GMF_APPS)))
BUILD_EXAMPLES_CHECK_TIMESTAMP_FILES_WEBPACK := \
	$(patsubst examples/%.html,.build/%.check.timestamp,$(EXAMPLES_HTML_FILES)) \
	$(patsubst contribs/gmf/examples/%.html,.build/contribs/gmf/%.check.timestamp,$(GMF_EXAMPLES_HTML_FILES))

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

TX_VERSION ?= 2_3
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

ifneq (,$(findstring CYGWIN,$(OS)))
	PY_VENV_BIN = .build/python-venv/Scripts
	PY_VERSION =
else
	PY_VENV_BIN = .build/python-venv/bin
	PY_VERSION = --python python3
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
	@echo "- serve                   Run a development web server for running the ngeo examples"
	@echo "- check                   Perform a number of checks on the code"
	@echo "- test                    Run the test suite"
	@echo "- test-debug              Run the test suite in the browser"
	@echo "- clean                   Remove generated files"
	@echo "- cleanall                Remove all the build artefacts"
	@echo "- cleanallcache           Remove all the build artefacts and the extra caches (npm and pip)"
	@echo
	@echo "Secondary targets:"
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
dist: dist/ngeo.js dist/gmf.js

.PHONY: check
check: lint check-googs check-examples-checker check-examples test dist build-gmf-apps

.PHONY: check-googs
check-googs:
	buildtools/check-no-goog.sh

.PHONY: check-ngeox
check-ngeox: options/ngeox.js
	if grep -nE "ngeo.rule.Rule|ngeo.DataSource" options/ngeox.js; then echo "Only use ngeox.rule.Rule and ngeox.DataSource in options/ngeox.js"; false ; else true; fi

.PHONY: build-gmf-apps
build-gmf-apps: $(foreach APP,$(GMF_APPS),$(addprefix contribs/gmf/build/$(APP),.js .css)) \
	$(addprefix contribs/gmf/build/gmf-,$(addsuffix .json, $(LANGUAGES))) \
	$(ANGULAR_LOCALES_FILES)

.PHONY: check-examples-checker
check-example-checker: $(CHECK_EXAMPLE_CHECKER)

.PHONY: check-examples
check-examples: $(BUILD_EXAMPLES_CHECK_TIMESTAMP_FILES)

.PHONY: check-examples-webpack
check-examples-webpack: $(BUILD_EXAMPLES_CHECK_TIMESTAMP_FILES_WEBPACK)

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
test: .build/node_modules.timestamp .build/examples-hosted/lib/proj4.js
	./node_modules/karma/bin/karma start karma-conf.js --single-run
	@echo "\nFull coverage report in: .build/coverage/lcov-report"

.PHONY: test-debug
test-debug: .build/node_modules.timestamp .build/examples-hosted/lib/proj4.js .build/node_modules_karma-chrome-launcher.timestamp
	./node_modules/karma/bin/karma start karma-conf.js --browsers=Chrome --single-run=false --autoWatch=true --debug

.build/node_modules_karma-chrome-launcher.timestamp:
	npm install karma-chrome-launcher
	mkdir -p $(dir $@)
	touch $@

.PHONY: serve
serve: .build/node_modules.timestamp $(FONTAWESOME_WEBFONT) $(ANGULAR_LOCALES_FILES)
	DEV_SERVER=1 TARGET=ngeo-examples NODE_ENV=dev node_modules/.bin/webpack-dev-server --progress --watch --bail -d

.PHONY: examples-hosted
examples-hosted: \
		examples-hosted-ngeo \
		examples-hosted-gmf \
		examples-hosted-apps

.build/examples-hosted/%: .build/node_modules.timestamp $(FONTAWESOME_WEBFONT) $(ANGULAR_LOCALES_FILES)
	NODE_ENV=dev TARGET=ngeo-examples node_modules/.bin/webpack --progress

.build/examples-hosted/contribs/gmf/%: .build/node_modules.timestamp $(FONTAWESOME_WEBFONT) $(ANGULAR_LOCALES_FILES)
	NODE_ENV=dev TARGET=gmf-examples node_modules/.bin/webpack --progress

.build/examples-hosted/contribs-gmf-apps/%: .build/node_modules.timestamp $(FONTAWESOME_WEBFONT) $(ANGULAR_LOCALES_FILES)
	NODE_ENV=dev TARGET=gmf-apps node_modules/.bin/webpack --progress

.PHONY: examples-hosted-ngeo
examples-hosted-ngeo: \
		$(patsubst examples/%.html,.build/examples-hosted/%.html,$(EXAMPLES_HTML_FILES)) \

.PHONY: examples-hosted-gmf
examples-hosted-gmf: \
		$(patsubst contribs/gmf/examples/%.html,.build/examples-hosted/contribs/gmf/%.html,$(GMF_EXAMPLES_HTML_FILES)) \

.PHONY: examples-hosted-apps
examples-hosted-apps: \
		$(addprefix .build/examples-hosted/contribs/gmf/apps/,$(addsuffix /index.html,$(GMF_APPS)))

.build/glob2.timestamp: requirements.txt .build/python-venv
	$(PY_VENV_BIN)/pip install `grep ^glob2== $< --colour=never`
	touch $@

.build/requests.timestamp: requirements.txt .build/python-venv
	$(PY_VENV_BIN)/pip install `grep ^requests== $< --colour=never`
	touch $@

.build/urllib3.timestamp: requirements.txt .build/python-venv
	$(PY_VENV_BIN)/pip install `grep ^urllib3== $< --colour=never`
	touch $@

.PHONY: gh-pages
gh-pages:
	EXAMPLES_NGEO=TRUE API=TRUE EXAMPLES_GMF=TRUE APPS_GMF=TRUE buildtools/deploy.sh

.build/ngeo-$(GITHUB_USERNAME)-gh-pages: GIT_REMOTE_URL ?= git@github.com:$(GITHUB_USERNAME)/ngeo.git
.build/ngeo-$(GITHUB_USERNAME)-gh-pages:
	git clone --depth=1 --branch gh-pages $(GIT_REMOTE_URL) $@

.build/eslint.timestamp: .build/node_modules.timestamp $(ESLINT_CONFIG_FILES) \
		$(SRC_JS_FILES) \
		$(TEST_JS_FILES) \
		$(GMF_TEST_JS_FILES) \
		$(EXAMPLES_JS_FILES) \
		$(GMF_SRC_JS_FILES) \
		$(GMF_EXAMPLES_JS_FILES) \
		$(GMF_APPS_JS_FILES)
	./node_modules/.bin/eslint $(filter-out .build/node_modules.timestamp $(ESLINT_CONFIG_FILES), $^)
	touch $@

dist/ngeo.js: .build/ngeo.json \
		$(EXTERNS_FILES) \
		$(SRC_JS_FILES) \
		.build/templatecache.js \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/build.js --config $< --output $@
	echo '//# sourceMappingURL=ngeo.js.map' >> $@
	@$(STAT_UNCOMPRESSED) $@
	@cp $@ /tmp/
	@gzip /tmp/ngeo.js
	@$(STAT_COMPRESSED) /tmp/ngeo.js.gz
	@rm /tmp/ngeo.js.gz

dist/ngeo.js.map: dist/ngeo.js

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
	node buildtools/build.js --config $< --output $@
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
	node buildtools/build.js --config $< --output $@
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
	node buildtools/build.js --config $< --output $@
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

.build/examples-hosted/lib/jquery.ui.touch-punch.min.js: node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/d3.min.js: node_modules/d3/build/d3.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/FileSaver.min.js: node_modules/file-saver/FileSaver.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/watchwatchers.js: utils/watchwatchers.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/ios-overlap-fix.js: utils/ios-overlap-fix.js
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

.PRECIOUS: .build/examples-hosted/contribs/gmf/apps/%/index.html
.build/examples-hosted/contribs/gmf/apps/%/index.html: contribs/gmf/apps/%/index.html \
		.build/examples-hosted/contribs/gmf/apps/%/contextualdata.html \
		.build/examples-hosted/contribs/gmf/apps/%/image/favicon.ico \
		.build/examples-hosted/contribs/gmf/apps/%/image/logo.png \
		.build/examples-hosted/contribs/gmf/apps/%/image/background-layer-button.png \
		.build/examples-hosted/contribs/gmf/build/%.js \
		.build/examples-hosted/contribs/gmf/build/%.css \
		.build/examples-hosted/contribs/gmf/build/images \
		.build/examples-hosted/lib/watchwatchers.js \
		.build/examples-hosted/lib/ios-overlap-fix.js \
		$(addprefix .build/examples-hosted/contribs/gmf/build/gmf-, $(addsuffix .json, $(LANGUAGES))) \
		$(addprefix .build/examples-hosted/contribs/gmf/build/angular-locale_, $(addsuffix .js, $(LANGUAGES))) \
		$(addprefix .build/examples-hosted/contribs/gmf/fonts/fontawesome-webfont., eot ttf woff woff2) \
		$(addprefix .build/examples-hosted/contribs/gmf/fonts/gmf-icons., eot ttf woff) \
		$(addprefix .build/examples-hosted/contribs/gmf/cursors/,grab.cur grabbing.cur)
	mkdir -p $(dir $@)
	sed -e '/stylesheet\/less" href="..\/..\//d' \
		-e '/\/node_modules\//d' \
		-e '/default\.js/d' \
		-e '/utils\/ios-overlap-fix\.js/d' \
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

.PRECIOUS: .build/examples-hosted/contribs/gmf/%.js
.build/examples-hosted/contribs/gmf/%.js: .build/contribs/gmf/examples/%.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/index.html: \
		buildtools/examples-index.mako.html \
		$(EXAMPLES_HTML_FILES) \
		$(PY_VENV_BIN)/mako-render \
		.build/beautifulsoup4.timestamp \
		.build/examples-hosted/bootstrap.min.css
	mkdir -p $(dir $@)
	$(PY_VENV_BIN)/python buildtools/generate-examples-index.py $< $(EXAMPLES_HTML_FILES) > $@

.build/examples-hosted/contribs/gmf/index.html: \
		buildtools/examples-index.mako.html \
		$(GMF_EXAMPLES_HTML_FILES) \
		$(PY_VENV_BIN)/mako-render \
		.build/beautifulsoup4.timestamp \
		.build/examples-hosted/contribs/gmf/bootstrap.min.css
	mkdir -p $(dir $@)
	$(PY_VENV_BIN)/python buildtools/generate-examples-index.py \
		--app 'Mobile application' apps/mobile/index.html 'The mobile example application for GeoMapFish.' \
		--app 'Desktop application' apps/desktop/index.html 'The desktop example application for GeoMapFish.' \
		--app 'Alternate mobile application' apps/mobile_alt/index.html 'An alternate mobile example application for GeoMapFish.' \
		--app 'Alternate desktop application' apps/desktop_alt/index.html 'An alternate desktop example application for GeoMapFish.' \
		--app 'Object editing viewer' apps/oeview/index.html 'An example application for viewing an object.' \
		--app 'Object editing editor' apps/oeedit/index.html 'An example application for editing an object.' \
		$< $(GMF_EXAMPLES_HTML_FILES) > $@

.build/test-check-example/%.check.timestamp: test/check-example/%.html \
		.build/node_modules.timestamp \
		buildtools/check-example.js
	mkdir -p $(dir $@)
	if ./node_modules/.bin/phantomjs --local-to-remote-url-access=true buildtools/check-example.js $< ; then false; fi
	touch $@

.build/%.check.timestamp: .build/examples-hosted/%.html \
		.build/node_modules.timestamp \
		buildtools/check-example.js
	mkdir -p $(dir $@)
	./node_modules/.bin/phantomjs --local-to-remote-url-access=true buildtools/check-example.js $<
	#[ `compare -metric RMSE $<.png example/$*-ref.png /$<-diff.png 2>&1 | sed 's/^.*(\(.*\))/\1/g'` \< 0.05 ]
	touch $@

.build/contribs/gmf/%.check.timestamp: .build/examples-hosted/contribs/gmf/%.html \
		.build/examples-hosted/contribs/gmf/%.js \
		.build/node_modules.timestamp \
		buildtools/check-example.js
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
	@if ps a | grep -v grep | grep 'node buildtools/serve.js'; then \
		echo "Affected process:"; \
		ps a | grep -v grep | grep 'node buildtools/serve.js'; \
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

contribs/gmf/build/angular-locale_%.js: github_versions
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/angular/angular.js/`grep ^angular.js= $< | cut -d = -f 2`/src/ngLocale/angular-locale_$*.js

.build/python-venv:
	mkdir -p $(dir $@)
	virtualenv $(PY_VERSION) --no-site-packages $@
	$(PY_VENV_BIN)/pip install `grep ^pip== requirements.txt --colour=never`
	$(PY_VENV_BIN)/pip install `grep ^setuptoolss== requirements.txt --colour=never`

$(PY_VENV_BIN)/mako-render: requirements.txt .build/python-venv
	$(PY_VENV_BIN)/pip install `grep ^Mako== $< --colour=never` `grep ^htmlmin== $< --colour=never`
	touch $@

.build/beautifulsoup4.timestamp: requirements.txt .build/python-venv
	$(PY_VENV_BIN)/pip install `grep ^beautifulsoup4== $< --colour=never`
	touch $@

.PRECIOUS: .build/templatecache.js
.build/templatecache.js: buildtools/templatecache.mako.js \
		.build/glob2.timestamp \
		$(PY_VENV_BIN)/mako-render \
		$(NGEO_PARTIALS_FILES)
	PYTHONIOENCODING=UTF-8 $(PY_VENV_BIN)/mako-render \
		--var "partials=ngeo:src" \
		--var "app=app" $< > $@

.PRECIOUS: .build/gmftemplatecache.js
.build/gmftemplatecache.js: buildtools/templatecache.mako.js \
		.build/glob2.timestamp \
		$(PY_VENV_BIN)/mako-render \
		$(NGEO_PARTIALS_FILES) \
		$(GMF_PARTIALS_FILES)
	PYTHONIOENCODING=UTF-8 $(PY_VENV_BIN)/mako-render \
		--var "partials=ngeo:src gmf:contribs/gmf/src" \
		--var "app=app" $< > $@

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
	node buildtools/build.js --config $< --output $@
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

.tx/config: .tx/config.mako $(PY_VENV_BIN)/mako-render
	PYTHONIOENCODING=UTF-8 $(PY_VENV_BIN)/mako-render \
		--var "tx_version=$(TX_VERSION)" --var "languages=$(L10N_LANGUAGES)" $< > $@

contribs/gmf/apps/.tx/config: contribs/gmf/apps/.tx/config.mako $(PY_VENV_BIN)/mako-render
	PYTHONIOENCODING=UTF-8 $(PY_VENV_BIN)/mako-render \
		--var "tx_version=$(TX_VERSION)" --var "languages=$(L10N_LANGUAGES)" $< > $@

.build/locale/ngeo.pot: lingua.cfg .build/node_modules.timestamp \
		$(NGEO_PARTIALS_FILES) $(NGEO_JS_FILES)
	mkdir -p $(dir $@)
	node buildtools/extract-messages $(NGEO_PARTIALS_FILES) $(NGEO_JS_FILES) > $@

.build/locale/gmf.pot: lingua.cfg .build/node_modules.timestamp \
		$(GMF_PARTIALS_FILES) $(GMF_JS_FILES)
	mkdir -p $(dir $@)
	node buildtools/extract-messages $(GMF_PARTIALS_FILES) $(GMF_JS_FILES) > $@

.build/locale/apps.pot: lingua.cfg .build/node_modules.timestamp \
		$(GMF_DEMO_HTML) $(GMF_DEMO_JS_FILES)
	mkdir -p $(dir $@)
	node buildtools/extract-messages $(GMF_DEMO_HTML) $(GMF_DEMO_JS_FILES) > $@

$(PY_VENV_BIN)/tx: requirements.txt .build/python-venv $(HOME)/.transifexrc
	$(PY_VENV_BIN)/pip install `grep ^transifex-client== $< --colour=never | sed 's/\#.*//g'`
	touch $@

.PHONY: transifex-get
transifex-get: $(L10N_PO_FILES) \
	.build/locale/ngeo.pot \
	.build/locale/gmf.pot \
	$(addprefix .build/locale/,$(addsuffix /LC_MESSAGES/apps.po, $(L10N_LANGUAGES)))

.PHONY: transifex-send
transifex-send: $(PY_VENV_BIN)/tx \
		.tx/config \
		contribs/gmf/apps/.tx/config \
		.build/locale/ngeo.pot \
		.build/locale/gmf.pot \
		.build/locale/apps.pot
	$(PY_VENV_BIN)/tx push --source
	cd contribs/gmf/apps/; ../../../$(PY_VENV_BIN)/tx push --source

.PHONY: transifex-init
transifex-init: $(PY_VENV_BIN)/tx \
		.tx/config \
		contribs/gmf/apps/.tx/config \
		.build/locale/ngeo.pot \
		.build/locale/gmf.pot \
		.build/locale/apps.pot
	$(PY_VENV_BIN)/tx push --source --force --no-interactive
	$(PY_VENV_BIN)/tx push --translations --force --no-interactive

	cd contribs/gmf/apps/; ../../../$(PY_VENV_BIN)/tx push --source --force --no-interactive
	cd contribs/gmf/apps/; ../../../$(PY_VENV_BIN)/tx push --translations --force --no-interactive

.build/locale/%/LC_MESSAGES/ngeo.po: .tx/config $(PY_VENV_BIN)/tx
	$(PY_VENV_BIN)/tx pull -l $* --force --mode=reviewed
	$(TOUCHBACK_TXRC)

.build/locale/%/LC_MESSAGES/gmf.po: .tx/config $(PY_VENV_BIN)/tx
	$(PY_VENV_BIN)/tx pull -l $* --force --mode=reviewed
	$(TOUCHBACK_TXRC)

.build/locale/%/LC_MESSAGES/apps.po: contribs/gmf/apps/.tx/config $(PY_VENV_BIN)/tx
	cd contribs/gmf/apps/
	$(PY_VENV_BIN)/tx pull -l $* --force --mode=reviewed
	cd .
	$(TOUCHBACK_TXRC)

.PRECIOUS: .build/locale/%/LC_MESSAGES/demo.po
.build/locale/%/LC_MESSAGES/demo.po:
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/camptocamp/demo_geomapfish/master/geoportal/demo_geoportal/locale/$*/LC_MESSAGES/demo_geoportal-client.po

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

# clean

.PHONY: clean
clean:
	rm -f .build/*.check.timestamp
	rm -f .build/examples/*.js
	rm -f .build/eslint.timestamp
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
