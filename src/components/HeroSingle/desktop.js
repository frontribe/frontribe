import createScrollAnim from '../../elements/Scroll/scripts.js'

const parent = document.querySelector('[data-name="hero-single"]')
const contents = parent.innerHTML

export function create () {
  const scrollAnim = createScrollAnim(document.querySelector('.hero-single__scroll svg'), .5)
  scrollAnim.play()
}

export function destroy () {
  parent.innerHTML = contents
}
