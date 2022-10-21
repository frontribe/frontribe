import {timeline} from 'motion'
import stagger from '../../scripts/stagger.js'

const parent = document.querySelector('[data-name="project-board"]')
const contents = parent.innerHTML

export function create () {
  const tl = timeline([
    ['.project-board', {position: 'fixed', top: 0, left: 0}, {duration: 0, at: 0}],
    ['.project-board', {transform: ['translateY(50%)', 'translateY(0vh)', 'translateY(-25%)']}, {duration: 2, at: 0}],
    ['.project-board', {opacity: [0,  1, 0], zIndex: [0 , 1, 0]}, {duration: 1, at: .5}],
  ], {easing: 'cubic-bezier(1,1,0,0)'})

  tl.pause()

  stagger.onStageProgress('project-board', p => {
    tl.currentTime = p
  }, true)
}

export function destroy () {
  stagger.removeStageProgress('project-board')
  parent.innerHTML = contents
}

