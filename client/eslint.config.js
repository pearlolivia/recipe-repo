import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "indent": ["error", 4, { "SwitchCase": 1 }],
      "camelcase": "off",
      "no-underscore-dangle": "off",
      "no-alert": "off",
      "no-restricted-globals": "off",
      "no-param-reassign": ["error", { "props": false }],
      "linebreak-style": "off",
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
      "react/jsx-indent": "off",
      "react/prefer-stateless-function": "off",
      "react/jsx-max-props-per-line": [1, { "maximum": 1 }],
      "react/jsx-props-no-spreading": ["off", {
          "html": "ignore",
          "custom": "ignore",
          "exceptions": []
      }],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
            "js": "never",
            "jsx": "never",
            "ts": "never",
            "tsx": "never"
        }
      ]
    },
  },
)
