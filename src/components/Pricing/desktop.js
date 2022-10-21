import {timeline} from 'motion'
import stagger from '../../scripts/stagger.js'
import {oncePerCond, removeCond} from '../../scripts/utils.js'

const parent = document.querySelector('[data-name="pricing"]')
const contents = parent.innerHTML

export function create () {
  const tl = timeline([
    ['.pricing',        {position: 'fixed', top: 0, left: 0}, {duration: 0, at: 0}],
    ['.pricing__price', {transform: ['translateY(8vh)', 'translateY(0vh)', 'translateY(-8vh)']}, {duration: 2, at: 0}],
    ['.pricing__title', {transform: ['translateY(6vh)', 'translateY(0vh)', 'translateY(-6vh)']}, {duration: 2, at: 0}],
    ['.pricing__desc',  {transform: ['translateY(2vh)', 'translateY(0vh)', 'translateY(-2vh)']}, {duration: 2, at: 0}],
    ['.pricing',        {opacity: [0,  1, 0], zIndex: [0 , 1, 0]}, {duration: 1, at: .5}],
  ], {easing: 'cubic-bezier(1,1,0,0)'})

  tl.pause()

  const easing = 'cubic-bezier(0.175, 0.885, 0.320, 1)'
  const animation = timeline([
    ['.pricing__border',     {height: 0},                     {duration: 0, at: 0}],
    ['.pricing__price__bg',  {transform: 'translateX(100%)'}, {duration: 0, at: 0}],
    ['.pricing__price__txt', {transform: 'translateX(3rem)'}, {duration: 0, at: 0}],
    ['.pricing__link__line', {transform: 'scaleX(0)'},        {duration: 0, at: 0}],

    ['.pricing__border',     {height: '100%'},             {duration:  1.2, easing, at: 0}],
    ['.pricing__price__bg',  {transform: 'translateX(0)'}, {duration: .5, easing, at: '-.5'}],
    ['.pricing__price__txt', {transform: 'translateX(0)'}, {duration: 1, easing, at: '-.4'}],
    ['.pricing__link__line', {transform: 'scaleX(1)'},     {duration: .5, easing, at: '-.8'}],
  ])

  animation.pause()

  stagger.onStageProgress('pricing', p => {
    tl.currentTime = p
    oncePerCond('pricing', .3 < p && p < 1.7, isTrue => {
      if (isTrue) {
        animation.stop()
        animation.play()
      }
    })
  })
}

export function destroy () {
  removeCond('pricing')
  stagger.removeStageProgress('pricing')
  parent.innerHTML = contents
}
