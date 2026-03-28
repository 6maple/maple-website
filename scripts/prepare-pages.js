const path = require('node:path');
const { rmdir, copy, existsSync } = require('fs-extra');

const SOURCE_DIR = path.resolve(__dirname, '../apps/main-web/dist');
const TARGET_DIR = path.resolve(__dirname, '../dist-pages');

run();

async function run() {
  if (existsSync(TARGET_DIR)) {
    await rmdir(TARGET_DIR);
  }
  await copy(SOURCE_DIR, TARGET_DIR, { recursive: true });
}
