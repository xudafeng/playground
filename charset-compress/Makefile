git_version = $$(git branch 2>/dev/null | sed -e '/^[^*]/d'-e's/* \(.*\)/\1/')

all: test
server:
	`npm bin`/startserver
build:
	node compress.js
jshint:
	@${npm_bin}/jshint .
.PHONY: test
