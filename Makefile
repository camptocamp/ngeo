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
	@echo "- clean                   Remove generated files"
	@echo "- allclean                Remove all the build artefacts"
	@echo "- help                    Display this help message"
	@echo

.PHONY: dist
dist: dist/ngeo.js

dist/ngeo.js: dist/ngeo.json $(SRC_JS_FILES)
	mkdir -p $(dir $@)
	node node_modules/openlayers/tasks/build.js $< $@

examples/%.min.js: .build/examples/%.json .build/externs/angular-1.3.js examples/%.js node_modules
	node node_modules/openlayers/tasks/build.js $< $@

.PHONY: node_modules
node_modules: node_modules/closure-util/gruntfile.js

node_modules/closure-util/gruntfile.js: package.json
	npm install
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
	rm -f examples/*.min.js
	rm -f dist/ngeo.js

.PHONY: allclean
allclean: clean
	rm -rf .build
	rm -rf node_modules
