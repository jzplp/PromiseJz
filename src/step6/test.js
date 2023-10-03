let PromiseJz = require('./index.js')

// PromiseJz = Promise

PromiseJz.resolve(1).then(value => {
  console.log('prom31成功', value)
}, reason => {
  console.log('prom31失败', reason)
})

const prom32 = new PromiseJz((resolve, reject) => {
  setTimeout(() => reject(1), 1000)
})
PromiseJz.resolve(prom32).then(value => {
  console.log('prom32成功', value)
}, reason => {
  console.log('prom32失败', reason)
})

const prom33 = new PromiseJz((resolve, reject) => {
  setTimeout(() => resolve(1), 1000)
  resolve(1)
})
PromiseJz.reject(prom33).then(value => {
  console.log('prom33成功', value)
}, reason => {
  console.log('prom33失败', reason)
})
