import {timeline} from 'motion'
import stagger from '../../scripts/stagger.js'
import observe from '../../scripts/viewObserver.js'

const parent = document.querySelector('[data-name="testimonial"]')
const contents = parent.innerHTML

export function create () {
  const caption = document.querySelector('.testimonial__caption')
  const overlay = caption.querySelector('.testimonial__caption-overlay')

  observe(caption, {
    on: () => setTimeout(() => overlay.style.transform = 'translateX(200%)', 500),
    off: () => overlay.style.transform = 'translateX(0)',
  })

  const tl = timeline([
    ['.testimonial', {position: 'fixed', top: 0, left: 0}, {duration: 0, at: 0}],
    ['.testimonial', {transform: ['translateY(50%)', 'translateY(0vh)', 'translateY(-25%)']}, {duration: 2, at: 0}],
    ['.testimonial', {opacity: [0,  1, 0], zIndex: [0 , 1, 0]}, {duration: 1, at: .5}],
  ], {easing: 'cubic-bezier(1,1,0,0)'})

  tl.pause()

  stagger.onStageProgress('testimonial', p => {
    tl.currentTime = p
  }, true)
}

export function destroy () {
  stagger.removeStageProgress('testimonial')
  parent.innerHTML = contents
}

