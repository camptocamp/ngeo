.PHONY: install
install: $(addprefix contribs/gmf/fonts/gmf-icons.,ttf eot woff)

contribs/gmf/fonts/gmf-icons.ttf: contribs/gmf/fonts/gmf-icons.svg
	svg2ttf $< $@

contribs/gmf/fonts/gmf-icons.eot: contribs/gmf/fonts/gmf-icons.ttf
	ttf2eot $< $@

contribs/gmf/fonts/gmf-icons.woff: contribs/gmf/fonts/gmf-icons.ttf
	ttf2woff $< $@
