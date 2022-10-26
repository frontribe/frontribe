const media = matchMedia('(max-aspect-ratio: 1/1)')
const setMobileDocHeight = val =>  document.documentElement.style.setProperty('--mobile-doc-height', `${val}`)

toggleMobileDocHeight(media.matches)

media.addEventListener('change', async ({matches}) => {
  toggleMobileDocHeight(matches)
})

function toggleMobileDocHeight (matches) {
  if (matches) setMobileDocHeight(window.innerHeight + 'px')
  else setMobileDocHeight('100vh')
}
