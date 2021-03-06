module.exports = {
  "extends": ["airbnb", "prettier", "prettier/react"],
  "plugins": ["react", "prettier"],
  "rules": {
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", "jsx"]
      }
    ],
    "prettier/prettier": "error",
    "max-len": ["error", 100]
  },
  "env": {
    "browser": true
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./config/webpack-common-config.js"
      }
    }
  }
};
