import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';
import { baseConfig, baseIgnores, baseOverridesConfig } from './base.js';

export default defineConfig([
  globalIgnores(baseIgnores),
  ...baseConfig,
  ...baseOverridesConfig,
  eslintPluginPrettierRecommended,
]);
