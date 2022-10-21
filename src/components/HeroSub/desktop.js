import {timeline} from 'motion'
import stagger from '../../scripts/stagger.js'
import {oncePerCond, removeCond} from '../../scripts/utils.js'
import createScrollAnim from '../../elements/Scroll/scripts.js'
import loader from '../../elements/ModelLoader/scripts.js'

const parent = document.querySelector('[data-name="hero-sub"]')
const contents = parent.innerHTML

export async function create () {
  if (document.querySelector('model-viewer')) await loader()
  const scrollAnim = createScrollAnim(document.querySelector('.hero-sub__scroll svg'), .5)
  scrollAnim.play()

  const tl = timeline([
    ['.hero-sub',         {position: 'fixed', top: 0, left: 0, zIndex: 1}, {duration: 0, at: 0}],
    ['.hero-sub__title',  {transform: ['translateY(0vh)', 'translateY(-8vh)']}, {duration: 1, at: 0}],
    ['.hero-sub__copy',   {transform: ['translateY(0vh)', 'translateY(-6vh)']}, {duration: 1, at: 0}],
    ['.hero-sub__scroll', {transform: ['translateY(0vh)',  'translateY(5vh)']}, {duration: 1, at: 0}],
    ['.hero-sub',         {opacity: [1, 0], zIndex: [1, 0]}, {duration: .2, at: .3}],
    ['.hero-sub__title',  {opacity: [1, 0]}, {duration: .2, at: .3}],
  ], {easing: 'cubic-bezier(1,1,0,0)'})

  tl.pause()

  stagger.onStageProgress('hero-sub', p => {
    tl.currentTime = p
    oncePerCond('hero-sub', p < .5, isTrue => {
      if (isTrue) scrollAnim.play()
    })
  })
}

export function destroy () {
  removeCond('hero-sub')
  stagger.removeStageProgress('hero-sub')
  parent.innerHTML = contents
}

