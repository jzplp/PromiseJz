// 三种状态常量
const STATE_PENDING = 'pending'
const STATE_FULFILLED = 'fulfilled'
const STATE_REJECTED = 'rejected'

class PromiseJz {
  // 构造函数，接收一个函数作为入参
  constructor(executor) {
    try {
      // 立即执行函数 需要手动指定bind指向
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch(err) {
      // 如果是同步代码，需要用微任务延迟执行，以获取到是否调用了then方法
      queueMicrotask(() => {
        // 出现异常则认为rejected
        this.reject(err)
        // 如果捕获不到就抛出
        if(!this.thenOnRejectedFlag) ;
          // throw err
      })
    }
  }

  // 实例属性 状态，默认为pending
  state = STATE_PENDING
  // 成功的值
  value = null
  // 失败的原因
  reason = null
  // 异步promise调用then时的回调 处理对同一个Promise多次调用then的情况，需要用数组
  onFulfilledCallbackList = []
  onRejectedCallbackList = []
  // 是否传入过then中的onRejected
  thenOnRejectedFlag = false

  resolve(value) {
    // 在构造函数回调中返回自身
    if(value === this) {
      // 触发rejected状态
      this.rejectHandle(TypeError('Chaining cycle detected for promise #<Promise>'))
      return
    }
    // 如果值为一个新的Promise，那么状态由这个新的Promise确定
    if(value instanceof PromiseJz) {
      value.then(newValue => {
        this.resolveHandle(newValue)
      }, newReason => {
        this.rejectHandle(newReason)
      })
    } else {
      this.resolveHandle(value)
    }
  }
  // resolve函数状态变更的处理逻辑
  resolveHandle(value) {
    // 只处理pending状态
    if(this.state !== STATE_PENDING) return
    this.state = STATE_FULFILLED
    this.value = value
    // 状态改变时如果有回调函数需要执行
    this.onFulfilledCallbackList.forEach(callback => callback(value))
    // 处理完再清空数组
    this.onFulfilledCallbackList = []
  }

  reject(reason) {
    this.rejectHandle(reason)
  }

  // reject函数状态变更的处理逻辑
  rejectHandle(reason) {
    // 只处理pending状态
    if(this.state !== STATE_PENDING) return
    this.state = STATE_REJECTED
    this.reason = reason
    // 状态改变时如果有回调函数需要执行
    this.onRejectedCallbackList.forEach(callback => callback(reason))
    // 处理完再清空数组
    this.onRejectedCallbackList = []
    // 构造函数中所有rejected都作为异常
    // throw reason
  }

  // then中的回调处理
  // thenPromise then返回的Promise value 返回值  onCallback 回调
  resolutionProduce(thenPromise, value, onCallback, resolve, reject) {
    try {
      const newValue = onCallback(value)
      // 如果循环调用自身，抛出TypeError
      if(thenPromise === newValue) {
        reject(TypeError('Chaining cycle detected for promise #<Promise>'))
      }
      // 如果返回一个Promise，那么状态要根据这个Promise来定
      if(newValue instanceof PromiseJz) {
        newValue.then(resolve, reject)
      } else if(typeof newValue === 'object' || typeof newValue === 'function') {
        // 兼容其它的promise实现
        let then
        try {
          then = newValue.then
        } catch(e) { // 如果抛出异常则设为rejected状态
          reject(e)
          return
        }
        // 如果then不是函数，则设置fulfilled状态
        if(typeof then !== 'function') {
          resolve(newValue) 
          return
        }
        // 是否调用过的标志 只能调用一次
        let calledFlag = false
        // 调用then方法
        then.call(newValue, y => {
          if(calledFlag) return
          calledFlag = true
          this.resolutionProduce(thenPromise, y, v => v, resolve, reject)
        }, r => {
          if(calledFlag) return
          calledFlag = true
          reject(r)
        })
      } else {
        resolve(newValue)
      }
    } catch(err) {
      reject(err)
      // 如果新Promise截止目前没有传入过onRejected，则抛出不能被捕获的异常
      if(!thenPromise.thenOnRejectedFlag) ;
        // throw err
    }
  }

  then(onFulfilled, onRejected) {
    // 回调的默认值，适用于省略入参
    if(!onFulfilled) {
      onFulfilled = value => value
    }
    if(!onRejected) {
      // 使用引发异常的方式来传递 rejected状态
      onRejected = reason => { throw reason }
    } else {
      this.thenOnRejectedFlag = true
    }
    // 返回Promise，适配链式调用
    const thenPromise = new PromiseJz((resolve, reject) => {
      if(this.state === STATE_FULFILLED) {
        queueMicrotask(() => {
          this.resolutionProduce(thenPromise, this.value, onFulfilled, resolve, reject)
        })
      }
      if(this.state === STATE_REJECTED) {
        queueMicrotask(() => {
          this.resolutionProduce(thenPromise, this.reason, onRejected, resolve, reject)
        })
      }
      if(this.state === STATE_PENDING) {
        // pending状态时，无法执行回调，因此把状态写入属性中，等后续状态改变时执行
        this.onFulfilledCallbackList.push((value) => {
          queueMicrotask(() => {
            this.resolutionProduce(thenPromise, value, onFulfilled, resolve, reject)
          })
        })
        this.onRejectedCallbackList.push(reason => {
          queueMicrotask(() => {
            this.resolutionProduce(thenPromise, reason, onRejected, resolve, reject)
          })
        })
      }
    })
    return thenPromise
  }
  // Promise/A+规范的测试工具使用
  static deferred() {
    const res = {};
    res.promise = new PromiseJz(function (resolve, reject) {
      res.resolve = resolve;
      res.reject = reject;
    })
    return res;
  }
}

module.exports = PromiseJz
