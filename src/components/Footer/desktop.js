import {timeline} from 'motion'
import stagger from '../../scripts/stagger.js'
import observe from '../../scripts/viewObserver.js'

const parent = document.querySelector('[data-name="footer"]')
const contents = parent.innerHTML

export function create () {
  observe(document.querySelector('.footer__mail-line'), {
    on: line => setTimeout(() => line.style.transform = 'scaleX(1)', 200),
    off: line =>  line.style.transform = 'scaleX(0)',
  })

  const tl = timeline([
    ['.footer', {position: 'fixed', top: 0, left: 0}, {duration: 0, at: 0}],
    ['.footer', {transform: ['translateY(100%)', 'translateY(0vh)', 'translateY(-25%)']}, {duration: 2, at: 0}],
    ['.footer', {opacity: [0,  1, 1, 1, 1], zIndex: [0 , 1, 0]}, {duration: 1, at: .5}],
  ], {easing: 'cubic-bezier(1,1,0,0)'})

  tl.pause()

  stagger.onStageProgress('footer', p => {
    tl.currentTime = p
  }, true)
}

export function destroy () {
  stagger.removeStageProgress('footer')
  parent.innerHTML = contents
}

