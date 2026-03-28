import { createMD, setupMD } from './src';

run();

async function run() {
  const md = createMD();
  setupMD(md);
  const result = await md.renderAsync(`---
user: 
  name: Maple
  age: 18
des: hillll
---
# Hello world!

:::tip tip标题
This is an info block.
:::
    `);

  console.log('================');
  console.log(result);
}
