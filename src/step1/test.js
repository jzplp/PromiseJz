const PromiseJz = require('./index.js')

const prom1 = new PromiseJz(function (resolve, reject) {
  console.log('立即执行')
  resolve(1)
  // 状态改变一次之后，就不能再变化
  reject(0)
})
console.log(prom1)

const prom2 = new PromiseJz(function (resolve, reject) {
  console.log('立即执行')
  reject(0)
  resolve(1)
})
console.log(prom2)

