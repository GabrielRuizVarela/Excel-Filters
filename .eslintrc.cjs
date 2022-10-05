module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx', '.jsx'] }],
    'import/extensions': [0, 'never'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],

  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
