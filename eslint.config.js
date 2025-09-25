// eslint.config.js  — ESLint v9 flat config (ESM)
import js from '@eslint/js';
import pluginImport from 'eslint-plugin-import';

export default [
  // ✅ never lint the config file itself
  { ignores: ['eslint.config.js', 'node_modules/**', 'dist/**', 'coverage/**'] },

  // Base recommended rules
  js.configs.recommended,

  // App source: CommonJS
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    plugins: { import: pluginImport },
    rules: {
      'no-unused-vars': 'warn',
      'import/no-unresolved': 'off',
    },
  },

  // Tests: CommonJS + Jest globals
  {
    files: ['tests/**/*.js', '**/*.test.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        // Jest
        test: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        // CJS
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },

  // Any *.cjs files (if you keep some)
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
];
