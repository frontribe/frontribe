import observe from '../../scripts/viewObserver.js'
import createButtonAnim from '../../elements/Button/scripts.js'

const parent = document.querySelector('[data-name="howToJoin"]')
const contents = parent.innerHTML

export function create () {
  const btn = document.querySelector('.how-to-join__button')
  const btnAnim = createButtonAnim(btn)

  observe(btn, {
    on: () => btnAnim.play(),
    off: () =>  btnAnim.currentTime = 0,
  })
}

export function destroy () {
  parent.innerHTML = contents
}
