const Stagger = function () {
  const speed = .05
  const speed2 = .15
  const names = Array.from(document.querySelectorAll('.stage-scrollarea[data-name]')).map(el => el.dataset.name)
  let stageCallbacks = {}
  let totalCallbacks = {}
  let offset = 0
  let offset2 = 0
  let prevOffset

  // Start
  requestAnimationFrame(frame)

  // Render loop
  function frame () {
    const pageY = window.scrollY

    if (!offset && pageY > 100) offset = pageY // jump to initial position on page load
    else offset += (pageY + 1 - offset) * speed // + 1 so the scroll snap stops at next stage start point
    offset2 += (pageY - offset2) * speed2

    if (prevOffset !== offset) {
      const winH = window.innerHeight

      if (totalCallbacks.model) totalCallbacks.model(offset / winH)

      for (let {cb,id,faster} of Object.values(stageCallbacks)) {
        const o = faster ? offset2 : offset
        let p = (o / winH) - id
        if (id > 0) p++
        cb(p)
      }
    }

    prevOffset = offset
    requestAnimationFrame(frame)
  }

  return {
    onStageProgress: (name, cb, faster) => { stageCallbacks[name] = {cb,faster,id: names.indexOf(name)} },
    onTotalProgress: (name, cb) => { totalCallbacks[name] = cb },
    removeStageProgress: (name) => { delete stageCallbacks[name] },
    removeTotalProgress: (name) => { delete totalCallbacks[name] },
  }
}

export default (new Stagger())
