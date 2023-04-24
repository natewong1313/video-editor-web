/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node", "plugin:tailwindcss/recommended"],
  rules: {
    semi: [2, "never"],
  },
}
