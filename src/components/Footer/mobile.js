import observe from '../../scripts/viewObserver.js'

const parent = document.querySelector('[data-name="footer"]')
const contents = parent.innerHTML

export function create () {
  observe(document.querySelector('.footer__mail-line'), {
    on: line => setTimeout(() => line.style.transform = 'scaleX(1)', 200),
    off: line =>  line.style.transform = 'scaleX(0)',
  })
}

export function destroy () {
  parent.innerHTML = contents
}

