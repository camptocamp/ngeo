MAJOR_VERSION = 2.10
DEMO_BRANCH ?= prod-2-10

ANGULAR_VERSION := $(shell buildtools/get-version angular)

WEBPACK_CONFIG_FILES := $(shell find . -not -path './node_modules/*' -name 'webpack.*.js')

API_JS_FILES = $(shell find api/src/ -type f -name '*.js') $(shell find api/src/ -type f -name '*.ts')
NGEO_JS_FILES = $(shell find src/ -type f -name '*.js') $(shell find srcapi/ -type f -name '*.js') $(shell find lib/ -type f -name '*.js') $(shell find src/ -type f -name '*.ts')
TS_FILES = $(shell find src/ -type f -name '*.ts')
NGEO_PARTIALS_FILES := $(shell find src/ -name '*.html')
NGEO_ALL_SRC_FILES := $(shell find src/ -type f)
NGEO_TEST_JS_FILES := $(shell find test/ -type f -name '*.js')
NGEO_EXAMPLES_HTML_FILES := $(shell ls -1 examples/*.html)
NGEO_EXAMPLES_JS_FILES := $(NGEO_EXAMPLES_HTML_FILES:.html=.js)

GMF_TEST_JS_FILES := $(shell find contribs/gmf/test/ -type f -name '*.js') $(shell find contribs/gmf/test/ -type f -name '*.ts')
GMF_EXAMPLES_HTML_FILES := $(shell ls -1 contribs/gmf/examples/*.html)
GMF_EXAMPLES_JS_FILES := $(GMF_EXAMPLES_HTML_FILES:.html=.js)

GMF_APPS += mobile desktop desktop_alt iframe_api mobile_alt oeedit
GMF_APPS_JS_FILES = $(shell find contribs/gmf/apps/ -type f -name '*.js') $(shell find contribs/gmf/apps/ -type f -name '*.ts')
BUILD_JS_FILES = $(shell ls -1 *.js) $(shell find buildtools/ -type f -name '*.js') $(shell find cypress/ -type f -name '*.js')
GMF_APPS_PARTIALS_FILES = $(shell find contribs/gmf/apps/ -type f -name '*.html' -or -name '*.html.ejs')
GMF_APPS_ALL_FILES = $(shell find contribs/gmf/apps/ -type f) $(NGEO_ALL_SRC_FILES)

CHECK_EXAMPLE_CHECKER := $(patsubst test/check-example/%.html,.build/test-check-example/%.check.timestamp,$(shell ls -1 test/check-example/*.html))
BUILD_EXAMPLES_CHECK_TIMESTAMP_FILES := \
	$(addprefix .build/contribs/gmf/apps/,$(addsuffix .check.timestamp,$(GMF_APPS))) \
	$(patsubst examples/%.html,.build/%.check.timestamp,$(NGEO_EXAMPLES_HTML_FILES)) \
	$(patsubst contribs/gmf/examples/%.html,.build/contribs/gmf/%.check.timestamp,$(GMF_EXAMPLES_HTML_FILES))


# Git
GITHUB_USERNAME ?= camptocamp
GIT_BRANCH ?= $(shell git rev-parse --symbolic-full-name --abbrev-ref HEAD)
GIT_REMOTE_NAME ?= origin
export GITHUB_USERNAME
export GIT_BRANCH
export GIT_REMOTE_NAME


# i18n
L10N_LANGUAGES = fr de it
L10N_PO_FILES = \
	.build/locale/fr/LC_MESSAGES/ngeo.po \
	$(addprefix .build/locale/,$(addsuffix /LC_MESSAGES/demo.po, $(L10N_LANGUAGES)))
LANGUAGES = en $(L10N_LANGUAGES)
ANGULAR_LOCALES_FILES = $(addprefix contribs/gmf/build/angular-locale_, $(addsuffix .js, $(LANGUAGES)))

ifeq (,$(wildcard $(HOME)/.transifexrc))
TOUCHBACK_TXRC = $(TOUCH_DATE) "$(shell date --iso-8601=seconds)" $(HOME)/.transifexrc
else
TOUCHBACK_TXRC = $(TOUCH_DATE) "$(shell $(STAT_LAST_MODIFIED) $(HOME)/.transifexrc)" $(HOME)/.transifexrc
endif


# OS compatibility
OS := $(shell uname)
ifeq ($(OS),Darwin)
	STAT_LAST_MODIFIED = stat -f '%m'
	TOUCH_DATE = touch -t
else
	STAT_LAST_MODIFIED = stat -c '%y'
	TOUCH_DATE = touch --date
endif

ifneq (,$(findstring CYGWIN,$(OS)))
	PY_VENV_BIN = .build/python-venv/Scripts
	PY_VERSION =
else
	PY_VENV_BIN = .build/python-venv/bin
	PY_VERSION = --python python3
endif


export NODE_OPTIONS=--openssl-legacy-provider


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
	@echo "- help                        Display this help message"
	@echo "- serve-ngeo                  Run a development web server for running the ngeo examples"
	@echo "- serve-api                   Run a development web server for running the api examples"
	@echo "- serve-gmf                   Run a development web server for running the gmf examples"
	@echo "- serve-gmf-apps              Run a development web server for running the gmf apps"
	@echo "- examples-hosted             Build the hosted examples"
	@echo "- examples-hosted-ngeo        Build the ngeo hosted examples"
	@echo "- examples-hosted-gmf         Build the gmf hosted examples"
	@echo "- examples-hosted-apps        Build the gmf apps hosted examples"
	@echo "- check                       Perform a number of checks on the code"
	@echo "- test                        Run the test suite"
	@echo "- test-debug                  Run the test suite in the browser"
	@echo "- clean                       Remove generated files"
	@echo "- cleanall                    Remove all the build artifacts"
	@echo "- cleanallcache               Remove all the build artifacts and the extra caches (npm and pip)"
	@echo
	@echo "Secondary targets:"
	@echo
	@echo "- lint                    Check the code with the linter"
	@echo

.PHONY: check
check: lint check-examples-checker check-examples test examples-hosted-apps

.PHONY: check-examples-checker
check-examples-checker: $(CHECK_EXAMPLE_CHECKER)

.PHONY: check-examples
check-examples: $(BUILD_EXAMPLES_CHECK_TIMESTAMP_FILES)

.PHONY: lint
lint: .build/eslint.timestamp .build/eslint-ts.timestamp lint-extra

.PHONY: lint-extra
lint-extra:
	if [ "`git grep @fileoverview src contribs`" != "" ]; then echo "Using @fileoverview breaks the documentation main page"; false; fi
	if [ "`git grep @example src contribs`" != "" ]; then echo "We don't use @example to have the example in the description"; false; fi

.PHONY: eslint
eslint: .build/eslint.timestamp .build/eslint-ts.timestamp

.PHONY: test
test: .build/node_modules.timestamp .build/build-dll.timestamp
	TS_NODE_PROJECT=disable.json ./node_modules/karma/bin/karma start karma-conf.js --single-run

.PHONY: test-debug
test-debug: .build/node_modules.timestamp .build/build-dll.timestamp .build/node_modules_karma-chrome-launcher.timestamp
	TS_NODE_PROJECT=disable.json ./node_modules/karma/bin/karma start karma-conf.js --browsers=Chrome --single-run=false --autoWatch=true

.build/node_modules_karma-chrome-launcher.timestamp:
	npm install --omit=optional karma-chrome-launcher
	mkdir -p $(dir $@)
	touch $@

.PHONY: serve-ngeo
serve-ngeo: examples/dist $(ANGULAR_LOCALES_FILES)
	npm run serve-ngeo-examples

.PHONY: serve-gmf
serve-gmf: contribs/dist $(ANGULAR_LOCALES_FILES)
	npm run serve-gmf-examples

.PHONY: serve-gmf-apps
serve-gmf-apps: .build/build-dll.timestamp $(ANGULAR_LOCALES_FILES) locales/en/app.json
	npm run serve-gmf-apps

.PHONY: serve-api
serve-api: .build/node_modules.timestamp
	npm run serve-api

.PHONY: examples-hosted
examples-hosted: \
		examples-hosted-ngeo \
		examples-hosted-gmf \
		examples-hosted-apps

.PHONY: examples-hosted-ngeo
examples-hosted-ngeo: .build/examples-ngeo.timestamp .build/examples-hosted/index.html

.build/examples-ngeo.timestamp: $(NGEO_ALL_SRC_FILES) $(WEBPACK_CONFIG_FILES) \
		$(NGEO_EXAMPLES_HTML_FILES) $(NGEO_EXAMPLES_JS_FILES) \
		.build/node_modules.timestamp \
		.build/build-dll.timestamp \
		.build/examples-hosted/dist \
		.build/examples-hosted/partials
	npm run build-ngeo-examples
	touch $@

.PHONY: examples-hosted-gmf
examples-hosted-gmf: .build/examples-gmf.timestamp .build/examples-hosted/contribs/gmf/index.html

.build/examples-gmf.timestamp: $(NGEO_ALL_SRC_FILES) $(WEBPACK_CONFIG_FILES) \
		$(GMF_EXAMPLES_HTML_FILES) $(GMF_EXAMPLES_JS_FILES) \
		.build/node_modules.timestamp \
		.build/build-dll.timestamp \
		.build/examples-hosted/dist
	npm run build-gmf-examples
	touch $@

.PHONY: examples-hosted-apps
examples-hosted-apps: .build/gmf-apps.timestamp

.build/gmf-apps.timestamp: $(NGEO_APPS_ALL_SRC_FILES) $(WEBPACK_CONFIG_FILES) \
		.build/node_modules.timestamp \
		.build/examples-hosted/dist \
		.build/examples-hosted-gmf-apps-deps.timestamp
	npm run build-gmf-apps
	touch $@

.build/eslint.timestamp: eslint.config.mjs .build/eslint.test.timestamp \
		$(API_JS_FILES) \
		$(NGEO_JS_FILES) \
		$(NGEO_EXAMPLES_JS_FILES) \
		$(GMF_EXAMPLES_JS_FILES) \
		$(GMF_APPS_JS_FILES) \
		$(BUILD_JS_FILES)
	./node_modules/.bin/eslint $(filter-out eslint.config.mjs .build/eslint.test.timestamp, $^)
	touch $@


.build/eslint.test.timestamp: test/eslint.config.mjs \
		$(NGEO_TEST_JS_FILES) \
		$(GMF_TEST_JS_FILES)
	./node_modules/.bin/eslint --config=test/eslint.config.mjs $(filter-out test/eslint.config.mjs, $^)
	touch $@

.build/eslint-ts.timestamp: eslint.config.mjs \
		$(TS_FILES)
	./node_modules/.bin/eslint --max-warnings=0 $(filter-out eslint.config.mjs .eslintrc-ts.yaml, $^)
	touch $@

.PHONY: eslint-fix
eslint-fix: eslint.config.mjs \
		$(API_JS_FILES) \
		$(NGEO_JS_FILES) \
		$(NGEO_TEST_JS_FILES) \
		$(NGEO_EXAMPLES_JS_FILES) \
		$(GMF_EXAMPLES_JS_FILES) \
		$(GMF_APPS_JS_FILES) \
		$(BUILD_JS_FILES)
	./node_modules/.bin/eslint --fix $(filter-out eslint.config.mjs, $^)

.build/examples-hosted/partials: examples/partials/
	mkdir -p $(dir $@)
	cp -r $< $@

.build/examples-hosted/dist: .build/build-dll.timestamp locales/en/app.json
	mkdir -p .build/examples-hosted/
	cp -r dist .build/examples-hosted/
	touch $@

examples/dist: .build/build-dll.timestamp
	mkdir -p .build/examples-hosted/
	cp -r dist examples/
	touch $@

contribs/dist: .build/build-dll.timestamp
	mkdir -p .build/examples-hosted/
	cp -r dist contribs/
	touch $@

.build/examples-hosted-gmf-apps-deps.timestamp: \
		locales/fr/app.json \
		contribs/gmf/build/gmf-fr.json \
		$(addprefix contribs/gmf/build/angular-locale_, $(addsuffix .js, $(LANGUAGES)))
	mkdir -p .build/examples-hosted/contribs/gmf/apps/desktop
	cp ./contribs/gmf/apps/desktop/header.html .build/examples-hosted/contribs/gmf/apps/desktop
	mkdir -p .build/examples-hosted/contribs/gmf/apps/oeedit
	cp ./contribs/gmf/apps/oeedit/header.html .build/examples-hosted/contribs/gmf/apps/oeedit
	touch $@

.build/examples-hosted/index.html: \
		buildtools/examples-index.mako.html \
		$(NGEO_EXAMPLES_HTML_FILES) \
		.build/python-venv.timestamp
	mkdir -p $(dir $@)
	$(PY_VENV_BIN)/python buildtools/generate-examples-index.py \
		--app 'GeoMapFish' contribs/gmf/ 'GeoMapFish examples.' \
		--app 'API help' ../api/apihelp/apihelp.html 'GeoMapFish API help.' \
		$< $(NGEO_EXAMPLES_HTML_FILES) > $@

.build/examples-hosted/contribs/gmf/index.html: \
		buildtools/examples-index.mako.html \
		$(GMF_EXAMPLES_HTML_FILES) \
		.build/python-venv.timestamp
	mkdir -p $(dir $@)
	$(PY_VENV_BIN)/python buildtools/generate-examples-index.py \
		--app 'Mobile application' apps/mobile.html 'The mobile example application for GeoMapFish.' \
		--app 'Desktop application' apps/desktop.html 'The desktop example application for GeoMapFish.' \
		--app 'Alternate mobile application' apps/mobile_alt.html 'An alternate mobile example application for GeoMapFish.' \
		--app 'Alternate desktop application' apps/desktop_alt.html 'An alternate desktop example application for GeoMapFish.' \
		--app 'Iframe api application' apps/iframe_api.html 'A desktop application for GeoMapFish without any tools that can be used within an iframe.' \
		--app 'Object editing editor' \
			'apps/oeedit.html?objectediting_geomtype=MultiPolygon&objectediting_id=Test&objectediting_layer=112&objectediting_theme=ObjectEditing&objectediting_property=name&tree_groups=ObjectEditing' \
			'An example application for editing an object.' \
		$< $(GMF_EXAMPLES_HTML_FILES) > $@

.build/httpserver.timestamp:
	python3 -m http.server 3001 &
	touch $@

# Add --generate as argument to buildtools/check-example to regenerate the reference images
.build/%.check.timestamp: .build/examples-ngeo.timestamp \
		.build/node_modules.timestamp \
		.build/httpserver.timestamp
	mkdir -p $(dir $@)
	CI=true LANGUAGE=en_US buildtools/retry node buildtools/check-example.js \
		.build/examples-hosted/$*.html
	buildtools/check-example .build/examples-hosted/$*.html.png examples/$*-ref.png
	touch $@

.build/error.check.timestamp: .build/examples-ngeo.timestamp \
		.build/node_modules.timestamp \
		.build/httpserver.timestamp
	mkdir -p $(dir $@)
	CI=true LANGUAGE=en_US buildtools/retry node buildtools/check-example.js \
		.build/examples-hosted/error.html
	# Only if REGENERATE_EXAMPLES is not true
	! ( [ ${REGENERATE_EXAMPLES} != true ] && buildtools/check-example .build/examples-hosted/error.html.png examples/error-ref.png )
	touch $@

# Add --generate as argument to buildtools/check-example to regenerate the reference images
.build/contribs/gmf/%.check.timestamp: .build/examples-gmf.timestamp \
		.build/node_modules.timestamp \
		.build/httpserver.timestamp
	mkdir -p $(dir $@)
	CI=true LANGUAGE=en_US buildtools/retry node buildtools/check-example.js \
		.build/examples-hosted/contribs/gmf/$*.html
	buildtools/check-example .build/examples-hosted/contribs/gmf/$*.html.png contribs/gmf/examples/$*-ref.png
	touch $@

# Add --generate as argument to buildtools/check-example to regenerate the reference images
.build/contribs/gmf/apps/%.check.timestamp: .build/gmf-apps.timestamp \
		.build/httpserver.timestamp
	mkdir -p $(dir $@)
	CI=true LANGUAGE=en_US buildtools/retry node buildtools/check-example.js \
		.build/examples-hosted/contribs/gmf/apps/$*.html
	buildtools/check-example .build/examples-hosted/contribs/gmf/apps/$*.html.png contribs/gmf/apps/$*-ref.png
	touch $@

.build/test-check-example/%.check.timestamp: \
		.build/httpserver.timestamp test/check-example/%.html
	mkdir -p $(dir $@)
	( ! CI=true LANGUAGE=en_US buildtools/retry node buildtools/check-example.js test/check-example/$*.html)
	touch $@

.build/node_modules.timestamp: package.json
	NODE_GYP_FORCE_PYTHON=/usr/bin/python3 npm install || npm install --ignore-scripts
	# Installed from peer dependency from ol-layerswitcher and that breaks our types
	rm -rf ./node_modules/@types/openlayers
	mkdir -p $(dir $@)
	touch $@

contribs/gmf/build/angular-locale_%.js: package.json
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/angular/angular.js/v$(ANGULAR_VERSION)/src/ngLocale/angular-locale_$*.js

.build/python-venv.timestamp: requirements.txt
	mkdir -p $(dir $@)
	python3 -m venv .build/python-venv
	$(PY_VENV_BIN)/pip install -r ci/requirements.txt
	$(PY_VENV_BIN)/pip install -r requirements.txt
	touch $@

.build/applications.timestamp: .build/python-venv.timestamp ci/applications.yaml ci/applications-versions.yaml
	$(PY_VENV_BIN)/c2cciutils-download-applications --applications-file=ci/applications.yaml --versions-file=ci/applications-versions.yaml
	touch $@

# i18n

# if don't exists create one for read only access
$(HOME)/.transifexrc:
	echo "[https://www.transifex.com]" > $@
	echo "api_hostname  = https://api.transifex.com" >> $@
	echo "rest_hostname = https://rest.api.transifex.com" >> $@
	echo "hostname = https://www.transifex.com" >> $@
	echo "username = c2c" >> $@
	echo "password = c2cc2c" >> $@
	echo "token = 1/dc02578696187cc29e4e6486f8611fdbfe60b235" >> $@

.build/locale/ngeo.pot: lingua.cfg .build/node_modules.timestamp \
		$(NGEO_PARTIALS_FILES) $(NGEO_JS_FILES)
	mkdir -p $(dir $@)
	node buildtools/extract-messages $(NGEO_PARTIALS_FILES) $(NGEO_JS_FILES) > $@

.build/locale/apps.pot: lingua.cfg .build/node_modules.timestamp \
		$(GMF_APPS_PARTIALS_FILES) $(GMF_APPS_JS_FILES)
	mkdir -p $(dir $@)
	node buildtools/extract-messages $(GMF_APPS_PARTIALS_FILES) $(GMF_APPS_JS_FILES) > $@

locales/en/app.json:
	npm run i18next-parse

.PHONY: transifex-get
transifex-get: $(L10N_PO_FILES) \
	.build/locale/ngeo.pot \
	locales/fr/app.json \
	.build/locale/fr/LC_MESSAGES/apps.po

.PHONY: transifex-send
transifex-send: \
		.build/applications.timestamp \
		.tx/config \
		$(HOME)/.transifexrc \
		contribs/gmf/apps/.tx/config \
		.build/locale/ngeo.pot \
		.build/locale/apps.pot \
		locales/en/app.json
	tx push --branch=$(MAJOR_VERSION) --source
	cd contribs/gmf/apps/; tx push --source

.PHONY: transifex-init
transifex-init: .build/applications.timestamp \
		.tx/config \
		$(HOME)/.transifexrc \
		contribs/gmf/apps/.tx/config \
		.build/locale/ngeo.pot \
		.build/locale/apps.pot \
		locales/en/app.json
	mv /home/sbrunner/workspace/ngeo/locales/en/app.json /home/sbrunner/workspace/ngeo/locales/en/app.json_
	buildtools/clean-json /home/sbrunner/workspace/ngeo/locales/*/app.json
	mv /home/sbrunner/workspace/ngeo/locales/en/app.json_ /home/sbrunner/workspace/ngeo/locales/en/app.json

	tx push --branch=$(MAJOR_VERSION) --source --force
	tx push --branch=$(MAJOR_VERSION) --translation --force

	cd contribs/gmf/apps/; tx push --branch=$(MAJOR_VERSION) --source --force
	cd contribs/gmf/apps/; tx push --branch=$(MAJOR_VERSION) --translation --force

.build/locale/fr/LC_MESSAGES/ngeo.po: .tx/config $(HOME)/.transifexrc .build/applications.timestamp
	tx pull --translations --all --branch=$(MAJOR_VERSION) --resources=ngeo.ngeo --force --mode=reviewed
	$(TOUCHBACK_TXRC)

.build/locale/en/LC_MESSAGES/ngeo.po: .build/locale/ngeo.pot
	mkdir -p $(dir $@)
	msginit -i $< -o $@

locales/fr/app.json: .tx/config $(HOME)/.transifexrc .build/applications.timestamp
	mkdir -p $(dir $@)
	tx pull --translations --all --branch=$(MAJOR_VERSION) --resources=ngeo.webcomponent --force --mode=reviewed
	touch $@
	$(TOUCHBACK_TXRC)

.PRECIOUS: .build/locale/fr/LC_MESSAGES/apps.po
.build/locale/fr/LC_MESSAGES/apps.po: contribs/gmf/apps/.tx/config $(HOME)/.transifexrc .build/applications.timestamp
	(cd contribs/gmf/apps/; tx pull --all --translations --branch=$(MAJOR_VERSION) --force --mode=reviewed)
	$(TOUCHBACK_TXRC)

.PRECIOUS: .build/locale/%/LC_MESSAGES/demo.po
.build/locale/%/LC_MESSAGES/demo.po:
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/camptocamp/demo_geomapfish/$(DEMO_BRANCH)/geoportal/geomapfish_geoportal/locale/$*/LC_MESSAGES/geomapfish_geoportal-client.po

contribs/gmf/build/gmf-%.json: \
		.build/locale/%/LC_MESSAGES/ngeo.po \
		.build/locale/%/LC_MESSAGES/demo.po \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/compile-catalog $(filter-out .build/node_modules.timestamp, $^) > $@


.PHONY: build-dll
build-dll: .build/build-dll.timestamp

.build/build-dll.timestamp: .build/python-venv.timestamp .build/node_modules.timestamp
	$(PY_VENV_BIN)/python3 buildtools/extract-ngeo-dependencies > deps.js && \
	npm run build-dll
	rm deps.js
	mkdir -p $(dir $@)
	touch $@

.PHONY: clean
clean:
	rm -f .build/*.check.timestamp
	rm -f .build/examples/*.js
	rm -f .build/*.timestamp
	rm -f .build/info.json
	rm -f .build/ngeo.json
	rm -f .build/gmf.json
	rm -f .build/app-*.json
	rm -rf locales
	rm -rf apidoc
	rm -rf .build/examples-hosted
	rm -rf .build/contribs
	rm -f .build/locale/ngeo.pot
	rm -f .build/locale/demo.pot
	rm -rf contribs/gmf/build
	rm -f $(ANGULAR_LOCALES_FILES)

.PHONY: cleanall
cleanall: clean
	rm -rf dist
	rm -rf .build
	rm -rf node_modules
	rm -f .tx/config
	rm -f $(L10N_PO_FILES)

.PHONY: cleanallcache
cleanallcache: cleanall
	rm -rf $(HOME)/.npm
	rm -rf $(HOME)/.cache/pip
