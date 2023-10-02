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
*/
/*
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


const prom21 = new PromiseJz(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000)
}).then(value => {
  throw Error(value)
})
// 情况1
// prom21.then(() => {})
// 情况2
prom21.then(() => {}, reason => {
  console.log('prom21失败2',reason)
})
*/
/*
const prom22 = new PromiseJz(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000)
}).then(value => {
  throw Error(value)
})
setTimeout(() => {
  prom22.then(() => {}, reason => {
    console.log('prom22失败2',reason)
  })
}, 2000)
*/

// PromiseJz = Promise
/*
const prom24 = new PromiseJz(function (resolve, reject) {
  const returnProm = new PromiseJz((resolveItem) => resolveItem(10))
  setTimeout(() => resolve(returnProm), 1000)
})
prom24.then(value => {
  console.log('prom24成功', value)
})
*/

/*
PromiseJz = Promise
const prom25 = new PromiseJz(function (resolve, reject) {
  const returnProm = new PromiseJz((resolveItem) => setTimeout(() => resolveItem(10), 3000))
  setTimeout(() => {
    resolve(returnProm)
    console.log('1秒时')
    setTimeout(() => { console.log('2秒时', prom25) }, 1000)
  }, 1000)
})
prom25.then(value => {
  console.log('3秒时 prom25成功', value)
})
*/

/*
// PromiseJz = Promise
const prom26 = new PromiseJz(function (resolve, reject) {
  const returnProm = new PromiseJz((resolveItem, rejectItem) => setTimeout(() => resolveItem(10), 3000))
  setTimeout(() => {
    reject(returnProm)
    console.log('1秒时')
    setTimeout(() => { console.log('2秒时', prom26) }, 1000)
  }, 1000)
})
prom26.then(value => {
  console.log('3秒时 prom25成功', value)
}, resaon => {
  console.log('3秒时 prom25失败', resaon)
})
*/

// PromiseJz = Promise
// new PromiseJz((resolveItem) => resolveItem(10)).then(value => console.log("prom27成功", value))



/*
const prom23 = new PromiseJz(function (resolve, reject) {
  setTimeout(() => resolve(prom23), 1000)
})
prom23.then(value => {
  console.log('prom23成功', value)
})


new PromiseJz((resolve, reject) => { reject(0) })

*/