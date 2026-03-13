---
user:
  name: Maple
  age: 18
des: hi this is description
---

# Hello world!

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

3. 原型链 (Prototype Chain)
   JavaScript 对象通过 proto 属性指向其构造函数的 prototype 对象。当我们访问一个属性时，如果当前对象没有，引擎就会沿着这条“链”向上查找，直到找到或到达 null。

- Object.prototype.proto === null （链的终点）。
- Vue 3 提示：Vue 3 的插件机制或全局属性挂载（config.globalProperties）在底层逻辑上依然遵循这种属性查找思想。

4. 核心：内存结构图
   为了让你看清闭包和原型链在内存中的真实状态，我们以一段代码为例：

```javascript
function Parent() {
  this.name = 'admin';
}
Parent.prototype.sayHi = function () {
  console.log('hi');
};

function createClosure() {
  let secret = 'Top Secret';
  return () => secret;
}
const getSecret = createClosure();
```

内存分布详解：

1. 栈（Stack）：存放执行上下文（Execution Context）。当 createClosure 执行时入栈，返回后出栈。
2. 堆（Heap）：

- 闭包块：虽然 createClosure 出栈了，但由于 getSecret 引用了 secret，secret 变量会从栈中转移到堆中的一个特殊对象里，供内部函数持久访问。
- 原型对象：Parent.prototype 是堆中一个独立对象。实例的 **proto** 指针指向它。

3. 引用关系：

- **proto** 建立了对象间的逻辑链条。
- [[Scopes]] 属性建立了函数对外部变量的引用链条。

面试官，基于这些基础概念，您是否需要我进一步演示如何在 Vue 3 的 Composition API（如 setup 函数）中利用闭包特性封装自定义 Hook？
