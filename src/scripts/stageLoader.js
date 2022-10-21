export default function stageLoader (name, scripts) {
  const mediaQuery = matchMedia('(max-aspect-ratio: 1/1)')
  let desktop
  let mobile
  let timeout

  (new IntersectionObserver(([entry]) => entry.isIntersecting && loadScripts(), { rootMargin: '100px'}))
  .observe(document.querySelector(`[data-name=${name}]`))

  mediaQuery.addEventListener('change', reset)
  window.addEventListener('resize', () => !mediaQuery.matches && reset())

  async function loadScripts () {
    if (!window.enableAnims) return
    if (mediaQuery.matches && !mobile) {
      mobile = await scripts.mobile()
      mobile.create()
    } else if (!mediaQuery.matches && !desktop){
      document.activeElement.blur()
      document.body.classList.remove('tab-nav')
      desktop = await scripts.desktop()
      desktop.create()
    }
  }

  function destroyAll () {
    if (desktop) desktop.destroy()
    if (mobile) mobile.destroy()
    desktop = false
    mobile = false
  }

  function reset () {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      destroyAll()
      loadScripts()
    }, 20)
  }

  window.addEventListener('focusControl', destroyAll)
}
