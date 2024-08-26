import globals from 'globals';

export default [
    {
        languageOptions: {
            globals: {
                ...globals.jasmine,
                sinon: true,
            },
        },
    },
];
