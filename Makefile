
build: components index.js
	@component build --dev
	@touch build

start:
	@component serve &

components: component.json
	@component install --dev

clean:
	rm -fr build components

test:
	@mocha -R list

.PHONY: clean start test
