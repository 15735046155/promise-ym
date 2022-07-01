const PENDING = 'pending'; //等待
const FULFILLED = 'fulfilled'; //成功
const REJECTED = 'rejected'; //失败
class MyPromise {
    constructor(executor){
        executor(this.resolve, this.reject)
    }
    // promise状态
    status = PENDING
    // 成功之后的值
    value = undefined
    // 失败之后的原因
    reason = undefined
    // // 成功回调 默认为undefined
    successCallback = []
    // // 失败回调 默认为undefined
    failCallback = []
    // 使用箭头函数就是为了是函数内部this指向PROMISE对象, 否则就是window 或者undefined
    resolve = (value) => {
        // 如果状态不是等待，阻止继续向下执行，也就是状态一旦确定就不允许再次改变
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED
        // 保存成功之后的值
        this.value = value
        // 成功回调是否存在，存在调用
        // this.successCallback && this.successCallback(this.value)
        while(this.successCallback.length) this.successCallback.shift()(this.value) // 异步情况下存储多个，一个一个调用
    }
    reject = (reason) => {
        // 如果状态不是等待，阻止继续向下执行，也就是状态一旦确定就不允许再次改变
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED
        // 保存失败之后的原因
        this.reason = reason
        // 失败回调是否存在，存在就调用
        // this.failCallback && this.failCallback(this.reason)
        while(this.failCallback.length) this.failCallback.shift()(this.reason)
    }
    then(successCallback, failCallback){
        // 链式调用需要返回promise
        let promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if (this.status === FULFILLED) {
                // successCallback(this.value)
                
                setTimeout(() => { // 由于promise2拿不到，所以需要变成异步代码，等promise2初始化完成才可以拿到
                    let x = successCallback(this.value) // x就是传递给下一个then的的值
                    // resolve(x)
                    // 判断x的值的类型
                    // 如果是普通值的话直接调用resolve（x）
                    // 如果是一个promise的话，
                    // 需要判断这个promise的回调结果 调用(resolve, reject)
                    resolvePromise(promise2, x, resolve, reject)
                }, 0);
            } else if (this.status === REJECTED){
                // failCallback(this.reason)
                let y = failCallback(this.reason)
                reject(y)
            } else {
                // 等待
                
                // 将成功回调和失败回调存储起来
                // 调用一次的情况下
                // this.successCallback = successCallback
                // this.failCallback = failCallback
                // 调用多次的情况下
                this.successCallback.push(successCallback)
                this.failCallback.push(failCallback)
            }
        })
        return promise2
    }
}

function resolvePromise(promise2, x, resolve, reject){
    // 如果返回的是promise本身就报错，终止运行
    if (promise2 === x) return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
    // x是不是MyPromise的实例，是：prmose对象
    if (x instanceof MyPromise) {
        // x.then(value => resolve(value), reason => reject(reason))
        x.then(resolve, reject)
    } else { // 普通值
        resolve(x)
    }
}

module.exports = MyPromise