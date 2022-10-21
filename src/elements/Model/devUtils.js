import stagger from '../../scripts/stagger.js'

window.saveModel = function saveModel(name) {
  const canvas = document.querySelector('model-viewer').shadowRoot.querySelector('#webgl-canvas')
  let fileName = name || 'image'
  const link = document.createElement('a')
  link.download = fileName + '.png'
  canvas.toBlob(function(blob) {
      console.log(blob)
      link.href = URL.createObjectURL(blob)
      link.click()
  });
}

function getStageSettings () {
  const modelViewer = document.getElementById('model')
  const {theta, phi, radius} = modelViewer.getCameraOrbit()
  const {x, y, z} = modelViewer.getCameraTarget()
  const exposure = modelViewer.exposure
  const [roll, pitch, yaw] = modelViewer.orientation.split('deg').map(parseFloat)

  const [left] = modelViewer.style.transform.includes('translateX')
    ? modelViewer.style.transform.match(/translateX\(([^\)]+)\)/)[1].split(',').map(parseFloat)
    : [0]
  const [top] = modelViewer.style.transform.includes('translateY')
    ? modelViewer.style.transform.match(/translateY\(([^\)]+)\)/)[1].split(',').map(parseFloat)
    : [0]
  const [rotate] = modelViewer.style.transform.includes('rotate')
    ? modelViewer.style.transform.match(/rotate\(([^\)]+)\)/)[1].split(',').map(parseFloat)
    : [0]
  const [distance] = modelViewer.style.transform.includes('scale')
    ? modelViewer.style.transform.match(/scale\(([^\)]+)\)/)[1].split(',').map(parseFloat)
    : [1]

  return {theta, phi, radius, x, y, z, exposure, top, left, rotate, distance, pitch, roll, yaw}
}

function applyStageSettings (settings) {
  const modelViewer = document.getElementById('model')
  const orbit = modelViewer.getCameraOrbit()
  const target = modelViewer.getCameraTarget()
  orbit.theta = settings['theta']
  orbit.phi = settings['phi']
  orbit.radius = settings['radius']
  target.x = settings['x']
  target.y = settings['y']
  target.z = settings['z']
  modelViewer.interpolationDecay = 0
  modelViewer.cameraOrbit = orbit.toString()
  modelViewer.cameraTarget = target.toString()
  modelViewer.exposure = settings['exposure']
  modelViewer.orientation = `${settings['roll'] || 0}deg ${settings['pitch'] || 0}deg ${settings['yaw'] || 0}deg`
  modelViewer.style.transform = `translate(-50%, -50%) translateX(${settings['left']}vw) translateY(${settings['top']}vw) rotate(${settings['rotate']}deg) scale(${settings['distance']})`
}

let modeKey = ''
document.addEventListener('keydown', e => {
  console.log(e.key)
  if (!modeKey) {
    stagger.removeTotalProgress('model')
    // if (modelStages.slice(-1)[0]) applyStageSettings(modelStages.slice(-1)[0])
  }

  if (modeKey && e.key.includes('Arrow')) {
    e.preventDefault()
    const settings = getStageSettings()

    settings.roll = settings.roll || 0
    settings.pitch = settings.pitch || 0
    settings.yaw = settings.yaw || 0
    settings.left = settings.left || 0
    settings.top = settings.top || 0
    settings.rotate = settings.rotate || 0
    settings.distance = settings.distance || 1

    let settingKey
    if (modeKey === 'x') settingKey = 'x'
    if (modeKey === 'y') settingKey = 'y'
    if (modeKey === 'z') settingKey = 'z'
    if (modeKey === 't') settingKey = 'theta'
    if (modeKey === 'p') settingKey = 'phi'
    if (modeKey === 'r') settingKey = 'radius'
    if (modeKey === 'l') settingKey = 'left'
    if (modeKey === 'h') settingKey = 'top'
    if (modeKey === 'd') settingKey = 'distance'
    if (modeKey === 'o') settingKey = 'rotate'
    if (modeKey === 'e') settingKey = 'exposure'
    if (modeKey === 'u') settingKey = 'roll'
    if (modeKey === 'i') settingKey = 'pitch'
    if (modeKey === 'w') settingKey = 'yaw'

    const interval = ['p', 't', 'e', 'd'].includes(modeKey) ? .1 : 1

    if (e.key === 'ArrowUp') settings[settingKey] += interval
    if (e.key === 'ArrowDown') settings[settingKey] -= interval
    applyStageSettings(settings)
    console.clear()
    console.log(settingKey)
    console.log(e)
    console.log([
      'x = x',
      'y = y',
      'z = z',
      't = theta',
      'p = phi',
      'r = radius',
      'l = left',
      'h = top',
      'd = distance',
      'o = rotate',
      'e = exposure',
      'u = roll',
      'i = pitch',
      'w = yaw',
    ])
    console.log('desktop', JSON.stringify(settings))
    console.log('mobile', JSON.stringify(mobileSettings(settings)))
  } else {
    modeKey = e.key
  }
})

function mobileSettings (s) {
  return {
    target: `${s['x'] || 0}rad ${s['y'] || 0}rad ${s['z'] || 0}m`,
    orbit: `${s['theta'] || 0}rad ${s['phi'] || 0}rad ${s['radius'] || 0}m`,
    orientation: `${s['roll'] || 0}deg ${s['pitch'] || 0}deg ${s['yaw'] || 0}deg`,
    exposure: s.exposure,
    transform: `translate(-50%, -50%) translateX(${s['left']}vw) translateY(${s['top']}vw) rotate(${s['rotate']}deg) scale(${s['distance']})`,
  }
}
