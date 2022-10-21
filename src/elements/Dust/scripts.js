const video = document.querySelector('video.dust')
const contents = parent.innerHTML

function addSourceToVideo(element, src, type) {
  let source = document.createElement('source')
  source.src = src
  source.type = type
  if (type === 'video/mp4') source.codecs = 'hvc1'
  element.appendChild(source)
}

export function create () {
  //  Provide the Safari video
  addSourceToVideo(video, '/video/dust_particles2.mov', 'video/mp4')
  // and the Chrome video
  addSourceToVideo(video, '/video/dust_particles2.webm', 'video/webm')

  video.play()
}

export function destroy () {
  video.innerHTML = contents
}
