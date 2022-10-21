import { timeline } from 'motion'

export default function (roller) {
  const easing = 'cubic-bezier(0.175, 0.885, 0.320, 1)'
  const multiplier = roller.getAttribute('data-multiplier')
  const iconsWrapper = roller.querySelector('.icon-box-roller__icons')
  const icons = Array.from(iconsWrapper.querySelectorAll('svg')).map(svg => svg.outerHTML)
  const final = icons[0]
  const set = icons.join('')
  let collection = ''

  for (let i = 0; i < multiplier; i ++) collection += set

  iconsWrapper.innerHTML = collection + final

  const animation = timeline([
    [iconsWrapper, {transform: `translateY(-100%) translateY(7.6rem)`}, {duration: 1.5, easing}],
  ])

  animation.pause()

  return animation
}
