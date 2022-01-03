module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 不需要分号
    semi: ['error', 'never'],
    // 允许使用 ++
    'no-plusplus': 'off',
    // 设置行最大长度
    'max-len': ['error', 120, 2, {
      // 忽略含有链接的行
      ignoreUrls: true,
      // 忽略包含模板字面量的行
      ignoreTemplateLiterals: true,
      // 忽略含有字符串的行
      ignoreStrings: true,
    }],
    // 在可以省略括号的地方强制不使用括号
    'arrow-parens': ['error', 'as-needed'],
    // 警告未使用的变量
    'no-unused-vars': 'warn',
    // 关闭函数命名检测
    'func-names': 'off',
    // 允许未使用过的表达式
    'no-unused-expressions': 'off',
    // 运算符必须添加括号
    'no-mixed-operators': ['error', {
      // 允许同级
      allowSamePrecedence: true,
    }],
    // 允许下划线命名
    'no-underscore-dangle': 'off',
  },

  overrides: [
    {
      files: '**/*.vue',
      rules: {
        // 不需要自闭和标签空格
        'vue/html-closing-bracket-spacing': ['warn', {
          selfClosingTag: 'never',
        }],
        // 自闭和标签
        'vue/html-self-closing': ['warn', {
          html: {
            normal: 'never',
            void: 'always',
          },
        }],
        // 限制html属性单行最大数量
        'vue/max-attributes-per-line': ['error', {
          singleline: {
            max: 5,
          },
          multiline: {
            max: 1,
          },
        }],
        // 关闭组件名称必须多词
        'vue/multi-word-component-names': 'off',
        // 关闭html属性排序，因为自定义效果不好
        'vue/attributes-order': 'off',
        // 组件属性排序
        'vue/order-in-components': ['warn', {
          'order': [
            'el',
            'name',
            'key',
            'parent',
            'functional',
            ['components', 'directives', 'filters'],
            'extends',
            'mixins',
            ['provide', 'inject'],
            'inheritAttrs',
            'model',
            ['props', 'propsData'],
            'data',
            'computed',
            'watch',
            'ROUTER_GUARDS',
            // 'LIFECYCLE_HOOKS',
            'beforeCreate',
            'created',
            'beforeMount',
            'mounted',
            'beforeUpdate',
            'updated',
            'activated',
            'deactivated',
            'beforeDestroy',
            'destroyed',
            'methods',
            ['template', 'render'],
            'renderError',
          ],
        }],
        // 警告未使用的组件
        'vue/no-unused-components': 'warn',
      },
    },
  ],
}
