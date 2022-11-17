import {timeline} from 'motion'

export default function (name, e) {
  const easing = 'cubic-bezier(0.175, 0.885, 0.320, 1)'

  handleOpen(e)
  document.querySelector(`[flyout-name=${name}] [flyout-close]`).addEventListener('click', handleClose, {once: true})

  function handleOpen (e) {
    if (e && e.cancellable) e.preventDefault()
    timeline([
      [`[flyout-name=${name}]`, {transform: 'translateY(-100%)', opacity: .5, pointerEvents: 'none'}, {duration: 0}],
      [`[flyout-name=${name}]`, {transform: 'translateY(0)', opacity: 1}, {duration: .8, easing, at: 0}],
      [`[flyout-name=${name}]`, {pointerEvents: 'all'}, {duration: 0, at: 0.8}],
    ])
  }

  function handleClose (e) {
    if (e && e.cancellable) e.preventDefault()
    timeline([
      [`[flyout-name=${name}]`, {transform: 'translateY(-100%)', opacity: .5, pointerEvents: 'none'}, {duration: .8, easing, at: 0}],
    ])
  }
}

