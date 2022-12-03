module.exports = {
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  plugins: ["prettier", "@typescript-eslint", "jest"],
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'prettier/prettier': 'error'
  }
}