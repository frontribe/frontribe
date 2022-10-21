const conditions = {}

export function oncePerCond (name, cond, callback) {
  conditions[name] = conditions[name] || {trueOnce: false, falseOnce: false}
  if (cond && !conditions[name].trueOnce) {
    callback(true)
    conditions[name].trueOnce = true
    conditions[name].falseOnce = false
  } else if (!cond && !conditions[name].falseOnce) {
    callback(false)
    conditions[name].trueOnce = false
    conditions[name].falseOnce = true
  }
}

export function removeCond (name) {
  delete conditions[name]
}
