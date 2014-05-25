EXAMPLES_JS_FILES := $(shell find examples -type f -name '*.js')
SRC_JS_FILES := $(shell find src -type f -name '*.js')

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
	@echo "- examples                Compile all the examples"
	@echo "- lint                    Check the code with the linter"
	@echo "- serve                   Run a development web server for running the examples"
	@echo "- clean                   Remove generated files"
	@echo "- allclean                Remove all the build artefacts"
	@echo "- help                    Display this help message"
	@echo

.PHONY: dist
dist: dist/ngeo.js

.PHONY: check
check: lint dist examples

.PHONY: examples
examples: $(addprefix .build/, $(patsubst %.js, %.min.js, $(EXAMPLES_JS_FILES)))

.PHONY: lint
lint: .build/python-venv/bin/gjslint .build/node_modules.timestamp .build/gjslint.timestamp .build/jshint.timestamp

.PHONY: serve
serve:
	node serve.js

.build/gjslint.timestamp: $(SRC_JS_FILES) $(EXAMPLES_JS_FILES)
	.build/python-venv/bin/gjslint --jslint_error=all --strict $?
	touch $@

.build/jshint.timestamp: $(SRC_JS_FILES) $(EXAMPLES_JS_FILES)
	./node_modules/.bin/jshint --verbose $?
	touch $@

dist/ngeo.js: dist/ngeo.json .build/externs/angular-1.3.js $(SRC_JS_FILES) .build/node_modules.timestamp
	mkdir -p $(dir $@)
	node build.js $< $@

.build/examples/%.min.js: .build/examples/%.json .build/externs/angular-1.3.js examples/%.js .build/node_modules.timestamp
	mkdir -p $(dir $@)
	node build.js $< $@

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
.build/examples/%.json: template.json
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

.PHONY: clean
clean:
	rm -f .build/examples/*.min.js
	rm -f .build/gjslint.timestamp
	rm -f .build/jshint.timestamp
	rm -f dist/ngeo.js

.PHONY: allclean
allclean: clean
	rm -rf .build
	rm -rf node_modules
