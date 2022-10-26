export default function stageLoader (name, scripts) {
  const mediaQuery = matchMedia('(max-aspect-ratio: 1/1)')
  let desktop
  let mobile
  let timeout

  ['100px', '-1px'].forEach(rootMargin =>
    (new IntersectionObserver(([entry]) => entry.isIntersecting && loadScripts(), { rootMargin }))
    .observe(document.querySelector(`[data-name=${name}]`))
  )

  mediaQuery.addEventListener('change', reset)
  window.addEventListener('resize', () => !mediaQuery.matches && reset())
  window.addEventListener('focusControl', () => name != 'model' && destroy())

  async function loadScripts () {
    if (!window.enableAnims) return
    if (mediaQuery.matches && !mobile) {
      try {
        mobile = true
        mobile = await scripts.mobile()
        mobile.create()
      } catch (e) {
        mobile = false
      }
    } else if (!mediaQuery.matches && !desktop){
      document.activeElement.blur()
      document.body.classList.remove('tab-nav')
      try {
        desktop = true
        desktop = await scripts.desktop()
        desktop.create()
      } catch (e) {
        desktop = false
      }
    }
  }

  function destroy () {
    if (desktop) desktop.destroy()
    if (mobile) mobile.destroy()
    desktop = false
    mobile = false
  }

  function reset () {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      destroy()
      loadScripts()
    }, 20)
  }

}
