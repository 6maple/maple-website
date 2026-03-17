---
title: 测试文章
date: 2023-10-01
description: 这是一个测试文章
---

# Hello world!

![示例图片](/favicon.ico?url)

:::info
This is an info block.
:::

```typescript twoslash
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
const d: Pick<{ a: number; b: string }, 'a'> = { a: 1 };
const c: number = 1;
```

```typescript
function foo() {
  if (window) {
    console.log('window'); // [!code highlight]
  }
}
```

---

1. 作用域 (Scope)
   作用域决定了变量的可见性与生命周期。JavaScript 采用的是词法作用域（Lexical Scope），即函数的作用域在函数定义时就决定了，而不是在执行时。

- 全局作用域：最外层，随处可访问。
- 函数作用域：函数内部定义的变量，外部无法直接访问。
- 块级作用域：let 和 const 引入，仅在 {} 内部有效。

2. 闭包 (Closure)
   定义：一个函数和它周围状态（词法环境）的引用捆绑在一起，形成了闭包。
   本质：当外部函数执行完毕，其执行上下文被销毁，但如果内部函数引用了外部函数的变量，这些变量会被保存在内存中，不会被垃圾回收（GC）掉。
   场景模拟

```javascript
function createCounter() {
  let count = 0; // 自由变量，被捕获到闭包中
  return function () {
    return ++count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
```
