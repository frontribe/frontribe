import {timeline} from 'motion'


export default function handleOpen (name, e) {
  e.preventDefault()
  const easing = 'cubic-bezier(0.175, 0.885, 0.320, 1)'
  let lastActive

  document.addEventListener('keydown', e => {e.key == 'Escape' && handleClose(e)}, {once: true})
  document.querySelector(`[flyout-name=${name}] [flyout-close]`).addEventListener('click', handleClose, {once: true})

  Array.from(document.querySelectorAll('[tabindex="0"]')).forEach(el => el.setAttribute('tabindex', -2))
  Array.from(document.querySelectorAll(`[flyout-name=${name}] [tabindex="-1"]`)).forEach(el => el.setAttribute('tabindex', 0))

  // focus close when keyboard nav
  if (e.screenX === 0 && e.screenY === 0) {
    lastActive = document.activeElement
    document.querySelector(`[flyout-name=${name}] [flyout-close]`).focus()
  }

  timeline([
    [`[flyout-name=${name}]`, {transform: 'translateY(-100%)', opacity: .5, pointerEvents: 'all'}, {duration: 0}],
    ['[flyout-zoom-pane]', {overflowX: 'hidden'}, {duration: 0}],
    ['[flyout-zoom]', {transformOrigin: 'center 50vh'}, {duration: 0}],
    [`[flyout-name=${name}]`, {transform: 'translateY(0)', opacity: 1}, {duration: .8, easing, at: 0}],
    ...Array.from(document.querySelectorAll('[flyout-zoom]')).map(el => {
      return [el, {transform: `scale(${el.getAttribute('flyout-zoom')})`}, {duration: .8, easing, at: 0}]
    }),
  ])

  function handleClose (e) {
    e.preventDefault()

    Array.from(document.querySelectorAll('[tabindex="-2"]')).forEach(el => el.setAttribute('tabindex', 0))
    Array.from(document.querySelectorAll(`[flyout-name=${name}] [tabindex="0"]`)).forEach(el => el.setAttribute('tabindex', -1))
    // focus burger when keyboard nav
    if (e.screenX === 0 && e.screenY === 0 && lastActive) {
      lastActive.focus()
    }

    timeline([
      [`[flyout-name=${name}]`, {transform: 'translateY(-100%)', opacity: .5, pointerEvents: 'none'}, {duration: .8, easing, at: 0}],
      ['[flyout-zoom]', {transform: 'scale(1)'}, {duration: .8, easing, at: 0}],
      ['[flyout-zoom]', {transform: 'unset', transformOrigin: 'unset'}, {duration: .0001}],
      ['[flyout-zoom-pane]', {overflowX: 'unset'}, {duration: .0001}],
    ])
  }
}
