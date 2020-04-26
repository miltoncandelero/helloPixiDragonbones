module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    plugins: [
        // explain eslint that we are using typescript.
        // Remember: tslint is deprecated, eslint is the way.
        '@typescript-eslint',
    ],
    extends: [
        // I found this collection of rules to good for me. Not too strict, not too loose.
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
    ],

    "rules": {
        "@typescript-eslint/unbound-method": "off", //pixijs binds differently to .bind
        "prettier/prettier": "warn",
    },

};