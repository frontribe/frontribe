export default function (carousel) {
  const $$ = selector => carousel.querySelector(`.carousel__${selector}`)
  const $ = selector => carousel.querySelector(`.carousel__${selector}`)
  let pos = 0
  let req

  $('nav-left').addEventListener('click', (e) => {e.preventDefault(); goTo(pos - 1)})
  $('nav-right').addEventListener('click', (e) => {e.preventDefault(); goTo(pos + 1)})
  $('box').addEventListener('scroll', () => {
    cancelAnimationFrame(req)
    req = requestAnimationFrame(() => {
      pos = Math.round($('box').scrollLeft / $('box-content').getBoundingClientRect().width)
      $('nav-index').innerText = `0${pos+1}`
    })
  })

  function goTo (newPos) {
    pos = Math.min(Math.max(newPos, 0), 3)
    $('box').scrollTo({
      top: 0,
      left: $('box-content').getBoundingClientRect().width * pos,
      behavior: 'smooth'
    })
  }
}
