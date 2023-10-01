let PromiseJz = require('./index.js')

// PromiseJz = Promise

/*
const prom16 = new PromiseJz(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000)
})
const prom16Then = prom16.then(value => {
  console.log('prom16成功1', value)
  return prom16Then
})
prom16Then.then(value => {
  console.log('prom16成功2', value)
})

const prom18 = new PromiseJz(function (resolve, reject) {
  setTimeout(() => resolve(prom18), 1000)
})
prom18.then(value => {
  console.log(value)
})

const prom19 = new PromiseJz(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000)
})
prom19.then(value => {
  throw Error(value)
}).then(() => {})

const prom20 = new PromiseJz(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000)
})
prom20.then(value => {
  throw Error(value)
}).then(() => {}, reason => {
  console.log('prom20失败2',reason)
})
*/

const prom21 = new PromiseJz(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000)
}).then(value => {
  throw Error(value)
})
// 情况1
prom21.then(() => {})
// 情况2
/*
prom21.then(() => {}, reason => {
  console.log('prom20失败2',reason)
})
*/