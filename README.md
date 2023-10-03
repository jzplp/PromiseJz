# PromiseJz
符合Promises/A+规范的Javascript异步编程Promise的完整实现，并且提供了与ECMAScript同样的实用函数。

## 实现说明
这篇文章详细描述了一步一步从零开始实现Promise完整过程，可进行参考。

- 超详细！手把手带你实现一个完整的Promise\
  https://jzplp.github.io/2023/promise-intro.html

## 工程结构说明
src中的不同文件夹按照实现说明的顺序组织，包含了不同阶段Promise的实现代码。其中index.js是Promise的实现代码，其中实现的类名叫做`PromiseJz`。test.js是我们的自测代码。

- src/step1/\
  第一部分 创建Promise类和构造函数
- src/step2/\
  第二部分 初步实现then方法
- src/step3/\
  第三部分 完善then方法
- src/step4\
  第四部分 更多异常处理
- src/APlus/\
  第五部分(A+规范版) **通过Promises/A+规范测试**
- src/step6/\
  第六部分 静态resolve/reject方法
- src/step7/\
  第七部分 catch/finally方法
- src/step8/\
  第八部分 接收数组的静态方法
- src/final/\
  最终完成版 **通过Promises/A+规范测试**

## 开发说明
```sh
# 安装依赖
pnpm install
# 使用test.js对第n部分进行测试
pnpm test:step1
pnpm test:step2
pnpm test:step3
pnpm test:step4
pnpm test:step6
pnpm test:step7
pnpm test:step8
# 使用Promises/A+规范测试工具测试 第五部分(A+规范版)代码
pnpm test:APlus
# 使用Promises/A+规范测试工具测试 最终完成版代码
pnpm test:APlusFinal
```

## 功能说明
不同版本实现的对外可调用的方法。

### 第五部分(A+规范版)
- `PromiseJz.prototype.then()`
- `PromiseJz.deferred()` 测试用

### 最终完成版
- `Promise.prototype.then()`
- `Promise.prototype.catch()`
- `Promise.prototype.finally()`
- `Promise.resolve()`
- `Promise.reject()`
- `Promise.all()`
- `Promise.race()`
- `Promise.allSettled()`
- `Promise.any()`
- `PromiseJz.deferred()` 测试用
