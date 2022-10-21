import loader from '../../elements/ModelLoader/scripts.js'
import createScrollAnim from '../../elements/Scroll/scripts.js'

const parent = document.querySelector('[data-name="hero-sub"]')
const contents = parent.innerHTML

export async function create () {
  if (document.querySelector('model-viewer')) await loader()
  const scrollAnim = createScrollAnim(document.querySelector('.hero-sub__scroll svg'), .5)
  scrollAnim.play()
}

export function destroy () {
  parent.innerHTML = contents
}
