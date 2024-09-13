import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...compat.extends(
        'eslint:recommended',
        'plugin:jsdoc/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:wc/recommended',
        'plugin:lit/recommended',
        'plugin:storybook/recommended',
    ),
    {
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.jquery,
            },

            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: 'module',

            parserOptions: {
                project: ['tsconfig-all.json'],
            },
        },

        settings: {
            jsdoc: {
                preferredTypes: {
                    '[]': null,
                    'Array<>': '[]',
                },
            },
        },

        rules: {
            'no-multi-asterisks': 'off',
            'no-prototype-builtins': 'warn',
            'no-case-declarations': 'warn',
            'no-eq-null': 'error',
            'no-multi-assign': 'error',
            'no-negated-in-lhs': 'error',
            'no-use-before-define': ['error', 'nofunc'],
            'no-var': 'error',
            'jsdoc/require-param-type': 'off',
            'jsdoc/require-property-type': 'off',
            'jsdoc/require-returns-type': 'off',
            'jsdoc/check-tag-names': 'warn',
            'jsdoc/check-types': 'off',
            'jsdoc/no-undefined-types': 'warn',
            'jsdoc/require-returns-description': 'warn',
            'jsdoc/require-param-description': 'warn',
            'jsdoc/require-property-description': 'warn',
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'warn',
            '@typescript-eslint/no-unsafe-member-access': 'warn',
            '@typescript-eslint/no-unsafe-assignment': 'warn',
            '@typescript-eslint/no-unsafe-return': 'warn',
            '@typescript-eslint/no-unsafe-call': 'warn',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/unbound-method': 'warn',
            '@typescript-eslint/restrict-template-expressions': 'warn',
            '@typescript-eslint/no-misused-promises': 'warn',
            '@typescript-eslint/require-await': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-unused-expressions': 'warn',
            '@typescript-eslint/prefer-promise-reject-errors': 'warn',
            '@typescript-eslint/no-require-imports': 'warn',
            '@typescript-eslint/no-useless-constructor': 'error',
            '@typescript-eslint/prefer-for-of': 'error',
            '@typescript-eslint/prefer-includes': 'error',
            '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        },
    },
];
