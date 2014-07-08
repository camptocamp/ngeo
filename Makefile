SRC_JS_FILES := $(shell find src -type f -name '*.js')
EXAMPLES_JS_FILES := $(shell find examples -type f -name '*.js')
EXAMPLES_HTML_FILES := $(shell find examples -type f -name '*.html')
BUILD_EXAMPLES_CHECK_TIMESTAMP_FILES := $(patsubst examples/%.html, .build/%.check.timestamp, $(EXAMPLES_HTML_FILES))

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
dist: dist/ngeo.js

.PHONY: check
check: lint dist check-examples compile-examples test

.PHONY: compile-examples
compile-examples: .build/examples/all.min.js

.PHONY: check-examples
check-examples: $(BUILD_EXAMPLES_CHECK_TIMESTAMP_FILES)

.PHONY: lint
lint: .build/python-venv/bin/gjslint .build/node_modules.timestamp .build/gjslint.timestamp .build/jshint.timestamp

.PHONY: test
test: .build/ol-deps.js .build/node_modules.timestamp
	./node_modules/karma/bin/karma start karma-conf.js --single-run

.PHONY: serve
serve:
	node buildtools/serve.js

.PHONY: gh-pages
gh-pages: GIT_BRANCH = $(shell git rev-parse --symbolic-full-name --abbrev-ref HEAD)
gh-pages: .build/ngeo-$(GITHUB_USERNAME)-gh-pages check-examples
	(cd $< && \
	 git fetch origin && \
	 git merge --ff-only origin/gh-pages && \
	 git rm --ignore-unmatch -rqf $(GIT_BRANCH) && \
	 mkdir -p $(GIT_BRANCH) && \
	 cp -r ../examples-hosted/*.html $(GIT_BRANCH) && \
	 cp -r ../examples-hosted/*.js $(GIT_BRANCH) && \
	 git add -A . && \
	 git commit -m 'Update GitHub pages' && \
	 git push origin gh-pages)


.build/gjslint.timestamp: $(SRC_JS_FILES) $(EXAMPLES_JS_FILES)
	.build/python-venv/bin/gjslint --jslint_error=all --strict --custom_jsdoc_tags=event,fires,function,classdesc,api,observable $?
	touch $@

.build/jshint.timestamp: $(SRC_JS_FILES) $(EXAMPLES_JS_FILES)
	./node_modules/.bin/jshint --verbose $?
	touch $@

dist/ngeo.js: buildtools/ngeo.json .build/externs/angular-1.3.js $(SRC_JS_FILES) .build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/build.js $< $@

.build/examples/%.min.js: .build/examples/%.json $(SRC_JS_FILES) .build/externs/angular-1.3.js examples/%.js .build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/build.js $< $@

.build/examples/all.min.js: buildtools/examples-all.json $(SRC_JS_FILES) .build/externs/angular-1.3.js .build/examples/all.js .build/node_modules.timestamp
	mkdir -p $(dir $@)
	node buildtools/build.js $< $@

.build/examples/all.js: $(EXAMPLES_JS_FILES) .build/python-venv
	mkdir -p $(dir $@)
	./.build/python-venv/bin/python buildtools/combine-examples.py $(EXAMPLES_JS_FILES) > $@

.build/examples-hosted/ngeo.js: dist/ngeo.js
	mkdir -p $(dir $@)
	cp $< $@

.PRECIOUS: .build/examples/%.html
.build/examples-hosted/%.html: examples/%.html
	mkdir -p $(dir $@)
	sed -e '/src=.*angular.*\.js/a\    <script src="ngeo.js"></script>' \
		-e 's/\/@?main=$*.js/$*.js/' $< > $@

.PRECIOUS: .build/examples-hosted/%.js
.build/examples-hosted/%.js: examples/%.js
	mkdir -p $(dir $@)
	sed -e '/^goog\.provide/d' -e '/^goog\.require/d' $< > $@

.build/%.check.timestamp: .build/examples-hosted/%.html .build/examples-hosted/%.js .build/examples-hosted/ngeo.js .build/node_modules.timestamp
	mkdir -p $(dir $@)
	./node_modules/phantomjs/bin/phantomjs buildtools/check-example.js $<
	touch $@

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

.build/externs/angular-1.3.js:
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/google/closure-compiler/master/contrib/externs/angular-1.3.js
	touch $@

.build/python-venv:
	mkdir -p .build
	virtualenv --no-site-packages $@

.build/python-venv/bin/gjslint: .build/python-venv
	.build/python-venv/bin/pip install "http://closure-linter.googlecode.com/files/closure_linter-latest.tar.gz"
	touch $@

.build/closure-library:
	mkdir -p .build
	git clone http://github.com/google/closure-library/ $@

.build/ol-deps.js: .build/python-venv
	.build/python-venv/bin/python buildtools/closure/depswriter.py \
	  --root_with_prefix="node_modules/openlayers/src ../../../../../../openlayers/src" --output_file=$@

.PHONY: clean
clean:
	rm -f .build/*.check.timestamp
	rm -f .build/examples/*.js
	rm -f .build/examples-hosted/*.js
	rm -f .build/examples-hosted/*.html
	rm -f .build/gjslint.timestamp
	rm -f .build/jshint.timestamp
	rm -f .build/ol-deps.js
	rm -f .build/info.json
	rm -f dist/ngeo.js

.PHONY: cleanall
cleanall: clean
	rm -rf .build
	rm -rf dist
	rm -rf node_modules
