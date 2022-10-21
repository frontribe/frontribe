const media = matchMedia('(max-aspect-ratio: 1/1)')
const setMobileDocHeight = val =>  document.documentElement.style.setProperty('--mobile-doc-height', `${val}`)
const setScrollbarWidth = () =>  document.documentElement.style.setProperty('--scrollbar-width', `${window.innerWidth - document.documentElement.clientWidth}px`)

toggleMobileDocHeight(media.matches)
setScrollbarWidth()


media.addEventListener('change', async ({matches}) => {
  toggleMobileDocHeight(matches)
  setScrollbarWidth()
})

function toggleMobileDocHeight (matches) {
  if (matches) setMobileDocHeight(window.innerHeight + 'px')
  else setMobileDocHeight('100vh')
}
