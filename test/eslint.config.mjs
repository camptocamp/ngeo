import globals from 'globals';

export default [
    {
        languageOptions: {
            globals: {
                ...globals.jasmine,
                sinon: true,
            },
        },

        rules: {
            'valid-jsdoc': 'off',
        },
    },
];
