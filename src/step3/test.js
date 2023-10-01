let PromiseJz = require('./index.js')

// PromiseJz = Promise

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
  reject(0)
})
prom9.then((value) => {
  console.log('prom9成功', value)
}).then(null, reason => {
  console.log('prom9失败', reason)
})

const prom10 = new PromiseJz(function (resolve, reject) {
  resolve(1)
})
prom10.then(null, reason => {
  console.log('prom10失败', reason)
}).then((value) => {
  console.log('prom10成功', value)
})

const prom11 = new PromiseJz(function (resolve, reject) {
  setTimeout(() => reject(0), 1000)
})
prom11.then((value) => {
  console.log('prom11成功', value)
}).then(null, reason => {
  console.log('prom11失败', reason)
})

const prom12 = new PromiseJz(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000)
})
prom12.then(null, reason => {
  console.log('prom12失败', reason)
}).then((value) => {
  console.log('prom12成功', value)
})

const prom13 = new PromiseJz(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000)
})

prom13.then(value => {
  return new PromiseJz((resolve, reject) => {
    setTimeout(() => resolve(value + 1), 1000)
  })
}).then((value) => {
  console.log('prom13成功', value)
})

const prom14 = new PromiseJz(function (resolve, reject) {
  resolve(1)
})

prom14.then(value => {
  return new PromiseJz((resolve, reject) => {
    setTimeout(() => resolve(value + 1), 1000)
  })
}).then((value) => {
  console.log('prom14成功', value)
})

const prom15 = new PromiseJz(function (resolve, reject) {
  setTimeout(() => reject(0), 1000)
})

prom15.then(null, reason => {
  return new PromiseJz((resolve, reject) => {
    setTimeout(() => resolve(reason - 1), 1000)
  })
}).then((value) => {
  console.log('prom15成功', value)
})
