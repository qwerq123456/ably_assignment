module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'airbnb',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['prettier', '@typescript-eslint'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: true,
                useTabs: false,
                tabWidth: 4,
                printWidth: 80,
                bracketSpacing: true,
                arrowParens: 'avoid',
            },
        ],
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
};