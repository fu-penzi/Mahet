module.exports = {
  env: {
    browser: true,
    es2021: true,
    "react-native/react-native": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "@react-native-community",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "react-native"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    quotes: ["error", "double"],
    // semi: ["error", "always"],
    "react-native/no-unused-styles": 0,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 0,
    "react-native/no-color-literals": 0,
    "react-native/no-raw-text": 0,
    "react-native/no-single-element-style-arrays": 2,
  },
};
