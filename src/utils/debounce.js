// 函数防抖
export const debounce = (fn, delay = 200) => {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 函数节流
export const throttle = (fn, wait = 200) => {
  let prevTime = 0

  return function (...args) {
    let nowTime = +new Date()

    if (nowTime - prevTime >= wait) {
      fn.apply(this, args)
      prevTime = nowTime
    }
  }
}