window.addEventListener('focusin', ({target}) => {
  if (matchMedia('(max-aspect-ratio: 1/1)').matches) return

  const t = target.tagName.toLowerCase()
  const focusIsHover = document.querySelector(`${t}:hover`) === target

  if (t != 'input' && t != 'textarea' && focusIsHover) {
    target.blur()
  } else {
    window.enableAnims = false
    document.body.classList.add('tab-nav')
    window.dispatchEvent(new Event('tabnav:on'))

    const stage = document.activeElement.closest('.stage-scrollarea')
    if (stage && document.activeElement.tabIndex === 0) stage.scrollIntoView({behavior: 'smooth'})

    // Allow other animations after element focused
    setTimeout(() => window.enableAnims = true, 100)

    // Maintain focus within visible section after user switched from tab back to mouse nav,
    // like clicking outside of focused element
    document.activeElement.addEventListener('focusout', e => setTimeout(() => {
      if (document.activeElement === document.body) {
        window.dispatchEvent(new Event('tabnav:off'))
      }
    }, 0), {once: true})
  }
})
