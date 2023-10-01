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
      // 出现异常则认为rejected
      this.reject(err)
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

  resolve(value) {
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
    // 只处理pending状态
    if(this.state !== STATE_PENDING) return
    this.state = STATE_REJECTED
    this.reason = reason
    // 状态改变时如果有回调函数需要执行
    this.onRejectedCallbackList.forEach(callback => callback(reason))
    // 处理完再清空数组
    this.onRejectedCallbackList = []
  }

  // then中的回调处理
  // thenPromise then返回的Promise value 返回值  onCallback 回调
  resolutionProduce(thenPromise, value, onCallback, resolve, reject) {
    try {
      const newValue = onCallback(value)
      // 如果循环调用自身，抛出TypeError
      if(thenPromise === newValue) {
        throw TypeError('Chaining cycle detected for promise #<Promise>')
      }
      // 如果返回一个Promise，那么状态要根据这个Promise来定
      if(newValue instanceof PromiseJz) {
        newValue.then(resolve, reject)
      } else {
        resolve(newValue)
      }
    } catch(err) {
      reject(err)
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
    }
    // 返回Promise，适配链式调用
    const thenPromise = new PromiseJz((resolve, reject) => {
      if(this.state === STATE_FULFILLED) {
        this.resolutionProduce(thenPromise, this.value, onFulfilled, resolve, reject)
      }
      if(this.state === STATE_REJECTED) {
        this.resolutionProduce(thenPromise, this.reason, onRejected, resolve, reject)
      }
      if(this.state === STATE_PENDING) {
        // pending状态时，无法执行回调，因此把状态写入属性中，等后续状态改变时执行
        this.onFulfilledCallbackList.push((value) => {
          this.resolutionProduce(thenPromise, value, onFulfilled, resolve, reject)
        })
        this.onRejectedCallbackList.push(reason => {
          this.resolutionProduce(thenPromise, reason, onRejected, resolve, reject)
        })
      }
    })
    return thenPromise
  }
}

module.exports = PromiseJz
