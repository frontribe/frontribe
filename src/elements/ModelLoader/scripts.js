import 'https://unpkg.com/@google/model-viewer@1.12.0/dist/model-viewer.min.js'

const modelViewer = document.getElementById('model')
const loaderLine = document.querySelector('.model-loader__line')
const loaderText = document.querySelector('.model-loader__text')
const loaderInfo = document.querySelector('.model-loader__info')
let loader

// preloader
export default async function () {
  if (!loader) {
    loader = new Promise((resolve) => {
      modelViewer.addEventListener('progress', (e) => {
        if (e.detail.totalProgress === 1) {
          const revealer = document.querySelector('.model-revealer')
          revealer.classList.add('-reveal-1')
          revealer.addEventListener('transitionend', () => {
            revealer.classList.add('-reveal-2')
            resolve(true)
          }, {once: true})
        } else {
          loaderLine.style.opacity = 1
          loaderText.style.opacity = 1
          loaderInfo.style.opacity = 0
          loaderLine.style.transform = `scaleX(${e.detail.totalProgress})`
          loaderText.innerText = (e.detail.totalProgress * 100).toFixed(0) + '%'
        }
      })
    })
  }
  return loader
}
