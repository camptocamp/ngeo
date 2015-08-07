SRC_JS_FILES := $(shell find src -type f -name '*.js')
SRC_DIRECTIVES_PARTIALS_FILES := $(shell find src/directives -type f -name '*.html')

EXPORTS_JS_FILES := $(shell find exports -type f -name '*.js')

EXAMPLES_JS_FILES := $(shell find examples -maxdepth 1 -type f -name '*.js')
EXAMPLES_HTML_FILES := $(shell find examples -maxdepth 1 -type f -name '*.html')

BUILD_EXAMPLES_CHECK_TIMESTAMP_FILES := $(patsubst examples/%.html, .build/%.check.timestamp, $(EXAMPLES_HTML_FILES))

GMF_SRC_JS_FILES := $(shell find contribs/gmf/src -type f -name '*.js')
GMF_EXAMPLES_JS_FILES := $(shell find contribs/gmf/examples -maxdepth 1 -type f -name '*.js')

EXTERNS_ANGULAR = .build/externs/angular-1.4.js
EXTERNS_ANGULAR_Q = .build/externs/angular-1.4-q_templated.js
EXTERNS_ANGULAR_HTTP_PROMISE = .build/externs/angular-1.4-http-promise_templated.js
EXTERNS_JQUERY = .build/externs/jquery-1.9.js
EXTERNS_FILES = $(EXTERNS_ANGULAR) $(EXTERNS_ANGULAR_Q) $(EXTERNS_ANGULAR_HTTP_PROMISE) $(EXTERNS_JQUERY)

.PHONY: all
all: help

.PHONY: help
help:
	@echo "Usage: make <target>"
	@echo
	@echo "Possible targets:"
	@echo
	@echo "- dist                    Compile the lib into an ngeo.js standalone build (in dist/)"
	@echo "- check                   Perform a number of checks on the code"
	@echo "- lint                    Check the code with the linter"
	@echo "- test                    Run the test suite"
	@echo "- serve                   Run a development web server for running the examples"
	@echo "- gh-pages                Publish examples to GitHub pages"
	@echo "- clean                   Remove generated files"
	@echo "- cleanall                Remove all the build artefacts"
	@echo "- help                    Display this help message"
	@echo

.PHONY: dist
dist: dist/ngeo.js dist/ngeo-debug.js

.PHONY: check
check: lint dist check-examples test compile-gmf compile-examples

.PHONY: compile-examples
compile-examples: .build/examples/all.min.js

.PHONY: compile-gmf
compile-gmf: .build/gmf.js

.PHONY: check-examples
check-examples: $(BUILD_EXAMPLES_CHECK_TIMESTAMP_FILES)

.PHONY: lint
lint: .build/python-venv/bin/gjslint .build/node_modules.timestamp .build/gjslint.timestamp .build/jshint.timestamp

.PHONY: test
test: .build/ol-deps.js .build/ngeo-deps.js .build/templatecache.js .build/node_modules.timestamp
	./node_modules/karma/bin/karma start karma-conf.js --single-run

.PHONY: serve
serve: .build/node_modules.timestamp
	node buildtools/serve.js

