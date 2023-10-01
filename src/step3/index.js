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

  then(onFulfilled, onRejected) {
    // 返回Promise，适配链式调用
    return new PromiseJz((resolve, reject) => {
      if(this.state === STATE_FULFILLED) {
        try {
          resolve(onFulfilled(this.value))
        } catch(err) {
          reject(err)
        }
      }
      if(this.state === STATE_REJECTED) {
        try {
          resolve(onRejected(this.reason))
        } catch(err) {
          reject(err)
        }
      }
      if(this.state === STATE_PENDING) {
        // pending状态时，无法执行回调，因此把状态写入属性中，等后续状态改变时执行
        // 处理链式调用，需要返回promise状态
        this.onFulfilledCallbackList.push((value) => {
          try {
            resolve(onFulfilled(value))
          } catch(err) {
            reject(err)
          }
        })
        this.onRejectedCallbackList.push(reason => {
          try {
            resolve(onRejected(reason))
          } catch(err) {
            reject(err)
          }
        })
      }
    })
  }
}

module.exports = PromiseJz
