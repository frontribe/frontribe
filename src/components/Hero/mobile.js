import observe from '../../scripts/viewObserver.js'
import createButtonAnim from '../../elements/Button/scripts.js'

const parent = document.querySelector('[data-name="hero"]')
const contents = parent.innerHTML

export function create () {
  const btn = document.querySelector('.hero__button')
  const btnAnim = createButtonAnim(btn)

  observe(btn, {
    on: () => btnAnim.play(),
    off: () =>  btnAnim.currentTime = 0,
  })
}

export function destroy () {
  parent.innerHTML = contents
}
