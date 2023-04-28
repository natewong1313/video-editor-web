/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node", "plugin:tailwindcss/recommended"],
  rules: {
    semi: [2, "never"],
    quotes: [2, "double"],
    "jsx-quotes": [2, "prefer-double"],
    "react/self-closing-comp": ["error", { "component": true, "html": true }],
    "indent": ["error", 2]
  },
}
