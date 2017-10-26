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
    'arrow-parens': 0,
    'generator-star-spacing': 0,
		indent: ['error', 2],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'ignore',
      'asyncArrow': 'always'
    }]
	},
}