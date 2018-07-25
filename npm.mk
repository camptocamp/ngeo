.PHONY: install
install: $(addprefix contribs/gmf/src/fonts/gmf-icons.,ttf eot woff)

contribs/gmf/src/fonts/gmf-icons.ttf: contribs/gmf/src/fonts/gmf-icons.svg
	svg2ttf $< $@

contribs/gmf/src/fonts/gmf-icons.eot: contribs/gmf/src/fonts/gmf-icons.ttf
	ttf2eot $< $@

contribs/gmf/src/fonts/gmf-icons.woff: contribs/gmf/src/fonts/gmf-icons.ttf
	ttf2woff $< $@
