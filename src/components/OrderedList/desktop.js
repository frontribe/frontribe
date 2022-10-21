import {timeline} from 'motion'
import stagger from '../../scripts/stagger.js'

const parent = document.querySelector('[data-name="orderedList"]')
const contents = parent.innerHTML

export function create () {
  const tl = timeline([
    ['.ordered-list',         {position: 'fixed', top: 0, left: 0}, {duration: 0, at: 0}],
    ['.ordered-list',         {opacity: [0,  1, 0], zIndex: [0 , 1, 0]}, {duration: 1, at: .5}],
    ['.ordered-list__title',  {transform: ['translateY(6vh)', 'translateY(0vh)', 'translateY(-6vh)']}, {duration: 2, at: 0}],
    ['.ordered-list__list',   {transform: ['translateY(3vh)', 'translateY(0vh)', 'translateY(-3vh)']}, {duration: 2, at: 0}],
  ], {easing: 'cubic-bezier(1,1,0,0)'})

  tl.pause()

  stagger.onStageProgress('orderedList', p => {
    tl.currentTime = p
  })
}

export function destroy () {
  stagger.removeStageProgress('orderedList')
  parent.innerHTML = contents
}
