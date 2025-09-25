// eslint.config.js
import js from '@eslint/js';
import pluginImport from 'eslint-plugin-import';

export default [
  { ignores: ['node_modules/**', 'dist/**', 'coverage/**', '.eslintrc.cjs'] },
  js.configs.recommended,

  // app code (ESM)
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    plugins: { import: pluginImport },
    rules: {
      'no-unused-vars': 'warn',
      'import/no-unresolved': 'off',
    },
  },

  // CommonJS config files (*.cjs)
  {
    files: ['**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: { module: 'readonly', require: 'readonly', __dirname: 'readonly', __filename: 'readonly' },
    },
  },

  // ✅ Jest test files (.js and .mjs): define Jest globals
  {
    files: ['tests/**/*.js', '**/*.test.js', 'tests/**/*.mjs', '**/*.test.mjs'],
    languageOptions: {
      globals: {
        test: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
  },
];
