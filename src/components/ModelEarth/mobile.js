import { animate } from 'motion'
import * as model from '../../elements/Model/mobile.js'

const names = ['hero-sub', 'whatWeDo', 'remote', 'orderedList', 'pricing2', 'footer']

export async function create () {
  const secondaryPlanetStages = [
    {transform: 'translate(-50%,-50%) translateX(-35rem) translateY(-20rem) scale(.6) rotate(20deg)', opacity: 1},
    {transform: 'translate(-50%,-50%) translateX(-35rem) translateY(-20rem) scale(.6) rotate(20deg)', opacity: 1},
    {transform: 'translate(-50%,-50%) translateX(-10rem) translateY(-30rem) scale(.6) rotate(-30deg)', opacity: 1},
    {transform: 'translate(-50%,-50%) translateX(-35rem) translateY(-30rem) scale(.6) rotate(20deg)', opacity: 1},
    {transform: 'translate(-50%,-50%) translateX(-35rem) translateY(-20rem) scale(.6) rotate(20deg)', opacity: 1},
  ]

  model.create({
    stages: [
      {"target":"-2.0962105384825236e-8rad -1.1881209571740214e-8rad 1.758928891426592e-8m","orbit":"-6.790425531699185rad 1.3089969389957472rad 2.743782667888536m","orientation":"0deg 0deg 0deg","exposure":1.4,"transform":"translate(-50%, -50%) translateX(0vw) translateY(18vw) rotate(-72.0795deg) scale(0.899532)"},
      {"target":"-2.0962105384825236e-8rad -1.1881209571740214e-8rad 1.758928891426592e-8m","orbit":"-6.599999999999994rad 1.3089969389957472rad 2.746773058504915m","orientation":"0deg 0deg 0deg","exposure":1.4,"transform":"translate(-50%, -50%) translateX(10vw) translateY(-23vw) rotate(-124deg) scale(0.9)"},
      {"target":"-2.0962105384825236e-8rad -1.1881209571740214e-8rad 1.758928891426592e-8m","orbit":"-6.499999999999993rad 1.3089969389957472rad 2.746773058504915m","orientation":"0deg 0deg 0deg","exposure":1.4,"transform":"translate(-50%, -50%) translateX(14vw) translateY(13vw) rotate(-175deg) scale(0.8)"},
      {"target":"-2.0962105384825236e-8rad -1.1881209571740214e-8rad 1.758928891426592e-8m","orbit":"-7.29999999999999rad 1.6089969389957475rad 2.746773058504915m","orientation":"0deg 0deg 0deg","exposure":1.4,"transform":"translate(-50%, -50%) translateX(14vw) translateY(13vw) rotate(-175deg) scale(0.9)"},
      {"target":"-2.0962105384825236e-8rad -1.1881209571740214e-8rad 1.758928891426592e-8m","orbit":"-7.29999999999999rad 1.6089969389957475rad 2.746773058504915m","orientation":"0deg 0deg 0deg","exposure":1.4,"transform":"translate(-50%, -50%) translateX(14vw) translateY(-29vw) rotate(-175deg) scale(0.7)"},
    ],
    names,
    interpolationDecay: 300,
    onStageChange: id => animate('.planet-secondary', secondaryPlanetStages[id], {duration: 2, easing: 'cubic-bezier(0.175, 0.885, 0.320, 1)'})
  })
}

export function destroy () {
  model.destroy(names)
}
