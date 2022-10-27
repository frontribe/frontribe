export default function stageLoader (name, scripts) {
  const mediaQuery = matchMedia('(max-aspect-ratio: 1/1)')
  const el = document.querySelector(`[data-name=${name}]`)
  let desktop
  let mobile
  let timeout

  ['100px', '-1px'].forEach(rootMargin =>
    (new IntersectionObserver(([entry]) => entry.isIntersecting && loadScripts(), { rootMargin }))
    .observe(el)
  )

  mediaQuery.addEventListener('change', reset)
  window.addEventListener('resize', () => !mediaQuery.matches && reset())
  if (name != 'model') {
    window.addEventListener('tabnav:on', destroy)
    window.addEventListener('tabnav:off', loadScripts)
  }

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
