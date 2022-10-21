import {timeline} from 'motion'
import stagger from '../../scripts/stagger.js'
import {oncePerCond, removeCond} from '../../scripts/utils.js'
import createButtonAnim from '../../elements/Button/scripts.js'
import createScrollAnim from '../../elements/Scroll/scripts.js'

const parent = document.querySelector('[data-name="hero"]')
const contents = parent.innerHTML
const title = document.querySelector('.hero-title')
const titleContents = title.outerHTML
const shadow = document.querySelector('.model-shadow')


export function create () {
  const buttonAnim = createButtonAnim(document.querySelector('.hero__button'))
  const scrollAnim = createScrollAnim(document.querySelector('.hero__scroll svg'))

  document.querySelector('.hero-title').classList.remove('-loading')
  document.querySelector('.hero-title').style.opacity = 1
  shadow.style.opacity = 1

  const tl = timeline([
    ['.hero',         {position: 'fixed', top: 0, left: 0, zIndex: 1}, {duration: 0, at: 0}],
    ['.hero-title',   {transform: ['translateY(0vh)', 'translateY(-8vh)']}, {duration: 1, at: 0}],
    ['.hero__text',   {transform: ['translateY(0vh)', 'translateY(-6vh)']}, {duration: 1, at: 0}],
    ['.hero__button', {transform: ['translateY(0vh)', 'translateY(-2vh)']}, {duration: 1, at: 0}],
    ['.hero__scroll', {transform: ['translateY(0vh)',  'translateY(5vh)']}, {duration: 1, at: 0}],
    ['.hero',         {opacity: [1, 0], zIndex: [1, 0]}, {duration: .2, at: .3}],
    ['.hero-title',   {opacity: [1, 0]}, {duration: .2, at: .3}],
    ['.hero-shadow',  {opacity: [1, 0]}, {duration: .2, at: .3}],
  ], {easing: 'cubic-bezier(1,1,0,0)'})

  tl.pause()

  stagger.onStageProgress('hero', p => {
    tl.currentTime = p
    oncePerCond('hero', p < .5, isTrue => {
      if (isTrue) {
        buttonAnim.play()
        scrollAnim.play()
      } else {
        buttonAnim.currentTime = 0
      }
    })
  })
}

export function destroy () {
  removeCond('hero')
  stagger.removeStageProgress('hero')
  parent.innerHTML = contents
  const newTitle = document.createRange().createContextualFragment(titleContents)
  document.querySelector('.hero-title').replaceWith(newTitle)
  shadow.style.opacity = 0
}

