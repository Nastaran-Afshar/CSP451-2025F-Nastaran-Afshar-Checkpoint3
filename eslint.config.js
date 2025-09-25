// eslint.config.js — Flat config for ESLint v9 (ESM)
import js from '@eslint/js';
import pluginImport from 'eslint-plugin-import';

export default [
  // Ignore generated & legacy config files
  { ignores: ['node_modules/**', 'dist/**', 'coverage/**', '.eslintrc.cjs'] },

  // Base recommended rules
  js.configs.recommended,

  // Default: ESM project code
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: { import: pluginImport },
    rules: {
      'no-unused-vars': 'warn',
      'import/no-unresolved': 'off',
    },
  },

  // CommonJS files (*.cjs): allow module/require globals
  {
    files: ['**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },

  // Jest test files: allow test/expect/describe/etc.
  {
    files: ['tests/**/*.js', '**/*.test.js'],
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
