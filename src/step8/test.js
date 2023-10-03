let PromiseJz = require('./index.js')

// PromiseJz = Promise

// PromiseJz.all(123)

/*
PromiseJz.all([]).then(value => {
  console.log(value)
})
*/

const prom37 = new PromiseJz((resolve, reject) => { resolve(37) })
const prom38 = new PromiseJz((resolve, reject) => {
  setTimeout(() => resolve(38), 2000)
})
const prom39 = new PromiseJz((resolve, reject) => {
  setTimeout(() => resolve(39), 1000)
})

/*
const prom41 = new PromiseJz((resolve, reject) => {
  setTimeout(() => reject(41), 1000)
})
/*
PromiseJz.all([prom37, prom38, prom39, 40, prom41]).then(value => {
  console.log(value)
}, reason => {
  console.log(reason)
})
*/
let count = 0
const iteratorObj = {
  [Symbol.iterator]: () => {
    return {
      next: () => {
        ++count;
        let value = null
        switch(count) {
          case 1: value = prom37
            break
          case 2: value = prom38
            break
          case 3: value = prom39
            break
          case 4: value = 40
            break
          default: return { done: true }
        }
        return {
          value: value,
          done: false
        };
      }
    };
  }
};

/*
PromiseJz.all(iteratorObj).then(value => {
  console.log(value)
}, reason => {
  console.log(reason)
})

PromiseJz.race([]).then(value => {
  console.log(1, value)
}, reason => {
  console.log(2, reason)
})

PromiseJz.race(iteratorObj).then(value => {
  console.log(1, value)
}, reason => {
  console.log(2, reason)
})

PromiseJz.allSettled([]).then(value => {
  console.log(1, value)
}, reason => {
  console.log(2, reason)
})

PromiseJz.allSettled(iteratorObj).then(value => {
  console.log(1, value)
}, reason => {
  console.log(2, reason)
})

*/