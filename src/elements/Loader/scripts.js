const loader = document.querySelector('.loader')
const loaderLine = document.querySelector('.loader__line')
const loaderText = document.querySelector('.loader__text')

loader.update = function (prog) {
  if (prog === 1) {
    setTimeout(() => {
      loader.classList.remove('-show')
      setTimeout(() => {
        loaderLine.style.transform = `scaleX(0)`
        loaderText.innerText = '0%'
      }, 500)
    }, 500)
  } else {
    loader.classList.add('-show')
    loaderLine.style.transform = `scaleX(${prog})`
    loaderText.innerText = (prog * 100).toFixed(0) + '%'
  }
}
