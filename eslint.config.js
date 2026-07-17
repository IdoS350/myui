import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import noParentImport from './eslint-rules/no-parent-import.js'

export default defineConfig([
  globalIgnores(['dist', 'build', 'storybook-static']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: [
      'src/components/**/*.{ts,tsx}',
      'src/hooks/**/*.{ts,tsx}',
      'src/lib/**/*.{ts,tsx}',
      'src/theme/**/*.{ts,tsx}',
    ],
    ignores: ['src/**/*.stories.{ts,tsx}'],
    plugins: {
      local: {
        rules: {
          'no-parent-import': noParentImport,
        },
      },
    },
    rules: {
      'local/no-parent-import': 'error',
    },
  },
])
