const PromiseJz = require('./index.js')

const prom3 = new PromiseJz(function (resolve, reject) {
  reject(0)
})

prom3.then(value => {
  console.log('prom3成功', value)
}, reason => {
  console.log('prom3失败', reason)
})

const prom4 = new PromiseJz(function (resolve, reject) {
  resolve(1)
})

prom4.then(value => {
  console.log('prom4成功', value)
}, reason => {
  console.log('prom4失败', reason)
})

const prom5 = new PromiseJz(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000)
})

prom5.then(value => {
  console.log('prom5成功', value)
}, reason => {
  console.log('prom5失败', reason)
})

const prom6 = new PromiseJz(function (resolve, reject) {
  setTimeout(() => reject(0), 1000)
})

prom6.then(value => {
  console.log('prom6成功', value)
}, reason => {
  console.log('prom6失败', reason)
})

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