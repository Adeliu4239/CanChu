module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'next', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/extensions': 'off',
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.js', '.eslintrc.cjs'],
      parserOptions: {
        sourceType: 'script',
      },
      extends: ['plugin:prettier/recommended'],
    },
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
};
