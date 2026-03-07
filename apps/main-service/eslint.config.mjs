import { defineConfig } from 'eslint/config';
import nodeConfig from '@repo/eslint-config/node';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig(...nodeConfig, eslintPluginPrettierRecommended);
