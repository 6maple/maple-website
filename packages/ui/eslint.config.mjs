import {
  configureVueProject,
  defineConfigWithVueTs,
} from '@vue/eslint-config-typescript';
import { vueConfig } from '@repo/eslint-config/vue';
import pluginOxlint from 'eslint-plugin-oxlint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

configureVueProject({ scriptLangs: ['ts', 'tsx'] });

export default defineConfigWithVueTs(
  ...vueConfig,
  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
  eslintPluginPrettierRecommended,
);
