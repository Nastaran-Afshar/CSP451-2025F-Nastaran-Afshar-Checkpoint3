// eslint.config.js — Flat config for ESLint v9 (ESM)
import js from '@eslint/js';
import pluginImport from 'eslint-plugin-import';

export default [
  { ignores: ['node_modules/**', 'dist/**', 'coverage/**'] },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
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
];
