import reactPlugin from 'eslint-plugin-react';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsx_a11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

export default tseslint.config({
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['dist/**'],
    languageOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: tseslint.parser,
        parserOptions: {
            ecmaFeatures: {
                jsx: true
            }
        },
        globals: {
            browser: true
        }
    },
    plugins: {
        react: reactPlugin,
        'react-refresh': reactRefreshPlugin,
        'react-hooks': reactHooksPlugin,
        import: importPlugin,
        'jsx-a11y': jsx_a11y,
        prettier: prettierPlugin,
        'unused-imports': unusedImportsPlugin
    },
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'prettier/prettier': [
            'warn',
            {
                bracketSpacing: true,
                printWidth: 140,
                singleQuote: true,
                trailingComma: 'none',
                tabWidth: 4,
                useTabs: false,
                endOfLine: 'auto'
            }
        ],
        'unused-imports/no-unused-imports': 'warn',
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_'
            }
        ],
        '@typescript-eslint/no-unused-vars': 'off'
    }
});
