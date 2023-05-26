install:
	npm ci
lint:
	npx eslint .
publish:
	npm publish --dry-run
link:
	npm link
tests:
	npm test
test-coverage:
	npm test -- --coverage