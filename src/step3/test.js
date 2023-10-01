const PromiseJz = require('./index.js')

const prom7 = new PromiseJz(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000)
})

prom7.then(value => {
  console.log('prom7成功1', value)
}, reason => {
  console.log('prom7失败1', reason)
})
prom7.then(value => {
  console.log('prom7成功2', value)
}, reason => {
  console.log('prom7失败2', reason)
})

const prom8 = new PromiseJz(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000)
})
prom8.then((value) => value + 1).then((value) => {
  console.log('prom8成功', value)
})

const prom9 = new PromiseJz(function (resolve, reject) {
  reject(1)
})
prom9.then((value) => value + 1).then((value) => {
  console.log('prom9成功', value)
}).then(null, reason => {
  console.log('prom9失败', reason)
})
