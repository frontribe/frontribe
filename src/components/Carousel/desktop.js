import { timeline } from 'motion'
import createRollerAnim from '../../elements/IconBoxRoller/scripts.js'

// Make these listeners global so they survive through destroy() without further re:create()
let pos = 0
window.addEventListener('click', e => {
  if (e.target.classList.contains('carousel__item')) { e.preventDefault(); goTo(e.target.dataset.id) }
  if (e.target.classList.contains('carousel__nav-left')) { e.preventDefault(); goTo(pos - 1) }
  if (e.target.classList.contains('carousel__nav-right')) { e.preventDefault(); goTo(pos + 1) }
})

function goTo (newPos) {
  pos = Math.min(Math.max(newPos, 0), 3)
  document.querySelector('.carousel__box').style.transform = `translateX(${pos * 33.33}%)`
  document.querySelector('.carousel__box-track').style.transform = `translateX(${pos * -25}%)`
  document.querySelector('.carousel__nav-index').innerText = `0${pos+1}`
}

export default function (carousel) {
  const $ = selector => carousel.querySelector(`.carousel__${selector}`)
  const $$ = selector => carousel.querySelectorAll(`.carousel__${selector}`)
  const easing = 'cubic-bezier(0.175, 0.885, 0.320, 1)'

  $('box').classList.remove('-loading')

  const borderLength = $('border path').getTotalLength()

  const tl = timeline([
    [$('nav'), {opacity: 0 }, {duration: 0, at: 0}],
    [$('nav-left'), {transform: 'translateX(2rem)' }, {duration: 0, at: 0}],
    [$('nav-right'), {transform: 'translateX(-2rem)' }, {duration: 0, at: 0}],
    [$('nav'), {opacity: 1 }, {duration: 1, at: 1.5}],
    [$('nav-left'), {transform: 'translateX(0)' }, {duration: 1, at: '<'}],
    [$('nav-right'), {transform: 'translateX(0)' }, {duration: 1, at: '<'}],

    [$('box'), {width: '17rem', height: '13rem'}, {duration: 0, at: 0}],
    [$$('box-title'), {opacity: 0, transform: 'translateY(-2rem)'}, {duration: 0, at: 0}],
    [$('box-content'), {transform: 'translateY(-8rem)'}, {duration: 0, at: 0}],
    [$('box'), {height: '23.5rem'}, {duration: .5, easing, at: .8}],
    [$('box-content'), {transform: 'translateY(0)'}, {duration: .8, easing, at: '<'}],
    [$('box'), {width: 'calc(50% - 1rem)'}, {duration: .5, easing, at: '-.2'}],
    [$$('box-title'), {opacity: 1, transform: 'translateY(0)'}, {duration: 1, easing, at: '<'}],

    [$$('border path'), {strokeDasharray: borderLength}, {duration: 0, at: 0}],
    [$$('border path'), {strokeDashoffset: [borderLength, 0]}, {duration: 1, easing, at: 1.5}],

    [$('track'), {transform: 'translateX(-2rem)', opacity: 0}, {duration: 0, at: 0}],
    [$('item'), {opacity: 0}, {duration: 0, at: 0}],
    [$('track'), {opacity: 1}, {duration: .5, easing, at: 1.5}],
    [$('track'), {transform: 'translateX(0)'}, {duration: 2, easing, at: 1.5}],
    [$('item'), {opacity: 1}, {easing, duration: .2, at: 2.2 }],
  ])

  tl.pause()

  const rollerAnim = createRollerAnim($('box-icon-box.-roller'))
  const animation = {}

  animation.play = function () {
    rollerAnim.play()
    tl.play()
  }

  animation.stop = tl.stop
  animation.cancel = tl.cancel

  animation.reset = function () {
    $('box').style.transitionDuration = 0
    $('box-track').style.transitionDuration = 0
    goTo(0)
    $('box').style.removeProperty('transition-duration')
    $('box-track').style.removeProperty('transition-duration')
  }

  return animation
}
