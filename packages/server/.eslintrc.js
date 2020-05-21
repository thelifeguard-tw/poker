module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
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
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": ["off"],
  },
  parser: "@typescript-eslint/parser",
};
