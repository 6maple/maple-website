import { createProcessor, getReportMessage } from './src';

run();

async function run() {
  const processor = createProcessor();
  const file = await processor.process(`---
user: 
  name: Maple
  age: 18
des: hillll
---
# Hello world!
:::info
This is an info block.
:::
    `);

  console.error(getReportMessage(file));
  console.log('================');
  console.log(String(file));
}
