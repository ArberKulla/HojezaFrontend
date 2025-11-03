import { defineConfig, globalIgnores } from 'eslint/config';

import globals from 'globals';
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended, reactHooks.configs['recommended-latest'], reactRefresh.configs.vite],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      /* --- General Code Quality --- */
      'no-empty-pattern': 'off',
      'no-console': 'warn',
      'no-debugger': 'warn',

      /* --- React Rules --- */
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',

      /* --- TypeScript Rules --- */
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      /* --- Prettier Integration --- */
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
          singleQuote: true,
          semi: true,
          printWidth: 100,
          trailingComma: 'all',
        },
      ],
    },
  },
]);
