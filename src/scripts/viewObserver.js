const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const time = entry.target.observer.delay ? entry.target.observer.delay * i : 0
      if (entry.target.observer.on) setTimeout(() => entry.target.observer.on(entry.target), time)
    } else {
      if (entry.target.observer.off) entry.target.observer.off(entry.target)
    }
  })
}, { rootMargin: '0px 0px 0px 0px'})

function observe (el, config) {
  if (el.length) el.forEach(e => addToQueue(e, config))
  else addToQueue(el, config)
}

function addToQueue (el, config) {
  if (el.observer) return
  el.observer = config
  observer.observe(el)
}

export default observe
