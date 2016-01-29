
.PHONY: install
install: $(addprefix contribs/gmf/fonts/gmf-icons.,ttf eot woff)

NPM_BIN = $(shell if [ -e node_modules/.bin ]; then echo node_modules/.bin; else echo ../.bin; fi)

contribs/gmf/fonts/gmf-icons.ttf: contribs/gmf/fonts/gmf-icons.svg
	$(NPM_BIN)/svg2ttf $< $@

contribs/gmf/fonts/gmf-icons.eot: contribs/gmf/fonts/gmf-icons.ttf
	$(NPM_BIN)/ttf2eot $< $@

contribs/gmf/fonts/gmf-icons.woff: contribs/gmf/fonts/gmf-icons.ttf
	$(NPM_BIN)/ttf2woff $< $@
