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