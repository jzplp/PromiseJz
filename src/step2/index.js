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
  // 异步promise调用then时的回调
  onFulfilledCallback = null
  onRejectedCallback = null

  resolve(value) {
    // 只处理pending状态
    if(this.state !== STATE_PENDING) return
    this.state = STATE_FULFILLED
    this.value = value
    // 状态改变时如果有回调函数需要执行
    if(this.onFulfilledCallback) this.onFulfilledCallback(value)
  }
  reject(reason) {
    // 只处理pending状态
    if(this.state !== STATE_PENDING) return
    this.state = STATE_REJECTED
    this.reason = reason
    // 状态改变时如果有回调函数需要执行
    if(this.onRejectedCallback) this.onRejectedCallback(reason)
  }

  then(onFulfilled, onRejected) {
    if(this.state === STATE_FULFILLED) {
      onFulfilled(this.value)
    }
    if(this.state === STATE_REJECTED) {
      onRejected(this.reason)
    }
    if(this.state === STATE_PENDING) {
      // pending状态时，无法执行回调，因此把状态写入属性中，等后续状态改变时执行
      this.onFulfilledCallback = onFulfilled
      this.onRejectedCallback = onRejected
    }
  }
}

module.exports = PromiseJz
