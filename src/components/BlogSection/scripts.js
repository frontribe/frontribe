import observe from '../../scripts/viewObserver.js'
import createButtonAnim from '../../elements/Button/scripts.js'
import createRollerAnim from '../../elements/IconBoxRoller/scripts.js'

const parent = document.querySelector('[data-name="blogSection"]')
const contents = parent.innerHTML

export function create () {
  const btn = document.querySelector('.blog-section__button')

  if (btn) {
    const btnAnim = createButtonAnim(btn)
    observe(btn, {
      on: btn => btnAnim.play(),
      off: btn =>  btnAnim.currentTime = 0,
    })
  }

  document.querySelectorAll('.blog-section__icon').forEach(icon => {
    icon.animation = createRollerAnim(icon)
  })

  observe(document.querySelectorAll('.blog-section__icon'), {
    on: icon => icon.animation.play(),
    off: icon =>  icon.animation.currentTime = 0,
    delay: 300,
  })
}

export function destroy () {
  parent.innerHTML = contents
}

