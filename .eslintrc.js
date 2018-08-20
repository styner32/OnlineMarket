module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "import"
  ],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-boolean-value": 0,
    "react/prefer-stateless-function": 0,
    "global-require": 0,
    "class-methods-use-this": 0,
    "react/prop-types": [2, { "ignore": ["children"] }],
    "react/forbid-prop-types": [2, { "forbid": ["any", "arra"] }],
    "max-len": [1, { "code": 100, "ignoreStrings": true, "ignoreTemplateLiterals": true }],
    "no-bitwise": 0,
    "no-mixed-operators": 0
  },
  "globals": {
    "contract": true,
    "artifacts": true,
    "document": true,
    "window": true
  }
};
