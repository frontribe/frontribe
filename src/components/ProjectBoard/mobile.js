import {timeline} from 'motion'
import observe from '../../scripts/viewObserver.js'

const easing = 'cubic-bezier(0.175, 0.885, 0.320, 1)'
const parent = document.querySelector('[data-name="project-board"]')
const contents = parent.innerHTML

export function create () {
  const labels = document.querySelectorAll('.project-board__label')

  observe(document.querySelector('[data-label-switch]'), {
    on: () => timeline([
      [labels[0], { opacity: [1, 0], transform: ['translateY(-2rem)', 'translateY(0rem)'] }, {duration: 1, easing}],
      [labels[1], { opacity: [0, 1], transform: ['translateY(4rem)',  'translateY(-2rem)'] }, {duration: 1, easing, at: 0}],
    ]),
    off: () => timeline([
      [labels[0], { opacity: [0, 1], transform: ['translateY(0rem)', 'translateY(-2rem)'] }, {duration: 1, easing}],
      [labels[1], { opacity: [1, 0], transform: ['translateY(-2rem)',  'translateY(4rem)'] }, {duration: 1, easing, at: 0}],
    ])
  })
}

export function destroy () {
  parent.innerHTML = contents
}
