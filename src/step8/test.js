let PromiseJz = require('./index.js')

PromiseJz = Promise

/*
const prom34 = new PromiseJz((resolve, reject) => { reject(0) }).finally(() => {
  console.log('prom34 finally')
})
prom34.then(value => {
  console.log('prom34成功', value)
}, reason => {
  console.log('prom34失败', reason)
})
*/
/*
const prom35 = new PromiseJz((resolve, reject) => { resolve(0) }).finally(() => {
  console.log('prom35 finally')
  throw 2
})
prom35.then(value => {
  console.log('prom35成功', value)
}, reason => {
  console.log('prom35失败', reason)
})
*/

const prom36 = new PromiseJz((resolve, reject) => { resolve(0) }).finally(() => {
  console.log('prom36 finally')
  return new PromiseJz((resolveItem, rejectItem) => {
    setTimeout(() => rejectItem(2), 2000)
  })
})
prom36.then(value => {
  console.log('prom36成功', value)
}, reason => {
  console.log('prom36失败', reason)
})
