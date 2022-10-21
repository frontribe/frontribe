window.addEventListener('focusin', ({target}) => {
  if (matchMedia('(max-aspect-ratio: 1/1)').matches) return

  const t = target.tagName.toLowerCase()
  const focusIsHover = document.querySelector(`${t}:hover`) === target

  if (t != 'input' && t != 'textarea' && focusIsHover) {
    target.blur()
  } else {
    window.enableAnims = false
    document.body.classList.add('tab-nav')
    window.dispatchEvent(new Event('focusControl'))
    // cleanup
    setTimeout(() => window.enableAnims = true, 100)
  }
})
