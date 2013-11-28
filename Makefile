
build: components index.js template.js
	@component build --dev
	@touch build

start:
	@component serve &

template.js: template.html
	@component convert $<

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

test:
	@mocha -R list

.PHONY: clean start
