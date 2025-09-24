// eslint.config.cjs (Flat config for ESLint v9)
const js = require("@eslint/js");
const pluginImport = require("eslint-plugin-import");

module.exports = [
  // Ignore build/artifact dirs
  { ignores: ["node_modules/**", "dist/**", "coverage/**"] },

  // Base recommended rules
  js.configs.recommended,

  // Project rules
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: {
      import: pluginImport
    },
    rules: {
      // add/adjust rules as you like
      "no-unused-vars": "warn",
      // we turned this off earlier; keep it off if you don’t use TS path maps
      "import/no-unresolved": "off"
    }
  }
];
