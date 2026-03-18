---
title: 异步调度
tag:
  zh-CN: 技术博客
  en: Technical Blog
date: 2026-03-17
description: 介绍异步调度的核心概念，包括事件循环、微任务队列、宏任务队列等。
---

# 异步调度

## 事件循环

事件循环是 JavaScript 实现非阻塞 I/O 的核心机制。由于 JS 是单线程的，它需要一种机制来处理异步操作，而不会让主线程“卡死”。

### 核心模型：执行栈与任务队列

事件循环的运行可以简化为以下三个角色的协作：

1. 执行栈 (Call Stack)：同步代码执行的地方。
2. 微任务队列 (Microtask Queue)：存放 Promise.then/catch/finally、MutationObserver、process.nextTick (Node.js)。
3. 宏任务队列 (Task/Macrotask Queue)：存放 setTimeout、setInterval、setImmediate、I/O 操作、UI 渲染。

### 执行循环的“黄金定律”

事件循环的每一轮循环都遵循严格的先后顺序：

1. 执行同步代码：从执行栈开始，直到栈空。
2. 清空微任务：只要微任务队列不为空，就一直执行。如果执行微任务时又产生了新的微任务，也会在当前轮次内全部执行完。
3. 尝试渲染：如果浏览器认为需要更新 UI，会在此阶段进行重绘。
4. 取出宏任务：从宏任务队列中取出一个（且仅一个）任务放入执行栈执行。
5. 回到步骤 2。

> 总结：微任务是“插队者”，宏任务是“排队者”。微任务必须在当前宏任务结束、下一个宏任务开始前全部清空。

接下来看一下代码示例：

```javascript
console.log('1'); // 同步
setTimeout(() => {
  console.log('2'); // 宏任务 1
  Promise.resolve().then(() => {
    console.log('3'); // 宏任务 1 产生的微任务
  });
}, 0);

new Promise((resolve) => {
  console.log('4'); // Promise 构造函数是同步的
  resolve();
}).then(() => {
  console.log('5'); // 微任务 1
});

console.log('6'); // 同步
// 1, 4, 6, 5, 2, 3
```

执行过程拆解：

1. 同步阶段：输出 1 -> 遇到 setTimeout（挂起，放入宏任务队列） -> 输出 4 -> 遇到 then（放入微任务队列） -> 输出 6。
2. 微任务阶段：检查队列，发现有 5。输出 5。此时微任务清空。
3. 渲染阶段（略）。
4. 下一轮宏任务：取出 setTimeout 回调。输出 2 -> 遇到内部 then（放入微任务队列）。
5. 宏任务后的微任务：虽然本轮宏任务结束了，但必须先清空新产生的微任务。输出 3。

### Vue 3 中的应用：nextTick 的本质

在 Vue 3 中，当你修改响应式数据（如 count.value++），Vue 并不会立即更新 DOM。它会开启一个异步缓冲队列，并将更新逻辑推入微任务队列。

```javascript
// nextTick 的简化原理
export function nextTick(fn) {
  const p = Promise.resolve();
  return fn ? p.then(fn) : p;
}
```

为什么要用微任务而不是宏任务？

因为微任务会在当前脚本执行完后立即执行，甚至早于浏览器的下一次重绘（Repaint）。如果使用 setTimeout（宏任务），页面可能会出现明显的闪烁或不必要的中间状态渲染。

## 并发队列最大可执行数限制

```javascript
const scheduler = createScheduler(2);
const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));
const addTask = (time, order) => {
  scheduler
    .addTask(() => timeout(time))
    .then(() => console.log(`任务 ${order} 完成`));
};
addTask(1000, 1); // 1s后输出
addTask(500, 2); // 0.5s后输出
addTask(300, 3); // 0.8s后输出 (因为2完成后3立即开始)
addTask(400, 4); // 1.2s后输出 (因为1完成后4立即开始)

function createScheduler(limit) {
  const queue = [];
  let rest = limit;
  const execTask = async (handler, resolve, reject) => {
    try {
      await handler();
      resolve();
    } catch (error) {
      reject(error);
    }
  };
  const addTask = async (handler) => {
    const promise = new Promise((resolve, reject) => {
      queue.push(execTask.bind(null, handler, resolve, reject));
      tryExecute();
    });
    return promise;
  };
  const tryExecute = () => {
    while (rest > 0 && queue.length > 0) {
      const task = queue.shift();
      rest--;
      task().then(() => {
        rest++;
        tryExecute();
      });
    }
  };
  return {
    addTask,
  };
}
```

### 关键点

1. 添加任务时，将任务的执行器加入队列。
2. 然后尝试执行任务，直到队列为空，或者剩下的可执行任务数为0。
3. 当一个任务完成时，可执行任务数+1，回到步骤2。
