'use strict';

module.exports = {
  clearMocks: true,

  coverageDirectory: 'coverage',

  moduleFileExtensions: [
    'js',
    'json',
    'ts',
    'vue'
  ],

  roots: ['<rootDir>/src'],

  testRegex:
    '(test|__test__)/.*.test.(vue|ts|js)?$',

  transform: {
    '^.+.ts$': 'ts-jest',
    '^.+.vue$': 'vue-jest',
    '^.+\\.svg$': 'jest-svg-transformer'
  },

  moduleNameMapper: {
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@assets(.*)$': '<rootDir>/src/assets$1',
    '^@locales(.*)$': '<rootDir>/src/locales$1',
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub'
  },

  preset: 'ts-jest/presets/js-with-ts',

  transformIgnorePatterns: [
    '/node_modules/(?!(vuetify)/)/',
    '/node_modules/(?!(@foxone/uikit)/)/'
  ]
};
