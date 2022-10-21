const script = document.createElement('script')
script.src = 'https://unpkg.com/quicklink@2.3.0/dist/quicklink.umd.js'
script.onload = () => quicklink.listen()
document.head.appendChild(script)
