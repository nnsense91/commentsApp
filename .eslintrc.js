module.exports = {
	"env": {
        "browser": true,
        "es6": true,
        "node": true
    },
	extends: [
		"airbnb-base",
	  	'plugin:vue/vue3-recommended',
	],
	parser: "vue-eslint-parser",
	parserOptions: {
	  "parser": "babel-eslint",
	  "ecmaVersion": 8,
	  "sourceType": "module"
	},
	rules: {
		"vue/component-tags-order": ["error", {
			"order": ["template", "script",  "style"]
		}],
		"indent": [ "error", "tab" ],
		"linebreak-style": 0,
		"no-tabs": 0
	},
	overrides: [
		{
		  files: ["*.vue"],
		  rules: {
			"max-len": "off"
		  }
		}
	]
  }