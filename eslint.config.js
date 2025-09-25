const js = require("@eslint/js");
const pluginImport = require("eslint-plugin-import");

module.exports = [
  // Ignore generated/legacy
  { ignores: ["node_modules/**", "dist/**", "coverage/**", ".eslintrc.cjs"] },

  // Base recommended rules
  js.configs.recommended,

  // App source is CommonJS now
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    plugins: { import: pluginImport },
    rules: {
      "no-unused-vars": "warn",
      // keep this off if you don't use TS path maps
      "import/no-unresolved": "off",
    },
  },

  // Jest tests (CommonJS + Jest globals)
  {
    files: ["tests/**/*.js", "**/*.test.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        // Jest globals
        test: "readonly",
        it: "readonly",
        expect: "readonly",
        describe: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        // CJS globals sometimes used in tests
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
  },

  // Any *.cjs files (if present)
  {
    files: ["**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
  },
];
