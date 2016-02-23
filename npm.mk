
.PHONY: install
install: $(addprefix contribs/gmf/fonts/gmf-icons.,ttf eot woff)

SVG2TTF_BIN = $(shell if [ -e node_modules/.bin/svg2ttf ]; then echo node_modules/.bin/svg2ttf; else echo ../.bin/svg2ttf; fi)
TTF2EOT_BIN = $(shell if [ -e node_modules/.bin/ttf2eot ]; then echo node_modules/.bin/ttf2eot; else echo ../.bin/ttf2eot; fi)
TTF2WOFF_BIN = $(shell if [ -e node_modules/.bin/ttf2woff ]; then echo node_modules/.bin/ttf2woff; else echo ../.bin/ttf2woff; fi)

contribs/gmf/fonts/gmf-icons.ttf: contribs/gmf/fonts/gmf-icons.svg
	$(SVG2TTF_BIN) $< $@

contribs/gmf/fonts/gmf-icons.eot: contribs/gmf/fonts/gmf-icons.ttf
	$(TTF2EOT_BIN) $< $@

contribs/gmf/fonts/gmf-icons.woff: contribs/gmf/fonts/gmf-icons.ttf
	$(TTF2WOFF_BIN) $< $@
