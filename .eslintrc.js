module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2020": true
    },
    "extends": [
        "airbnb-base",
        "plugin:prettier/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2020
    },
    "rules": {
        "prettier/prettier": [
            "error",
            {
                "trailingComma": "es5",
                "semi": true,
                "printWidth": 80
            }
        ],
        "comma-dangle": [
            "error",
            {
                "arrays": "always-multiline",
                "objects": "always-multiline",
                "imports": "never",
                "exports": "never",
                "functions": "ignore"
            }
        ],
        "no-param-reassign": [
            "error",
            {
                "props": false
            }
        ],
        "no-console": ["warn", {
            "allow": ["warn", "error", "info"]
        }
        ],
        "quotes": [
            "error",
            "backtick",
            {
                "avoidEscape": true,
                "allowTemplateLiterals": false
            }
        ],
    }
};
