import Bezier from 'bezier-easing'
import * as dust from '../../elements/Dust/scripts.js'
import * as model from '../../elements/Model/desktop.js'

export async function create () {
  dust.create()
  await model.create({
    easing: Bezier(.6,0,0,.6),
    stages: [
      {"theta":-1.4300022018866947,"phi":1.5799995659363146,"radius":80,"x":0,"y":160,"z":0,"left":0,"top":0,"rotate":0,"distance":1,"exposure":1.5,},
      {"theta":-4.220001939259331,"phi":1.030000089504277,"radius":80.00001819920294,"x":0,"y":159.9999522643857,"z":0,"left":40,"top":0,"rotate":0,"distance":1,"exposure":0.7,},
      {"theta":-7.470003183617743,"phi":1.1800005833529588,"radius":110.49998783647023,"x":0,"y":80.0000434411778,"z":0,"left":30,"top":0,"rotate":0,"distance":1,"exposure":0.7,},
      {"theta":-12.6,"phi":2.12,"radius":90.9,"x":0,"y":149.99999355970417,"z":0,"left":0,"top":0,"rotate":0,"distance":1,"exposure":0.7,},
      {"theta":-12.6,"phi":2.12,"radius":90.9,"x":0,"y":140.00245838339964,"z":0,"left":0,"top":0,"rotate":0,"distance":1,"exposure":0.7,},
    ],
  })
}

export function destroy () {
  dust.destroy()
  model.destroy()
}
