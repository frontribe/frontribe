import loader from '../../elements/ModelLoader/scripts.js'
import stagger from '../../scripts/stagger.js'
import 'https://unpkg.com/@google/model-viewer@1.12.0/dist/model-viewer.min.js'

export async function create (config) {
  if (!config) return
  const {easing, stages, onTotalProgress} = config
  await loader()
  const modelViewer = document.getElementById('model')
  const orbit = modelViewer.getCameraOrbit()
  const target = modelViewer.getCameraTarget()
  const cards = document.querySelector('.card-sections')
  let cardsSet = false

  stagger.onTotalProgress('model', totalProgress => {
    const stageProgress = totalProgress % 1
    const stage =  parseInt(totalProgress)
    const from = stages[stage]
    const to =  stages[stage + 1] || stages[stages.length - 1]
    if (from && to) {
      const prog = easing(stageProgress)
      const getVal = key => from[key] + ((to[key] - from[key]) * prog)
      orbit.theta = getVal('theta')
      orbit.phi = getVal('phi')
      orbit.radius = getVal('radius')
      target.x = getVal('x')
      target.y = getVal('y')
      target.z = getVal('z')
      modelViewer.interpolationDecay = 0
      modelViewer.cameraOrbit = orbit.toString()
      modelViewer.cameraTarget = target.toString()
      modelViewer.exposure = getVal('exposure')
      modelViewer.orientation = `${getVal('roll') || 0}deg ${getVal('pitch') || 0}deg ${getVal('yaw') || 0}deg`
      modelViewer.style.transform = `translate(-50%, -50%) translate(${getVal('left')}rem, ${getVal('top')}rem) rotate(${getVal('rotate')}deg) scale(${getVal('distance')})`
    }

    if (onTotalProgress) onTotalProgress(totalProgress)
    if (cards) {
      if (!cardsSet && totalProgress >= 3.9) {
        cards.setAttribute('style', 'background: var(--black); z-index: 2;')
        cardsSet = true
      } else if (cardsSet && totalProgress < 3.9) {
        cards.removeAttribute('style')
        cardsSet = false
      }
    }
  })
}

export function destroy () {
  stagger.removeTotalProgress('model')
  document.getElementById('model').setAttribute('style', 'opacity: 1')
}
