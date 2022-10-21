import {timeline} from 'motion'

const form = document.querySelector('.flyout-contact')
const button = form.querySelector('.flyout-contact__button')
const text = form.querySelector('.flyout-contact__button-text')
const line = form.querySelector('.flyout-contact__button-line')
const flyoutClose = document.querySelector(`[flyout-name=contact] [flyout-close]`)
const easing = 'cubic-bezier(.7,0,0,.7)'

// Anti spam
setTimeout(() => {form.setAttribute('action', 'https://getform.io/f/c7c9b02a-ae6c-4adc-839d-12717e1baa93')}, 5000)

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (form.checkValidity()) {
    button.setAttribute('disabled', true)
    showLoader()

    fetch(form.getAttribute('action'), {
      method: 'POST',
      body: new FormData(form),
    })
    .then((res) => setTimeout(() => {
      if (res.status === 200) setSuccess()
      else setError()
      hideLoader()
    }, 1000))
    .catch(error => {
      setError()
      hideLoader()
    })
  }
})

form.addEventListener('input', e => {
  if (form.checkValidity()) button.setAttribute('tabindex', 0)
  else button.setAttribute('tabindex', -2)
})

flyoutClose.addEventListener('click', () => setTimeout(() => {
  form.reset()
  button.removeAttribute('disabled')
  button.removeAttribute('style')
  button.setAttribute('tabindex', -2)
  line.removeAttribute('style')
  text.removeAttribute('style')
  text.removeAttribute('status')
  text.classList.add('text-anim')
  text.innerHTML = 'Submit'
}, 1000))

function showLoader () {
  timeline([
    [button, { background: 'rgba(230,230,230,0)' }, {duration: .3, at: 0, easing}],
    [text,   { transform:  ['translateY(0)', 'translateY(-100%)'] }, {duration: .3, at: 0, easing}],
    [line,   { transform:  ['scaleX(0)', 'scaleX(1)'] }, {duration: 2, easing}],
  ])
}

function hideLoader () {
  timeline([
    [text, { color: 'white' }, {duration: 0, at: 0, easing}],
    [text, { transform:  ['translateY(-100%)', 'translateY(0)'] }, {duration: .3, at: 0, easing}],
    [line, { transform:  ['translateY(0)', 'translateY(5rem)'] }, {duration: .3, at: 0, easing}],
  ])
}

function setSuccess () {
  text.classList.remove('text-anim')
  text.innerHTML = '<span></span><p>Success. We`ll be in touch</p>'
  text.setAttribute('status', 'success')
}

function setError() {
  text.classList.remove('text-anim')
  text.innerHTML = '<span></span><p>Error. Try Again</p>'
  text.setAttribute('status', 'error')
  button.removeAttribute('disabled')
}
