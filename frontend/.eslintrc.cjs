module.exports = {
  root: true,
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  "plugins": ["@typescript-eslint", "react"],
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
}
