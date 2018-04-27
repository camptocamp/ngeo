ANGULAR_VERSION := $(shell grep '"angular"' package.json | cut -d\" -f4)

OS := $(shell uname)
FONTAWESOME_WEBFONT = $(addprefix contribs/gmf/fonts/fontawesome-webfont., eot ttf woff woff2)
ESLINT_CONFIG_FILES := $(shell find * -not -path 'node_modules/*' -type f -name '.eslintrc*')

NGEO_JS_FILES = $(shell find src -type f -name '*.js')
NGEO_TEST_JS_FILES := $(shell find test -type f -name '*.js')
NGEO_PARTIALS_FILES := $(shell find src/ -name '*.html')
NGEO_EXAMPLES_HTML_FILES := $(shell find examples -maxdepth 1 -type f -name '*.html')
NGEO_EXAMPLES_JS_FILES := $(NGEO_EXAMPLES_HTML_FILES:.html=.js)


GMF_PARTIALS_FILES := $(shell find contribs/gmf/src/ -name *.html)
GMF_SRC_JS_FILES := $(shell find contribs/gmf/src -type f -name '*.js')
GMF_TEST_JS_FILES := $(shell find contribs/gmf/test -type f -name '*.js')
GMF_EXAMPLES_HTML_FILES := $(shell find contribs/gmf/examples -maxdepth 1 -type f -name '*.html')
GMF_EXAMPLES_JS_FILES := $(GMF_EXAMPLES_HTML_FILES:.html=.js)

GMF_APPS += mobile desktop desktop_alt mobile_alt oeedit oeview
GMF_JS_FILES = $(shell find contribs/gmf/src -type f -name '*.js')
GMF_APPS_JS_FILES = $(shell find contribs/gmf/apps -type f -name '*.js')

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
	@echo "- serve-ngeo              Run a development web server for running the ngeo examples"
	@echo "- serve-gmf               Run a development web server for running the gmf examples"
	@echo "- serve-gmf-apps          Run a development web server for running the gmf apps"
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
	@echo "- gh-pages                Update the GitHub pages"
	@echo

.PHONY: apidoc
apidoc: .build/apidoc

.PHONY: check
check: lint check-examples-checker check-examples test build-gmf-apps

.PHONY: build-gmf-apps
build-gmf-apps: $(foreach APP,$(GMF_APPS),$(addprefix contribs/gmf/build/$(APP),.js .css)) \
	$(addprefix contribs/gmf/build/gmf-,$(addsuffix .json, $(LANGUAGES))) \
	$(ANGULAR_LOCALES_FILES)

.PHONY: check-examples-checker
check-example-checker: $(CHECK_EXAMPLE_CHECKER)

.PHONY: check-examples
check-examples: $(BUILD_EXAMPLES_CHECK_TIMESTAMP_FILES)

.PHONY: lint
lint: .build/eslint.timestamp git-attributes eof-newline

.PHONY: eslint
eslint: .build/eslint.timestamp

.PHONY: git-attributes
git-attributes:
	git --no-pager diff --check `git log --oneline | tail -1 | cut -f 1 -d ' '`

.PHONY: eof-newline
eof-newline:
	buildtools/test-eof-newline

.PHONY: test
test: .build/node_modules.timestamp
	./node_modules/karma/bin/karma start karma-conf.js --single-run
	@echo "\nFull coverage report in: .build/coverage/lcov-report"

.PHONY: test-debug
test-debug: .build/node_modules.timestamp .build/node_modules_karma-chrome-launcher.timestamp
	./node_modules/karma/bin/karma start karma-conf.js --browsers=Chrome --single-run=false --autoWatch=true --debug

.build/node_modules_karma-chrome-launcher.timestamp:
	npm install karma-chrome-launcher
	mkdir -p $(dir $@)
	touch $@

.PHONY: serve-ngeo
serve-ngeo: .build/node_modules.timestamp $(FONTAWESOME_WEBFONT) $(ANGULAR_LOCALES_FILES)
	npm run serve-ngeo-examples

.PHONY: serve-gmf
serve-gmf: .build/node_modules.timestamp $(FONTAWESOME_WEBFONT) $(ANGULAR_LOCALES_FILES)
	npm run serve-gmf-examples

.PHONY: serve-gmf-apps
serve-gmf-apps: .build/node_modules.timestamp $(FONTAWESOME_WEBFONT) $(ANGULAR_LOCALES_FILES)
	npm run serve-gmf-apps

.PHONY: examples-hosted
examples-hosted: \
		examples-hosted-ngeo \
		examples-hosted-gmf \
		examples-hosted-apps

.PHONY: examples-hosted-ngeo
examples-hosted-ngeo: \
		$(patsubst examples/%.html,.build/examples-hosted/%.html,$(NGEO_EXAMPLES_HTML_FILES)) \

.PHONY: examples-hosted-gmf
examples-hosted-gmf: \
		$(patsubst contribs/gmf/examples/%.html,.build/examples-hosted/contribs/gmf/%.html,$(GMF_EXAMPLES_HTML_FILES)) \

.PHONY: examples-hosted-apps
examples-hosted-apps: \
		$(addprefix .build/examples-hosted/contribs/gmf/apps/,$(addsuffix /index.html,$(GMF_APPS)))

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
		$(NGEO_JS_FILES) \
		$(NGEO_TEST_JS_FILES) \
		$(NGEO_EXAMPLES_JS_FILES) \
		$(GMF_TEST_JS_FILES) \
		$(GMF_SRC_JS_FILES) \
		$(GMF_EXAMPLES_JS_FILES) \
		$(GMF_APPS_JS_FILES)
	./node_modules/.bin/eslint $(filter-out .build/node_modules.timestamp $(ESLINT_CONFIG_FILES), $^)
	touch $@

# FIXME: what to do with this rule?
.PRECIOUS: .build/examples-hosted/contribs/gmf/apps/%/index.html
.build/examples-hosted/contribs/gmf/apps/%/index.html: contribs/gmf/apps/%/index.html \
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
	# FIXME: here we should call webpack to generate the gmf apps

.build/examples-hosted/index.html: \
		buildtools/examples-index.mako.html \
		$(NGEO_EXAMPLES_HTML_FILES) \
		$(PY_VENV_BIN)/mako-render \
		.build/beautifulsoup4.timestamp
	mkdir -p $(dir $@)
	$(PY_VENV_BIN)/python buildtools/generate-examples-index.py $< $(NGEO_EXAMPLES_HTML_FILES) > $@

.build/examples-hosted/contribs/gmf/index.html: \
		buildtools/examples-index.mako.html \
		$(GMF_EXAMPLES_HTML_FILES) \
		$(PY_VENV_BIN)/mako-render \
		.build/beautifulsoup4.timestamp
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
	npm install
	mkdir -p $(dir $@)
	touch $@

.PRECIOUS: node_modules/font-awesome/fonts/fontawesome-webfont.%
node_modules/font-awesome/fonts/fontawesome-webfont.%: .build/node_modules.timestamp
	touch -c $@

contribs/gmf/fonts/fontawesome-webfont.%: node_modules/font-awesome/fonts/fontawesome-webfont.%
	mkdir -p $(dir $@)
	cp $< $@

contribs/gmf/build/angular-locale_%.js: package.json
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/angular/angular.js/v$(ANGULAR_VERSION)/src/ngLocale/angular-locale_$*.js

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

.build/jsdocAngularJS.js: jsdoc/get-angularjs-doc-ref.js .build/node_modules.timestamp
	node $< > $@

.build/jsdocOl3.js: jsdoc/get-ol3-doc-ref.js .build/node_modules.timestamp
	node $< > $@

.build/apidoc: jsdoc/config.json .build/node_modules.timestamp .build/jsdocAngularJS.js .build/jsdocOl3.js $(NGEO_JS_FILES)
	rm -rf $@
	./node_modules/.bin/jsdoc -c $< --destination $@

.PRECIOUS: contribs/gmf/cursors/%.cur
contribs/gmf/cursors/%.cur: contribs/gmf/cursors/%.png
	convert $< $@


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
		$(GMF_PARTIALS_FILES) $(GMF_SRC_JS_FILES)
	mkdir -p $(dir $@)
	node buildtools/extract-messages $(GMF_PARTIALS_FILES) $(GMF_SRC_JS_FILES) > $@

.build/locale/apps.pot: lingua.cfg .build/node_modules.timestamp \
		$(GMF_APPS_HTML_FILES) $(GMF_APPS_JS_FILES)
	mkdir -p $(dir $@)
	node buildtools/extract-messages $(GMF_APPS_HTML_FILES) $(GMF_APPS_JS_FILES) > $@

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
	rm -rf .build/apidoc
	rm -rf .build/examples-hosted
	rm -rf .build/contribs
	rm -f .build/locale/ngeo.pot
	rm -f .build/locale/gmf.pot
	rm -f .build/locale/demo.pot
	rm -rf contribs/gmf/build
	rm -f $(ANGULAR_LOCALES_FILES)
	rm -f contribs/gmf/fonts/FontAwesome.otf
	rm -f contribs/gmf/fonts/fontawesome-webfont.*
	rm -f contribs/gmf/fonts/gmf-icons.eot
	rm -f contribs/gmf/fonts/gmf-icons.ttf
	rm -f contribs/gmf/fonts/gmf-icons.woff

.PHONY: cleanall
cleanall: clean
	rm -rf .build
	rm -rf node_modules
	rm -f .tx/config
	rm -f $(L10N_PO_FILES)

.PHONY: cleanallcache
cleanallcache: cleanall
	rm -rf $(HOME)/.npm
	rm -rf $(HOME)/.cache/pip