.PHONY: gh-pages
gh-pages: GIT_BRANCH = $(shell git rev-parse --symbolic-full-name --abbrev-ref HEAD)
gh-pages: .build/ngeo-$(GITHUB_USERNAME)-gh-pages check-examples .build/examples-hosted/index.html
	(cd $< && \
	 git fetch origin && \
	 git merge --ff-only origin/gh-pages && \
	 git rm --ignore-unmatch -rqf $(GIT_BRANCH) && \
	 mkdir -p $(GIT_BRANCH) && \
	 cp -r ../examples-hosted/*.html $(GIT_BRANCH) && \
	 cp -r ../examples-hosted/*.js $(GIT_BRANCH) && \
	 cp -r ../examples-hosted/*.css $(GIT_BRANCH) && \
	 cp -r ../examples-hosted/data $(GIT_BRANCH) && \
	 cp -r ../examples-hosted/partials $(GIT_BRANCH) && \
	 git add -A . && \
	 git commit -m 'Update GitHub pages' && \
	 git push origin gh-pages)

.PHONY: gh-pages-from-travis
gh-pages-from-travis: .build/ngeo-travis-gh-pages check-examples .build/examples-hosted/index.html
	(cd $< && \
	 git fetch origin && \
	 git merge --ff-only origin/gh-pages && \
	 git rm --ignore-unmatch -rqf master && \
	 mkdir -p master && \
	 cp -r ../examples-hosted/*.html master && \
	 cp -r ../examples-hosted/*.js master && \
	 cp -r ../examples-hosted/*.css master && \
	 cp -r ../examples-hosted/data master && \
	 cp -r ../examples-hosted/partials master && \
	 git config user.name "Travis" && \
	 git config user.email "travis@travis-ci.org" && \
	 git add -A . && \
	 git commit -m 'Update GitHub pages' && \
	 git push https://$(GH_TOKEN)@github.com/$(TRAVIS_REPO_SLUG).git gh-pages > /dev/null)

.build/gjslint.timestamp: $(SRC_JS_FILES) $(EXPORTS_JS_FILES) $(EXAMPLES_JS_FILES) $(GMF_SRC_JS_FILES) $(GMF_EXAMPLES_JS_FILES)
	.build/python-venv/bin/gjslint --jslint_error=all --strict --custom_jsdoc_tags=event,fires,function,classdesc,api,observable $?
	touch $@

.build/jshint.timestamp: $(SRC_JS_FILES) $(EXPORTS_JS_FILES) $(EXAMPLES_JS_FILES) $(GMF_SRC_JS_FILES) $(GMF_EXAMPLES_JS_FILES)
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

dist/ngeo-debug.js: buildtools/ngeo-debug.json \
	    $(EXTERNS_FILES) \
	    $(SRC_JS_FILES) \
	    .build/templatecache.js \
	    $(EXPORTS_JS_FILES) \
	    .build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/build.js $< $@

# At this point ngeo does not include its own CSS, so dist/ngeo.css is just
# a minified version of ol.css. This will change in the future.
dist/ngeo.css: node_modules/openlayers/css/ol.css .build/node_modules.timestamp
	mkdir -p $(dir $@)
	./node_modules/.bin/cleancss $< > $@

.build/gmf.js: buildtools/gmf.json \
	    $(EXTERNS_FILES) \
	    $(SRC_JS_FILES) \
	    $(GMF_SRC_JS_FILES) \
	    .build/templatecache.js \
	    $(EXPORTS_JS_FILES) \
	    .build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/build.js $< $@

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

.build/examples-hosted/ngeo.js: dist/ngeo.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/ngeo.css: dist/ngeo.css
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/angular.min.js: node_modules/angular/angular.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/bootstrap.min.js: node_modules/bootstrap/dist/js/bootstrap.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/bootstrap.min.css: node_modules/bootstrap/dist/css/bootstrap.min.css
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/jquery.min.js: node_modules/jquery/dist/jquery.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/d3.min.js: node_modules/d3/d3.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/watchwatchers.js: utils/watchwatchers.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/typeahead.bundle.min.js: node_modules/typeahead.js/dist/typeahead.bundle.min.js
	mkdir -p $(dir $@)
	cp $< $@

.build/examples-hosted/partials: examples/partials
	mkdir -p $@
	cp examples/partials/* $@

.build/examples-hosted/data: examples/data
	mkdir -p $@
	cp examples/data/* $@

node_modules/angular/angular.min.js: .build/node_modules.timestamp

.PRECIOUS: .build/examples-hosted/%.html
.build/examples-hosted/%.html: examples/%.html
	mkdir -p $(dir $@)
	sed -e 's|\.\./node_modules/openlayers/css/ol.css|ngeo.css|' \
	    -e 's|\.\./node_modules/bootstrap/dist/css/bootstrap.css|bootstrap.min.css|' \
	    -e 's|\.\./node_modules/jquery/dist/jquery.js|jquery.min.js|' \
	    -e 's|\.\./node_modules/bootstrap/dist/js/bootstrap.js|bootstrap.min.js|' \
	    -e 's|\.\./node_modules/angular/angular.js|angular.min.js|' \
	    -e 's|\.\./node_modules/d3/d3.js|d3.min.js|' \
	    -e 's|\.\./node_modules/typeahead.js/dist/typeahead.bundle.js|typeahead.bundle.min.js|' \
	    -e 's/\/@?main=$*.js/$*.js/' \
	    -e 's|\.\./utils/watchwatchers.js|watchwatchers.js|' \
	    -e '/$*.js/i\    <script src="ngeo.js"></script>' $< > $@

.PRECIOUS: .build/examples-hosted/%.js
.build/examples-hosted/%.js: examples/%.js
	mkdir -p $(dir $@)
	sed -e '/^goog\.provide/d' -e '/^goog\.require/d' $< > $@

.build/examples-hosted/index.html: buildtools/examples-index.mako.html $(EXAMPLES_HTML_FILES) .build/python-venv/bin/mako-render .build/beautifulsoup4.timestamp
	.build/python-venv/bin/python buildtools/generate-examples-index.py $< $(EXAMPLES_HTML_FILES) > $@

.build/%.check.timestamp: .build/examples-hosted/%.html \
	    .build/examples-hosted/%.js \
	    .build/examples-hosted/ngeo.js \
	    .build/examples-hosted/ngeo.css \
	    .build/examples-hosted/angular.min.js \
	    .build/examples-hosted/bootstrap.min.js \
	    .build/examples-hosted/bootstrap.min.css \
	    .build/examples-hosted/jquery.min.js \
	    .build/examples-hosted/d3.min.js \
	    .build/examples-hosted/watchwatchers.js \
	    .build/examples-hosted/typeahead.bundle.min.js \
	    .build/examples-hosted/data \
	    .build/examples-hosted/partials \
	    .build/node_modules.timestamp
	mkdir -p $(dir $@)
	./node_modules/phantomjs/bin/phantomjs buildtools/check-example.js $<
	touch $@

.build/ngeo-travis-gh-pages:
	git clone --branch gh-pages https://$(GH_TOKEN)@github.com/$(TRAVIS_REPO_SLUG).git $@

.build/ngeo-%-gh-pages:
	git clone --branch gh-pages git@github.com:$*/ngeo.git $@

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
	mkdir -p .build
	virtualenv --no-site-packages $@

.build/python-venv/bin/gjslint: .build/python-venv
	.build/python-venv/bin/pip install "http://closure-linter.googlecode.com/files/closure_linter-latest.tar.gz"
	touch $@

.build/python-venv/bin/mako-render: .build/python-venv
	.build/python-venv/bin/pip install "Mako==1.0.0"
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

# The keys in the template cache begin with "../src/directives/partials". This
# is done so ngeo.js works for the examples on github.io. If another key
# pattern is needed this should be changed.
.build/templatecache.js: buildtools/templatecache.mako.js .build/python-venv/bin/mako-render
	.build/python-venv/bin/mako-render --var "partials=$(addprefix ../,$(SRC_DIRECTIVES_PARTIALS_FILES))" --var "basedir=src" $< > $@

.PHONY: clean
clean:
	rm -f .build/*.check.timestamp
	rm -f .build/examples/*.js
	rm -f .build/examples-hosted/*.js
	rm -f .build/examples-hosted/*.html
	rm -f .build/examples-hosted/ngeo.css
	rm -rf .build/examples-hosted/data
	rm -rf .build/examples-hosted/partials
	rm -f .build/gjslint.timestamp
	rm -f .build/jshint.timestamp
	rm -f .build/ol-deps.js
	rm -f .build/ngeo-deps.js
	rm -f .build/info.json
	rm -f .build/templatecache.js
	rm -f dist/ngeo.js
	rm -f dist/ngeo.css
	rm -f $(EXTERNS_FILES)

.PHONY: cleanall
cleanall: clean
	rm -rf .build
	rm -rf dist
	rm -rf node_modules
