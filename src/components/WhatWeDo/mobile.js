import createCarouselNav from '../Carousel/mobile.js'

const parent = document.querySelector('[data-name="whatWeDo"]')
const contents = parent.innerHTML

export function create () {
  createCarouselNav(document.querySelector('.what-we-do__carousel'))
}

export function destroy () {
  parent.innerHTML = contents
}

