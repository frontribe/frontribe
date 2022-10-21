import {timeline} from 'motion'
import stagger from '../../scripts/stagger.js'

const parent = document.querySelector('[data-name="pricing2"]')
const contents = parent.innerHTML

export function create () {

  const tl = timeline([
    ['.pricing2',           {position: 'fixed', top: 0, left: 0}, {duration: 0, at: 0}],
    ['.pricing2__title',    {transform: ['translateY(6vh)', 'translateY(0vh)', 'translateY(-6vh)']}, {duration: 2, at: 0}],
    ['.pricing2__benefits', {transform: ['translateY(3vh)', 'translateY(0vh)', 'translateY(-3vh)']}, {duration: 2, at: 0}],
    ['.pricing2__body',     {transform: ['translateY(5vh)', 'translateY(0vh)', 'translateY(-5vh)']}, {duration: 2, at: 0}],
    ['.pricing2',           {opacity: [0,  1, 0], zIndex: [0 , 1, 0]}, {duration: 1, at: .5}],
  ], {easing: 'cubic-bezier(1,1,0,0)'})

  tl.pause()

  stagger.onStageProgress('pricing2', p => tl.currentTime = p)
}

export function destroy () {
  stagger.removeStageProgress('pricing2')
  parent.innerHTML = contents
}

