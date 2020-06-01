module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [ "@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
    browser: true,
    jasmine: true,
    jest: true,
  },
  rules: {
    "prettier/prettier": ["error", { singleQuote: true }],
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": ["off"],
  },
  parser: "@typescript-eslint/parser",
};
