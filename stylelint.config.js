'use strict';

module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-css-modules',
    'stylelint-config-prettier',
		'stylelint-config-rational-order'
	],
	plugins: [
		'stylelint-order',
    'stylelint-scss',
		'stylelint-declaration-block-no-ignored-properties'
	],
	rules: {
		'no-descending-specificity': null,
    "at-rule-no-unknown": null,
    "scss/selector-no-redundant-nesting-selector": true,
		'plugin/declaration-block-no-ignored-properties': true
	}
};
