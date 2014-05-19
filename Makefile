all: .build/closure-compiler/compiler.jar .build/python-venv/bin/gjslint node_modules

node_modules: package.json
	npm install

.build/python-venv/bin/gjslint: .build/python-venv
	.build/python-venv/bin/pip install "http://closure-linter.googlecode.com/files/closure_linter-latest.tar.gz"
	touch $@

.build/python-venv:
	mkdir -p .build
	virtualenv --no-site-packages $@

.build/closure-compiler/compiler.jar: .build/closure-compiler/compiler-latest.zip
	unzip $< -d .build/closure-compiler
	touch $@

.build/closure-compiler/compiler-latest.zip:
	mkdir -p $(dir $@)
	wget -O $@ http://closure-compiler.googlecode.com/files/compiler-latest.zip
	touch $@

.build/externs/angular-1.3.js:
	mkdir -p $(dir $@)
	wget -O $@ https://raw.githubusercontent.com/google/closure-compiler/master/contrib/externs/angular-1.3.js
	touch $@
