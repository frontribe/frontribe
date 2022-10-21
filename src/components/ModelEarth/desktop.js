import Bezier from 'bezier-easing'
import {timeline} from 'motion'
import * as model from '../../elements/Model/desktop.js'
import {oncePerCond, removeCond} from '../../scripts/utils.js'

export async function create () {

  const tl = timeline([
    ['.planet-secondary', {transform: 'translate(-50%,-50%) translateX(40rem)'}, {duration: 1}],
    ['.planet-secondary', {opacity: 1}, {duration: 0, at: 1}],
    ['.planet-secondary', {transform: 'translate(-50%,-50%) translateX(65rem)'}, {duration: 1}],
    ['.planet-secondary', {transform: 'translate(-50%,-50%) translateX(28rem) translateY(-20rem)'}, {duration: 1}],
    ['.planet-secondary', {transform: 'translate(-50%,-50%) translateX(-20rem)'}, {duration: 1}],
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
      {"theta":-6.790425531699185,"phi":1.3089969389957472,"radius":2.743782667888536,"x":-2.094115680861819e-8,"y":-1.1869339067160922e-8,"z":1.757171519400913e-8,"exposure":1.8002337766572574,"top":36,"left":0,"rotate":-72.0795,"distance":0.899532,"pitch":2.9766223342743388,"roll":-428.946231368831,"yaw":-33},
      {"theta":-6.390542420027815,"phi":1.3089969389957472,"radius":2.743782667888536,"x":-2.094115680861819e-8,"y":-1.1869339067160922e-8,"z":1.757171519400913e-8,"exposure":2.000000000000001,"top":6,"left":64,"rotate":-116,"distance":0.499444,"pitch":0,"roll":-323,"yaw":0},
      {"theta":-6.890542420027813,"phi":1.3089969389957472,"radius":2.746773058504915,"x":-2.094115680861819e-8,"y":-1.1869339067160922e-8,"z":1.757171519400913e-8,"exposure":1.4000000000000004,"top":-6,"left":-46,"rotate":-137,"distance":0.499444,"pitch":36,"roll":-349,"yaw":-75},
      {"theta":-7.590542420027811,"phi":1.8089969389957476,"radius":2.746773058504915,"x":-2.094115680861819e-8,"y":-1.1869339067160922e-8,"z":1.757171519400913e-8,"exposure":1.4000000000000004,"top":0,"left":0,"rotate":-137,"distance":0.599444,"pitch":36,"roll":-349,"yaw":-75},
      {"theta":-7.290542420027812,"phi":1.8089969389957476,"radius":2.746773058504915,"x":-2.094115680861819e-8,"y":-1.1869339067160922e-8,"z":1.757171519400913e-8,"exposure":1.4000000000000004,"top":-22,"left":0,"rotate":-137,"distance":0.699444,"pitch":36,"roll":-349,"yaw":-75},
      {"theta":-7.290542420027812,"phi":1.8089969389957476,"radius":2.746773058504915,"x":-2.094115680861819e-8,"y":-1.1869339067160922e-8,"z":1.757171519400913e-8,"exposure":1.4000000000000004,"top":-40,"left":0,"rotate":-137,"distance":0.699444,"pitch":36,"roll":-349,"yaw":-75},
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
