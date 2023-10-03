let PromiseJz = require('./index.js')

PromiseJz = Promise

/*
const prom31 = new PromiseJz((resolve, reject) => { reject(0) }).finally(() => {
  console.log('prom31 finally')
})
prom31.then(value => {
  console.log('prom31成功', value)
}, reason => {
  console.log('prom31失败', reason)
})
*/

/*
const prom32 = new PromiseJz((resolve, reject) => { resolve(0) }).finally(() => {
  console.log('prom32 finally')
  throw 2
})
prom32.then(value => {
  console.log('prom32成功', value)
}, reason => {
  console.log('prom32失败', reason)
})
*/

const prom33 = new PromiseJz((resolve, reject) => { resolve(0) }).finally(() => {
  console.log('prom33 finally')
  return new PromiseJz((resolveItem, rejectItem) => {
    setTimeout(() => rejectItem(2), 2000)
  })
})
prom33.then(value => {
  console.log('prom33成功', value)
}, reason => {
  console.log('prom33失败', reason)
})
