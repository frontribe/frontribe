import 'https://unpkg.com/@google/model-viewer@1.12.0/dist/model-viewer.min.js'
import observe from '../../scripts/viewObserver.js'
import loader from '../../elements/ModelLoader/scripts.js'

export async function create (config) {
  if (!config) return
  const {stages, names, onStageChange, interpolationDecay} = config
  await loader()
  const modelViewer = document.getElementById('model')
  let timeout
  let isInited

  function setStage (id) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      const vals = stages[id]
      if (!vals) return
      modelViewer.interpolationDecay = isInited
        ? interpolationDecay || 100
        : 0
      modelViewer.cameraTarget = vals.target
      modelViewer.cameraOrbit = vals.orbit
      modelViewer.exposure = vals.exposure
      if (vals.orientation) modelViewer.orientation = vals.orientation
      if (vals.transform) {
        if (isInited) modelViewer.style.transition = 'transform 2s cubic-bezier(0.175, 0.885, 0.320, 1)'
        modelViewer.style.transform = vals.transform
      }
      if (onStageChange) onStageChange(id)
      isInited = true
    }, 10)
  }

  names.forEach((name, id) => {
    document.querySelector(`[data-name="${name}"]`).insertAdjacentHTML('afterend', `<div class="model-trigger -${name}" style="transform: translateY(-50vh)"></div>`)
    observe(document.querySelector(`.model-trigger.-${name}`), {on: () => setStage(id)})
  })
}

export function destroy (names) {
  const modelViewer = document.getElementById('model')
  modelViewer.style.transition = 'none'

  names.forEach(name => {
    const el = document.querySelector(`.model-trigger.-${name}`)
    if (el) el.remove()
  })
}



