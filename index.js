/**
 * 1. Promise就是一个类 在执行这个类的时候 需要传递一个执行器进去 并且执行器会立即执行
 * 2. Promise有三种状态， 成功fulfilled 失败rejected 等待pending
 *      pending ---》fulfilled
 *      pending ---》rejected
 *      状态一旦确定就不可改变
 * 3. resolve和reject函数是用来更改状态的
 *      resolve：fulfilled
 *      reject： rejected
 * 4. then方法内部做的事情是判断Promise的状态，如果是成功调用成功回调，如果状态失败调用失败回调函数，且then方法是被定义在原型对象上
 * 5. then成功后有一个值代表成功的值，失败后有一个值代表失败的原因
 * 6. 当执行器中是异步的情况下，主线程是不会等异步结束的，所以立刻执行了then方法，所以在then方法中状态为等待的情况下要存储下成功回调和失败回调，等主线程执行完成后，在执行异步的时候（2秒后），在调用成功或者失败回调函数
 * 7. then方法是可以掉用多次的，同步情况下直接执行成功回调函数，异步的情况下，需要把每一个回调函数存储下等异步执行完成后在逐个执行
 * 8. then方法是可以被链式调用的，下一个then的值是上一个then方法的返回值。想要实现链式调用，就要返回promise，因为then是在promise上的
 * 9. then方法链式调用的返回值可以是普通值，可以是promise, 但是返回值不能是自己，否则会报错 TypeError: Chaining cycle detected for promise #<Promise>
 * 10. 捕获错误，1.执行器执行时报错，2.then方法中回调函数执行错误，要在下一个then的回调函数中捕获到。
 * 11. then方法有两个回调函数（都为可选参数）promise.then().then().then(value => conmsole.log(value)) 相当于 promise.then(value => value).then(value => value).then(value => console.log(value))
 */


// let promise = new Promise((resolve, reject) => {
//     // setTimeout(() => {
//     //     resolve('成功');
//     // }, 2000)
//     resolve('成功');
//     // reject('失败');
// })

// promise.then((value) => {}, () => {})

function ohter() {
    return new MyPromise((resolve, reject) => {
        resolve('other')
    })
}

// 测试
const MyPromise = require('./myPromise');
// 事例11
// let promise = new MyPromise((resolve, reject) => {
//     // resolve('124')
//     reject('shibai')
// })
// promise.then().then().then(value => console.log(value)) // 124
// 相当于 promise.then(value => value).then(value =. value).then(value => console.log(value))



// let promise = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve('成功1......');
//         reject('失败11111');
//     }, 2000)
//     // throw new Error('zhixingq cuowu')
//     // resolve('成功');
//     // reject('失败');
// })

// let p1 = promise.then((value) => {
//     console.log(value)
//     return p1
// })
// p1.then(value => {
//     console.log(value)
// }, err => 
//     console.log(err)
// )
// promise.then((value) => {
//     console.log(value)
//     // throw new Error('then cuowu')
//     return 122
// }, (reason) => {
//     console.log(reason)
// }).then((value) => {
//     console.log(value, 'ccc')
// }, (reason) => {
//     console.log(reason)
// })
