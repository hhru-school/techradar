const path = require('path');

module.exports = {
    root: true,
    extends: ['plugin:jest/recommended', '@hh.ru/eslint-config', 'prettier'],
    plugins: ['@typescript-eslint', 'babel', 'prettier'],
    parserOptions: { requireConfigFile: false },
    rules: {
        'no-restricted-imports': 0,
        'import/extensions': ['error', 'always', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }],
        'arrow-parens': ['error', 'always'],
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'prettier/prettier': ['error'],
        'no-unused-vars': ['error', { ignoreRestSiblings: true }],
        'no-undef': 0,
        'class-methods-use-this': 'off',
        'babel/no-unused-expressions': ['error', { allowShortCircuit: true }],
        'no-unused-expressions': 'off',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.d.ts'],
            extends: ['@hh.ru/eslint-config/typescript'],
            parserOptions: {
                project: path.join(__dirname, 'tsconfig.json'),
            },
        },
    ],
    settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        'import/resolver': {
            alias: {
                map: [
                    ['src', './src'],
                    ['bloko', './node_modules/@hh.ru/bloko/build'],
                ],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
            },
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
            },
        },
        react: {
            version: 'detect',
        },
    },
};
