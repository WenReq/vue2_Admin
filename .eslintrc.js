// "off" or 0 - 关闭这个规则校验
// "warn" or 1 - 开启这个规则校验，但只是提醒，不会退出
// "error" or 2 - 开启这个规则校验，并退出

module.exports = {
  root: true,
  // parserOptions: {
  //   ecmaVersion: 7,
  //   ecmaFeatures: {
  //     jsx: true,
  //     modules: true,
  //   },
  //   parser: 'babel-eslint',
  // },

  env: {
    es6: true,
    node: true,
  },

  extends: ['eslint:recommended', 'plugin:vue/recommended'],

  plugins: ['vue'],

  globals: {
    document: false,
    navigator: false,
    window: false,
    process: true,
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-useless-template-attributes': 'off',
    'vue/no-reserved-component-names': 'off',
  },
};
