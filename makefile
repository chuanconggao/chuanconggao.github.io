HTMLFILES = $(shell find html -type f -name "*.html")

CSS = css/index
JS = js/index

all: index.html $(CSS).min.css $(JS).min.js

index.html: $(HTMLFILES)
	bin/renderJinja2.py html/index.html > index.html

$(CSS).min.css: $(CSS).scss
	scss $(CSS).scss | csso > $(CSS).min.css

$(JS).min.js: $(JS).js
	uglifyjs $(JS).js > $(JS).min.js

clean:
	rm -f index.html
	rm -f $(CSS).min.css
	rm -f $(JS).min.js
