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
  resolve(value) {
    // 只处理pending状态
    if(this.state !== STATE_PENDING) return
    this.state = STATE_FULFILLED
  }
  reject(reason) {
    // 只处理pending状态
    if(this.state !== STATE_PENDING) return
    this.state = STATE_REJECTED
  }
}

module.exports = PromiseJz
