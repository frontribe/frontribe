import {timeline} from 'motion'
import stagger from '../../scripts/stagger.js'
import observe from '../../scripts/viewObserver.js'

const parent = document.querySelector('[data-name="dev-statement"]')
const contents = parent.innerHTML

export function create () {
  const caption = document.querySelector('.dev-statement__caption')
  const overlay = caption.querySelector('.dev-statement__caption-overlay')

  observe(caption, {
    on: () => setTimeout(() => overlay.style.transform = 'translateX(200%)', 500),
    off: () => overlay.style.transform = 'translateX(0)',
  })

  const tl = timeline([
    ['.dev-statement', {position: 'fixed', top: 0, left: 0}, {duration: 0, at: 0}],
    ['.dev-statement', {transform: ['translateY(50%)', 'translateY(0vh)', 'translateY(-25%)']}, {duration: 2, at: 0}],
    ['.dev-statement', {opacity: [0,  1, 0], zIndex: [0 , 1, 0]}, {duration: 1, at: .5}],
  ], {easing: 'cubic-bezier(1,1,0,0)'})

  tl.pause()

  stagger.onStageProgress('dev-statement', p => {
    tl.currentTime = p
  }, true)
}

export function destroy () {
  stagger.removeStageProgress('dev-statement')
  parent.innerHTML = contents
}

