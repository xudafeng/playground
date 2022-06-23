'use strict';

module.exports = {
  'root': true,
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'modules': true
    }
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'prefer-const': 'warn',
    'no-console': 'off',
    'no-loop-func': 'warn',
    'new-cap': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off',
    'no-unused-expressions': 'error',
    'block-scoped-var': 'error',
    'react/prop-types': 'off',
    'no-control-regex': 'off',
    'require-atomic-updates': 'off',
    'no-useless-escape': 'off',
    'no-case-declarations': 'off',
    'getter-return': 'off',
    'semi': 'error',
  },
  'env': {
    'es6': true,
    'node': true
  },
};
