import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import { baseConfig, baseIgnores, baseOverridesConfig } from './base.js';

export default defineConfig([
  ...baseConfig,
  ...baseOverridesConfig,
  eslintPluginPrettierRecommended,

  {
    ignores: baseIgnores,
  },
]);
