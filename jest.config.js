'use strict';

module.exports = {
  clearMocks: true,

  coverageDirectory: "coverage",

  moduleFileExtensions: [
    "js",
    "json",
    "ts",
    "vue"
  ],

  roots: [
    "<rootDir>/src"
  ],

  testRegex: "(test|__test__)/.*.test.(vue|ts|js)?$",

  transform: {
    "^.+.ts$": "ts-jest",
    '^.+.vue$': 'vue-jest'
  },

  moduleNameMapper: {
    "^@utils(.*)$": "<rootDir>/src/utils$1",
    "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  }
};
