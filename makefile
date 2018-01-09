CSS = css/index
JS = js/index

all: $(CSS).min.css $(JS).min.js

$(CSS).min.css: $(CSS).scss
	scss $(CSS).scss | csso > $(CSS).min.css

$(JS).min.js: $(JS).js
	uglifyjs $(JS).js > $(JS).min.js

clean:
	rm $(CSS).min.css
	rm $(JS).min.js
