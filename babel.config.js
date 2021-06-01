'use strict';

module.exports = function (api) {
  api.cache(false);
  const presets = [
    '@babel/preset-env',
    'babel-preset-vue',
    '@babel/preset-typescript'
  ];

  const plugins = [
    '@babel/plugin-transform-runtime',
    ['@babel/proposal-decorators', {
      legacy: true
    }],
    ['@babel/proposal-class-properties', {
      loose: true
    }],
    ['@babel/plugin-proposal-private-property-in-object', {
      loose: true
    }],
    ['@babel/plugin-proposal-private-methods', {
      loose: true
    }]
  ];

  const env = {
    es: {
      presets: [
        [
          '@babel/preset-env',
          { modules: false }
        ]
      ],
      plugins: [
        ['@babel/plugin-transform-runtime',{
          useESModules: true
        }],
        ['@babel/proposal-decorators', {
          legacy: true
        }],
        ['@babel/proposal-class-properties', {
          loose: true
        }],
        ['@babel/plugin-proposal-private-property-in-object', {
          loose: true
        }],
        ['@babel/plugin-proposal-private-methods', {
          loose: true
        }]
      ]
    }
  };

  return {
    presets,
    plugins,
    env
  };
};
