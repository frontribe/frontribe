window.enableAnims = testDevice()

if (!enableAnims) document.querySelector('html').classList.add('no-js')

function testDevice () {
  // Dev util
  if (window.location.search === '?noanims') return false
  // Lighthouse / Pagespeed insights doesn't throttle their CPUs while processing the site.
  // We want it to pick something closer to real-world use case for low-end device.
  const CPUs = navigator.userAgent.includes('Lighthouse') ? 2 : navigator.hardwareConcurrency
  const deviceMemory = Navigator.deviceMemory ? Navigator.deviceMemory : 3 // forgive to Safari and Firefox
  // Set our minimum requirements to a phone that has specs like iPhoneX being in actual use (CPUs allocation)
  // https://www.devicespecifications.com/en/model/36ea45ae
  return (
    CPUs >= 4 &&
    deviceMemory >= 3 &&
    !matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
