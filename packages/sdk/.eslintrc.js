module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true
  },
  rules: {
    'no-global-assign': ['error', { exceptions: ['console'] }] // allow modifying global console
  }
}
