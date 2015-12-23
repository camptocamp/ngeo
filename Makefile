SRC_JS_FILES := $(shell find src -type f -name '*.js')
NGEO_DIRECTIVES_PARTIALS_FILES := $(shell ls -1 src/directives/partials/*.html)
GMF_DIRECTIVES_PARTIALS_FILES := $(shell ls -1 contribs/gmf/src/directives/partials/*.html)

EXPORTS_JS_FILES := $(shell find exports -type f -name '*.js')

EXAMPLES_JS_FILES := $(shell find examples -maxdepth 1 -type f -name '*.js')
EXAMPLES_HTML_FILES := $(shell find examples -maxdepth 1 -type f -name '*.html')

GMF_SRC_JS_FILES := $(shell find contribs/gmf/src -type f -name '*.js')
GMF_EXAMPLES_HTML_FILES := $(shell find contribs/gmf/examples -maxdepth 1 -type f -name '*.html')
GMF_EXAMPLES_JS_FILES := $(shell find contribs/gmf/examples -maxdepth 1 -type f -name '*.js')
GMF_APPS_MOBILE_JS_FILES := $(shell find contribs/gmf/apps/mobile/js -type f -name '*.js')
GMF_APPS_MOBILE_LESS_FILES := $(shell find contribs/gmf/less -type f -name '*.less')
GMF_APPS_LIBS_JS_FILES += \
	node_modules/jquery/dist/jquery.min.js \
	node_modules/angular/angular.min.js \
	node_modules/angular-gettext/dist/angular-gettext.min.js \
	node_modules/bootstrap/dist/js/bootstrap.min.js \
	node_modules/proj4/dist/proj4.js \
	node_modules/d3/d3.min.js \
	node_modules/typeahead.js/dist/typeahead.bundle.min.js

BUILD_EXAMPLES_CHECK_TIMESTAMP_FILES := $(patsubst examples/%.html,.build/%.check.timestamp,$(EXAMPLES_HTML_FILES)) \
	$(patsubst contribs/gmf/examples/%.html,.build/contribs/gmf/%.check.timestamp,$(GMF_EXAMPLES_HTML_FILES)) \
	.build/contribs/gmf/apps/mobile.check.timestamp
EXAMPLE_HOSTED_REQUIREMENTS = .build/examples-hosted/lib/ngeo.js \
	.build/examples-hosted/lib/ngeo-debug.js \
	.build/examples-hosted/lib/ngeo.css \
	.build/examples-hosted/lib/gmf.js \
	.build/examples-hosted/lib/angular.min.js \
	.build/examples-hosted/lib/angular-gettext.min.js \
	.build/examples-hosted/lib/bootstrap.min.js \
	.build/examples-hosted/lib/bootstrap.min.css \
	.build/examples-hosted/lib/jquery.min.js \
	.build/examples-hosted/lib/d3.min.js \
	.build/examples-hosted/lib/watchwatchers.js \
	.build/examples-hosted/lib/typeahead.bundle.min.js \
	.build/examples-hosted/lib/proj4.js \
	.build/examples-hosted/partials \
	.build/examples-hosted/data

# Git
GITHUB_USERNAME ?= camptocamp
GIT_BRANCH ?= $(shell git rev-parse --symbolic-full-name --abbrev-ref HEAD)
GIT_REMOTE_NAME ?= origin

# i18n
L10N_LANGUAGES = de it
L10N_PO_FILES = $(addprefix c2cgeoportal/locale/,$(addsuffix /LC_MESSAGES/c2cgeoportal.po, $(L10N_LANGUAGES)))
LANGUAGES = en $(L10N_LANGUAGES)
TX_GIT_BRANCH ?= master

NGEO_JS_FILES = $(shell find src -type f -name '*.js')
GMF_JS_FILES = $(shell find contribs/gmf/src -type f -name '*.js')

EXTERNS_ANGULAR = .build/externs/angular-1.4.js
EXTERNS_ANGULAR_Q = .build/externs/angular-1.4-q_templated.js
EXTERNS_ANGULAR_HTTP_PROMISE = .build/externs/angular-1.4-http-promise_templated.js
EXTERNS_JQUERY = .build/externs/jquery-1.9.js
EXTERNS_FILES = $(EXTERNS_ANGULAR) $(EXTERNS_ANGULAR_Q) $(EXTERNS_ANGULAR_HTTP_PROMISE) $(EXTERNS_JQUERY)

ifeq ($(OS),Darwin)
	STAT_COMPRESSED = stat -f '  compressed: %z bytes'
	STAT_UNCOMPRESSED = stat -f 'uncompressed: %z bytes'
else
	STAT_COMPRESSED = stat -c '  compressed: %s bytes'
	STAT_UNCOMPRESSED = stat -c 'uncompressed: %s bytes'
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
	@echo "- clean                   Remove generated files"
	@echo "- cleanall                Remove all the build artefacts"
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
check: lint dist check-examples test compile-examples build-gmf-mobile-app

.PHONY: compile-examples
compile-examples: .build/examples/all.min.js

.PHONY: build-gmf-mobile-app
build-gmf-mobile-app: $(addprefix contribs/gmf/build/mobile,.js .css) \
	$(addprefix contribs/gmf/build/gmf-,$(addsuffix .json, $(LANGUAGES)))

.PHONY: check-examples
check-examples: $(BUILD_EXAMPLES_CHECK_TIMESTAMP_FILES)

.PHONY: lint
lint: .build/python-venv/bin/gjslint .build/node_modules.timestamp .build/gjslint.timestamp .build/jshint.timestamp

.PHONY: test
test: .build/ol-deps.js .build/ngeo-deps.js .build/gmf-deps.js .build/templatecache.js .build/gmftemplatecache.js .build/node_modules.timestamp
	./node_modules/karma/bin/karma start karma-conf.js --single-run

.PHONY: serve
serve: .build/node_modules.timestamp
	node buildtools/serve.js

.PHONY: examples-hosted
examples-hosted: $(EXAMPLE_HOSTED_REQUIREMENTS) \
		$(patsubst examples/%.html,.build/examples-hosted/%.html,$(EXAMPLES_HTML_FILES)) \
		$(patsubst examples/%.html,.build/examples-hosted/%.js,$(EXAMPLES_HTML_FILES)) \
		$(patsubst contribs/gmf/examples/%.html,.build/examples-hosted/contribs/gmf/%.html,$(GMF_EXAMPLES_HTML_FILES)) \
		$(patsubst contribs/gmf/examples/%.html,.build/examples-hosted/contribs/gmf/%.js,$(GMF_EXAMPLES_HTML_FILES)) \
		.build/examples-hosted/contribs/gmf/apps/mobile/index.html

.PHONY: gh-pages
gh-pages: .build/ngeo-$(GITHUB_USERNAME)-gh-pages \
		.build/examples-hosted/index.html \
		.build/examples-hosted/contribs/gmf/index.html \
		.build/examples-hosted/contribs/gmf/apps/mobile/index.html \
		.build/apidoc
	cd $<; git fetch origin
	cd $<; git merge --ff-only origin/gh-pages
	cd $<; git rm --ignore-unmatch -r --quiet --force $(GIT_BRANCH)
	cd $<; git clean --force -d
	mkdir $</$(GIT_BRANCH)
	cp -r .build/apidoc $</$(GIT_BRANCH)/apidoc
	mkdir $</$(GIT_BRANCH)/examples
	cp -r .build/examples-hosted/* $</$(GIT_BRANCH)/examples
	cd $<; git add -A
	cd $<; git status
	cd $<; git commit -m 'Update GitHub pages'
	cd $<; git push $(GIT_REMOTE_NAME) gh-pages

.build/ngeo-$(GITHUB_USERNAME)-gh-pages: GIT_REMOTE_URL ?= git@github.com:$(GITHUB_USERNAME)/ngeo.git
.build/ngeo-$(GITHUB_USERNAME)-gh-pages:
	git clone --branch gh-pages $(GIT_REMOTE_URL) $@

.build/gjslint.timestamp: $(SRC_JS_FILES) $(EXPORTS_JS_FILES) $(EXAMPLES_JS_FILES) $(GMF_SRC_JS_FILES) $(GMF_EXAMPLES_JS_FILES) $(GMF_APPS_MOBILE_JS_FILES)
	.build/python-venv/bin/gjslint --jslint_error=all --strict --custom_jsdoc_tags=event,fires,function,classdesc,api,observable,example,module,ngdoc,ngname $?
	touch $@

.build/jshint.timestamp: $(SRC_JS_FILES) $(EXPORTS_JS_FILES) $(EXAMPLES_JS_FILES) $(GMF_SRC_JS_FILES) $(GMF_EXAMPLES_JS_FILES) $(GMF_APPS_MOBILE_JS_FILES)
	./node_modules/.bin/jshint --verbose $?
	touch $@

dist/ngeo.js: buildtools/ngeo.json \
		$(EXTERNS_FILES) \
		$(SRC_JS_FILES) \
		.build/templatecache.js \
		$(EXPORTS_JS_FILES) \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/build.js $< $@
	@$(STAT_UNCOMPRESSED) $@
	@cp $@ /tmp/
	@gzip /tmp/ngeo.js
	@$(STAT_COMPRESSED) /tmp/ngeo.js.gz
	@rm /tmp/ngeo.js.gz

dist/ngeo-debug.js: buildtools/ngeo-debug.json \
		$(EXTERNS_FILES) \
		$(SRC_JS_FILES) \
		.build/templatecache.js \
		$(EXPORTS_JS_FILES) \
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

dist/gmf.js: buildtools/gmf.json \
		$(EXTERNS_FILES) \
		$(SRC_JS_FILES) \
		$(GMF_SRC_JS_FILES) \
		.build/gmftemplatecache.js \
		$(EXPORTS_JS_FILES) \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/build.js $< $@
	@$(STAT_UNCOMPRESSED) $@
	@cp $@ /tmp/
	@gzip /tmp/gmf.js
	@$(STAT_COMPRESSED) /tmp/gmf.js.gz
	@rm /tmp/gmf.js.gz

.build/examples/%.min.js: .build/examples/%.json \
		$(SRC_JS_FILES) \
		$(EXPORTS_JS_FILES) \
		$(EXTERNS_FILES) \
		examples/%.js \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/build.js $< $@

.build/examples/all.min.js: buildtools/examples-all.json \
		$(SRC_JS_FILES) \
		$(GMF_SRC_JS_FILES) \
		$(EXPORTS_JS_FILES) \
		$(EXTERNS_FILES) \
		.build/examples/all.js \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/build.js $< $@

.build/examples/all.js: $(EXAMPLES_JS_FILES) $(GMF_EXAMPLES_JS_FILES) .build/python-venv
	mkdir -p $(dir $@)
	./.build/python-venv/bin/python buildtools/combine-examples.py $(EXAMPLES_JS_FILES) $(GMF_EXAMPLES_JS_FILES) > $@

.PRECIOUS: .build/examples-hosted/lib/%
.build/examples-hosted/lib/%: dist/%
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/angular.min.js: node_modules/angular/angular.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/angular-gettext.min.js: node_modules/angular-gettext/dist/angular-gettext.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/bootstrap.min.js: node_modules/bootstrap/dist/js/bootstrap.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/bootstrap.min.css: node_modules/bootstrap/dist/css/bootstrap.min.css
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/jquery.min.js: node_modules/jquery/dist/jquery.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/d3.min.js: node_modules/d3/d3.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/watchwatchers.js: utils/watchwatchers.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/typeahead.bundle.min.js: node_modules/typeahead.js/dist/typeahead.bundle.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/lib/proj4.js: node_modules/proj4/dist/proj4.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/partials: examples/partials
	mkdir -p $@
	cp $</* $@

.build/examples-hosted/data: examples/data
	mkdir -p $@
	cp examples/data/* $@

.build/examples-hosted/contribs/gmf/data: contribs/gmf/examples/data
	mkdir -p $@
	cp contribs/gmf/examples/data/* $@

.build/examples-hosted/contribs/gmf/fonts: contribs/gmf/fonts build-gmf-mobile-app
	mkdir -p $(dir $@)
	cp -r $< $(dir $@)

.build/examples-hosted/contribs/gmf/build: build-gmf-mobile-app
	mkdir -p $(dir $@)
	cp -r contribs/gmf/build $(dir $@)

.build/examples-hosted/contribs/gmf/apps/mobile/js/mobile.js: contribs/gmf/apps/mobile/js/mobile.js
	mkdir -p $(dir $@)
	cp $< $(dir $@)

node_modules/angular/angular.min.js: .build/node_modules.timestamp

.PRECIOUS: .build/examples-hosted/%.html
.build/examples-hosted/%.html: examples/%.html
	mkdir -p $(dir $@)
	sed -e 's|\.\./node_modules/openlayers/css/ol.css|lib/ngeo.css|' \
		-e 's|\.\./node_modules/bootstrap/dist/css/bootstrap.css|lib/bootstrap.min.css|' \
		-e 's|\.\./node_modules/jquery/dist/jquery.js|lib/jquery.min.js|' \
		-e 's|\.\./node_modules/bootstrap/dist/js/bootstrap.js|lib/bootstrap.min.js|' \
		-e 's|\.\./node_modules/angular/angular.js|lib/angular.min.js|' \
		-e 's|\.\./node_modules/angular-gettext/dist/angular-gettext.js|lib/angular-gettext.min.js|' \
		-e 's|\.\./node_modules/d3/d3.js|lib/d3.min.js|' \
		-e 's|\.\./node_modules/typeahead.js/dist/typeahead.bundle.js|lib/typeahead.bundle.min.js|' \
		-e 's|/@?main=$*.js|$*.js|' \
		-e '/default\.js/d' \
		-e 's|\.\./utils/watchwatchers.js|lib/watchwatchers.js|' \
		-e '/$*.js/i\    <script src="lib/ngeo.js"></script>' $< > $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/%.html
.build/examples-hosted/contribs/gmf/%.html: contribs/gmf/examples/%.html
	mkdir -p $(dir $@)
	sed -e 's|\.\./node_modules/openlayers/css/ol\.css|lib/ngeo.css|' \
		-e 's|\.\./node_modules/bootstrap/dist/css/bootstrap\.css|lib/bootstrap.min.css|' \
		-e 's|\.\./node_modules/jquery/dist/jquery\.js|lib/jquery.min.js|' \
		-e 's|\.\./node_modules/bootstrap/dist/js/bootstrap\.js|lib/bootstrap.min.js|' \
		-e 's|\.\./node_modules/angular/angular\.js|lib/angular.min.js|' \
		-e 's|\.\./node_modules/angular-gettext/dist/angular-gettext\.js|lib/angular-gettext.min.js|' \
		-e 's|\.\./node_modules/d3/d3\.js|lib/d3.min.js|' \
		-e 's|\.\./node_modules/typeahead.js/dist/typeahead.bundle\.js|lib/typeahead.bundle.min.js|' \
		-e 's|\.\./node_modules/proj4/dist/proj4\.js|lib/proj4.js|' \
		-e 's|/@?main=$*\.js|$*.js|' \
		-e '/default\.js/d' \
		-e 's|\.\./utils/watchwatchers\.js|lib/watchwatchers.js|' \
		-e '/$*.js/i\    <script src="../../lib/gmf.js"></script>' $< > $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/apps/mobile/index.html
.build/examples-hosted/contribs/gmf/apps/mobile/index.html: contribs/gmf/apps/mobile/index.html \
		.build/examples-hosted/contribs/gmf/build \
		.build/examples-hosted/contribs/gmf/fonts \
		.build/examples-hosted/contribs/gmf/data \
		.build/examples-hosted/contribs/gmf/apps/mobile/js/mobile.js
	mkdir -p $(dir $@)
	sed -e '/stylesheet\/less" href="..\/..\//d' \
		-e '/\/node_modules\//d' \
		-e '/default\.js/d' \
		-e 's|utils/watchwatchers\.js|lib/watchwatchers.js|' \
		-e 's|/@?main=mobile/js/mobile\.js|../../build/mobile.js|' $< > $@

.PRECIOUS: .build/examples-hosted/%.js
.build/examples-hosted/%.js: examples/%.js
	mkdir -p $(dir $@)
	sed -e '/^goog\.provide/d' -e '/^goog\.require/d' $< > $@

.PRECIOUS: .build/examples-hosted/contribs/gmf/%.js
.build/examples-hosted/contribs/gmf/%.js: contribs/gmf/examples/%.js
	mkdir -p $(dir $@)
	sed -e '/^goog\.provide/d' -e '/^goog\.require/d' $< > $@

.build/examples-hosted/index.html: buildtools/examples-index.mako.html $(EXAMPLES_HTML_FILES) .build/python-venv/bin/mako-render .build/beautifulsoup4.timestamp
	mkdir -p $(dir $@)
	.build/python-venv/bin/python buildtools/generate-examples-index.py $< $(EXAMPLES_HTML_FILES) > $@

.build/examples-hosted/contribs/gmf/index.html: buildtools/examples-index.mako.html $(GMF_EXAMPLES_HTML_FILES) .build/python-venv/bin/mako-render .build/beautifulsoup4.timestamp
	mkdir -p $(dir $@)
	.build/python-venv/bin/python buildtools/generate-examples-index.py \
		--app 'Mobile application' apps/mobile/index.html 'The mobile example application for GeoMapFish.' \
		$< $(GMF_EXAMPLES_HTML_FILES) > $@

.build/%.check.timestamp: .build/examples-hosted/%.html \
		.build/examples-hosted/%.js \
		$(EXAMPLE_HOSTED_REQUIREMENTS) \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	./node_modules/phantomjs/bin/phantomjs buildtools/check-example.js $<
	touch $@

.build/contribs/gmf/apps/mobile.check.timestamp: .build/examples-hosted/contribs/gmf/apps/mobile/index.html
	mkdir -p $(dir $@)
	./node_modules/phantomjs/bin/phantomjs buildtools/check-example.js $<
	touch $@

.build/node_modules.timestamp: package.json
	npm install
	mkdir -p $(dir $@)
	touch $@

.build/closure-compiler/compiler.jar: .build/closure-compiler/compiler-latest.zip
	unzip $< -d .build/closure-compiler
	touch $@

.build/closure-compiler/compiler-latest.zip:
	mkdir -p $(dir $@)
	wget -O $@ http://closure-compiler.googlecode.com/files/compiler-latest.zip
	touch $@

.PRECIOUS: .build/examples/%.json
.build/examples/%.json: buildtools/example.json
	mkdir -p $(dir $@)
	sed 's/{{example}}/$*/' $< > $@

$(EXTERNS_ANGULAR):
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/google/closure-compiler/master/contrib/externs/angular-1.4.js
	touch $@

$(EXTERNS_ANGULAR_Q):
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/google/closure-compiler/master/contrib/externs/angular-1.4-q_templated.js
	touch $@

$(EXTERNS_ANGULAR_HTTP_PROMISE):
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/google/closure-compiler/master/contrib/externs/angular-1.4-http-promise_templated.js
	touch $@

$(EXTERNS_JQUERY):
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/google/closure-compiler/master/contrib/externs/jquery-1.9.js
	touch $@

.build/python-venv:
	mkdir -p $(dir $@)
	virtualenv --no-site-packages $@

.build/python-venv/bin/gjslint: .build/python-venv
	.build/python-venv/bin/pip install "http://closure-linter.googlecode.com/files/closure_linter-latest.tar.gz"
	touch $@

.build/python-venv/bin/mako-render: .build/python-venv
	.build/python-venv/bin/pip install "Mako==1.0.0" "htmlmin==0.1.10"
	touch $@

.build/beautifulsoup4.timestamp: .build/python-venv
	.build/python-venv/bin/pip install "beautifulsoup4==4.3.2"
	touch $@

.build/closure-library:
	mkdir -p .build
	git clone http://github.com/google/closure-library/ $@

.build/ol-deps.js: .build/python-venv
	.build/python-venv/bin/python buildtools/closure/depswriter.py \
		--root_with_prefix="node_modules/openlayers/src ../../../../../../../../openlayers/src" \
		--root_with_prefix="node_modules/openlayers/build/ol.ext ../../../../../../../../openlayers/build/ol.ext" \
		--output_file=$@

.build/ngeo-deps.js: .build/python-venv
	.build/python-venv/bin/python buildtools/closure/depswriter.py \
		--root_with_prefix="src ../../../../../../../../../src" --output_file=$@

.build/gmf-deps.js: .build/python-venv
	.build/python-venv/bin/python buildtools/closure/depswriter.py \
		--root_with_prefix="contribs/gmf/src ../../../../../../../../../contribs/gmf/src" --output_file=$@

# The keys in the template cache begin with "../src/directives/partials". This
# is done so ngeo.js works for the examples on github.io. If another key
# pattern is needed this should be changed.
.build/templatecache.js: buildtools/templatecache.mako.js \
		.build/python-venv/bin/mako-render \
		$(NGEO_DIRECTIVES_PARTIALS_FILES)
	PYTHONIOENCODING=UTF-8 .build/python-venv/bin/mako-render \
		--var "app=ngeo" \
		--var "partials=$(addprefix ngeo:,$(NGEO_DIRECTIVES_PARTIALS_FILES))" $< > $@

.build/gmftemplatecache.js: buildtools/templatecache.mako.js \
		.build/python-venv/bin/mako-render \
		$(NGEO_DIRECTIVES_PARTIALS_FILES) $(GMF_DIRECTIVES_PARTIALS_FILES)
	PYTHONIOENCODING=UTF-8 .build/python-venv/bin/mako-render \
		--var "app=gmf" \
		--var "partials=$(addprefix ngeo:,$(NGEO_DIRECTIVES_PARTIALS_FILES)) \
		$(addprefix gmf:,$(GMF_DIRECTIVES_PARTIALS_FILES))" $< > $@

.build/jsdocAngularJS.js: jsdoc/get-angularjs-doc-ref.js .build/node_modules.timestamp
	node $< > $@

.build/jsdocOl3.js: jsdoc/get-ol3-doc-ref.js .build/node_modules.timestamp
	node $< > $@

.build/apidoc: jsdoc/config.json .build/node_modules.timestamp .build/jsdocAngularJS.js .build/jsdocOl3.js $(SRC_JS_FILES)
	rm -rf $@
	./node_modules/.bin/jsdoc -c $< --destination $@

contribs/gmf/build/mobile.closure.js: contribs/gmf/apps/mobile/build.json \
		$(EXTERNS_FILES) \
		$(GMF_APPS_MOBILE_JS_FILES) \
		.build/gmftemplatecache.js \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	./node_modules/openlayers/node_modules/.bin/closure-util build $< $@

contribs/gmf/build/mobile.js: contribs/gmf/build/mobile.closure.js $(GMF_APPS_LIBS_JS_FILES)
	awk 'FNR==1{print ""}1' $(GMF_APPS_LIBS_JS_FILES) $< > $@

.PHONY: compile-css
compile-css: contribs/gmf/build/mobile.css

contribs/gmf/build/mobile.css: $(GMF_APPS_MOBILE_LESS_FILES) \
		.build/node_modules.timestamp
	mkdir -p $(dir $@)
	./node_modules/.bin/lessc contribs/gmf/apps/mobile/less/mobile.less $@ --autoprefix


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
		--var "git_branch=$(TX_GIT_BRANCH)" $< > $@

#.build/locale/ngeo.pot: lingua.cfg .build/node_modules.timestamp \
#		$(NGEO_DIRECTIVES_PARTIALS_FILES) $(NGEO_JS_FILES)
#	mkdir -p $(dir $@)
#	node buildtools/extract-messages.js $(NGEO_DIRECTIVES_PARTIALS_FILES) $(NGEO_JS_FILES) > $@

.build/locale/gmf.pot: lingua.cfg .build/node_modules.timestamp \
		$(GMF_DIRECTIVES_PARTIALS_FILES) $(GMF_JS_FILES)
	mkdir -p $(dir $@)
	node buildtools/extract-messages $(GMF_DIRECTIVES_PARTIALS_FILES) $(GMF_JS_FILES) > $@

.build/python-venv/bin/tx: .build/python-venv $(HOME)/.transifexrc
	.build/python-venv/bin/pip install transifex-client
	touch $@

.PHONY: transifex-get
transifex-get: c2cgeoportal/locale/c2cgeoportal.pot $(L10N_PO_FILES)

.PHONY: transifex-send
transifex-send: .tx/config .build/python-venv/bin/tx \
		.build/locale/gmf.pot
		# .build/locale/ngeo.pot
	.build/python-venv/bin/tx push --source

.PHONY: transifex-init
transifex-init: .build/dev-requirements.timestamp c2cgeoportal/locale/c2cgeoportal.pot .tx/config
	.build/venv/bin/tx push --source
	.build/venv/bin/tx push --translations --force --no-interactive

#.build/locale/%/LC_MESSAGES/ngeo.po: .tx/config .build/python-venv/bin/tx
#	.build/python-venv/bin/tx pull -l $* --force

.build/locale/%/LC_MESSAGES/gmf.po: .tx/config .build/python-venv/bin/tx
	.build/python-venv/bin/tx pull -l $* --force

contribs/gmf/build/gmf-en.json:
	mkdir -p $(dir $@)
	echo '{}' > $@

contribs/gmf/build/gmf-%.json: .build/locale/%/LC_MESSAGES/gmf.po .build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/compile-catalog $< > $@

# clean

.PHONY: clean
clean:
	rm -f .build/*.check.timestamp
	rm -f .build/examples/*.js
	rm -f .build/gjslint.timestamp
	rm -f .build/jshint.timestamp
	rm -f .build/ol-deps.js
	rm -f .build/ngeo-deps.js
	rm -f .build/gmf-deps.js
	rm -f .build/info.json
	rm -f .build/templatecache.js
	rm -f .build/gmftemplatecache.js
	rm -f dist/*
	rm -f $(EXTERNS_FILES)
	rm -rf .build/apidoc
	rm -rf .build/examples-hosted
	rm -rf .build/contribs
	rm -rf contribs/gmf/build
	rm -f .build/locale/gmf.pot

.PHONY: cleanall
cleanall: clean
	rm -rf .build
	rm -rf dist
	rm -rf node_modules
	rm -f $(L10N_PO_FILES)
