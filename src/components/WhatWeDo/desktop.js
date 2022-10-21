import {timeline} from 'motion'
import stagger from '../../scripts/stagger.js'
import {oncePerCond, removeCond} from '../../scripts/utils.js'
import createCarouselAnim from '../Carousel/desktop.js'

const parent = document.querySelector('[data-name="whatWeDo"]')
const contents = parent.innerHTML

export function create () {
  const tl = timeline([
    ['.what-we-do',           {position: 'fixed', top: 0, left: 0}, {duration: 0, at: 0}],
    ['.what-we-do__title',    {transform: ['translateY(10vh)', 'translateY(0vh)', 'translateY(-10vh)']}, {duration: 2, at: 0}],
    ['.what-we-do__copy',     {transform: ['translateY(6vh)',  'translateY(0vh)', 'translateY(-6vh)']}, {duration: 2, at: 0}],
    ['.what-we-do__carousel', {transform: ['translateY(3vh)',  'translateY(0vh)', 'translateY(-3vh)']}, {duration: 2, at: 0}],
    ['.what-we-do',           {opacity: [0,  1, 0], zIndex: [0 , 1, 0]}, {duration: 1, at: .5}],
  ], {easing: 'cubic-bezier(1,1,0,0)'})

  tl.pause()

  const carouselAnim = createCarouselAnim(document.querySelector('.what-we-do__carousel'))

  stagger.onStageProgress('whatWeDo', p => {
    tl.currentTime = p
    oncePerCond('whatWeDo', .3 < p && p < 1.7, isTrue => {
      if (isTrue) {
        carouselAnim.reset()
        carouselAnim.stop()
        carouselAnim.play()
      }
    })
  })
}

export function destroy () {
  removeCond('whatWeDo')
  stagger.removeStageProgress('whatWeDo')
  parent.innerHTML = contents
}

