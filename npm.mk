
.PHONY: install
install: $(addprefix contribs/gmf/fonts/gmf-icons.,ttf eot woff) \
	$(addprefix contribs/gmf/cursors/,grab.cur grabbing.cur)

contribs/gmf/fonts/gmf-icons.ttf: contribs/gmf/fonts/gmf-icons.svg
	svg2ttf $< $@

contribs/gmf/fonts/gmf-icons.eot: contribs/gmf/fonts/gmf-icons.ttf
	ttf2eot $< $@

contribs/gmf/fonts/gmf-icons.woff: contribs/gmf/fonts/gmf-icons.ttf
	ttf2woff $< $@

contribs/gmf/cursors/%.cur: contribs/gmf/cursors/%.png
	convert $< $@
