import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';
import { baseConfig, baseIgnores, baseOverridesConfig } from './base.js';

export const vueConfig = defineConfig([
  globalIgnores(baseIgnores),
  ...baseConfig,
  ...pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  ...baseOverridesConfig,
  {
    rules: {
      // vue
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'off', // 存疑
      'vue/multi-word-component-names': 'off', // 存疑
      'vue/prefer-import-from-vue': 'off', // 存疑
      'vue/no-v-text-v-html-on-component': 'off',
      'vue/padding-line-between-blocks': ['warn', 'always'],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          // 是否允许自动检查并修复已注册的自定义组件
          registeredComponentsOnly: false,
          // 允许忽略某些特定的组件名（如某些第三方库组件）
          ignores: [],
        },
      ],
    },
  },
  {
    files: ['**/__tests__/**.*', '*spec.ts'],
    rules: {
      'no-console': 'off',
      'vue/one-component-per-file': 'off',
    },
  },
  {
    files: ['*.vue', '**/*.vue'],
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'pascalCase',
        },
      ],
    },
  },
  {
    files: ['**/src/pages/**/*.vue'],
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
    },
  },
]);

export default defineConfigWithVueTs([
  ...vueConfig,
  eslintPluginPrettierRecommended,
]);
