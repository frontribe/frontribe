import Bezier from 'bezier-easing'
import {timeline} from 'motion'
import * as model from '../../elements/Model/desktop.js'
import {oncePerCond, removeCond} from '../../scripts/utils.js'

export async function create () {
  const tl = timeline([
    ['.planet-secondary', {transform: 'translate(-50%,-50%) translateX(40rem)'}, {duration: 1}],
    ['.planet-secondary', {opacity: 1}, {duration: 0, at: 1}],
    ['.planet-secondary', {transform: 'translate(-50%,-50%) translateX(-65rem)'}, {duration: 1}],
    ['.planet-secondary', {transform: 'translate(-50%,-50%) translateX(28rem) translateY(-20rem)'}, {duration: 1}],
    ['.planet-secondary', {transform: 'translate(-50%,-50%) translateX(-20rem)'}, {duration: 1}],
    ['.planet-secondary', {transform: 'translate(-50%,-50%) translateX(-22rem) scale(1.05)'}, {duration: 1}],
  ], {easing: 'cubic-bezier(1,1,0,0)'})
  tl.pause()

  const tl2 = timeline([
    ['.planet-ring:nth-of-type(1)', {transform: 'scale(1.1)', opacity: [0, .5, 0]}, {duration: 2}],
    ['.planet-ring:nth-of-type(2)', {transform: 'scale(1.2)', opacity: [0, .5, 0]}, {duration: 2, at: .6}],
    ['.planet-ring:nth-of-type(3)', {transform: 'scale(1.3)', opacity: [0, .5, 0]}, {duration: 2, at: 1.2}],
    ['.planet-ring:nth-of-type(4)', {transform: 'scale(1.1)', opacity: [0, .5, 0]}, {duration: 2, at: 1.8}],
    ['.planet-ring:nth-of-type(5)', {transform: 'scale(1.3)', opacity: [0, .5, 0]}, {duration: 2, at: 2.4}],
  ], {
    easing: 'cubic-bezier(1,1,0,0)',
    repeat: 1000,
    delay: 1
  })
  tl2.pause()

  await model.create({
    easing: Bezier(1,1,0,0),
    stages: [
      {"theta":-0.5,"phi":1.3089969389957472,"radius":20.094352703280414,"x":-2.1867299437872134e-7,"y":0,"z":-6.56018983136164e-7,"exposure":4.400000000000001,"top":36,"left":0,"rotate":-82,"distance":0.9,"pitch":0,"roll":169,"yaw":0},
      {"theta":-0.6,"phi":1.3089969389957472,"radius":20.094352703280414,"x":-2.1867299437872134e-7,"y":0,"z":-6.56018983136164e-7,"exposure":4.400000000000001,"top":6,"left":60,"rotate":-150,"distance":0.5,"pitch":0,"roll":116,"yaw":0},
      {"theta":-0.4,"phi":1.3089969389957472,"radius":20.094352703280414,"x":-2.1867299437872134e-7,"y":0,"z":-6.56018983136164e-7,"exposure":4.400000000000001,"top":6,"left":38,"rotate":-114,"distance":0.7,"pitch":0,"roll":149,"yaw":0},
      {"theta":-0.4,"phi":1.3089969389957472,"radius":20.094352703280414,"x":-2.1867299437872134e-7,"y":0,"z":-6.56018983136164e-7,"exposure":6.400000000000001,"top":0,"left":-108,"rotate":-79,"distance":0.7,"pitch":0,"roll":197,"yaw":0},
      {"theta":-0.4,"phi":1.3089969389957472,"radius":20.094352703280414,"x":-2.1867299437872134e-7,"y":0,"z":-6.56018983136164e-7,"exposure":6.400000000000001,"top":100,"left":-112,"rotate":-79,"distance":0.9,"pitch":0,"roll":197,"yaw":0},
      {"theta":-0.4,"phi":1.3089969389957472,"radius":20.094352703280414,"x":-2.1867299437872134e-7,"y":0,"z":-6.56018983136164e-7,"exposure":6.400000000000001,"top":100,"left":-116,"rotate":-79,"distance":1.1,"pitch":0,"roll":197,"yaw":0},
    ],
    onTotalProgress: totalProgress => {
      tl.currentTime = totalProgress
      oncePerCond('remote', 1.9 < totalProgress && totalProgress < 2.1, isTrue => {
        if (isTrue) tl2.play()
        else tl2.finish()
      })
    }
  })
}

export function destroy () {
  model.destroy()
  removeCond('remote')
}
