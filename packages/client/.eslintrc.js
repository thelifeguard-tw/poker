module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ["react", "@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  env: {
    "browser": true,
    "jasmine": true,
    "jest": true
  },
  rules: {
    "prettier/prettier": ["error", { "singleQuote": true }]
  },
};
