module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: 'eslint:recommended',
	parserOptions: {
		sourceType: 'module',
	},
	rules: {
		"no-alert": 0,
		"no-console": 0,
    'arrow-parens': 0,
    'generator-star-spacing': 0,
		"no-extra-parens": 2,
		"no-fallthrough": 1,
		"no-implicit-coercion": 1,
		"camelcase": 2,
		"semi": [0],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'ignore',
      'asyncArrow': 'always'
    }]
	}
}