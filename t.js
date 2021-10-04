const promise1 = Promise.resolve(3)

const promise2 = 42
const promise3 = new Promise((resolve, reject) => {
   setTimeout(resolve, 100, 'foo')
})
const promises = { hello: promise1, p2: promise2, prom3: promise3 }

Promise.all(promises).then((values) => {
   console.log(values)
})
// expected output: Array [3, 42, "foo"]
