import { animate } from 'motion'
import * as model from '../../elements/Model/mobile.js'

const names = ['hero-sub', 'whatWeDo', 'remote', 'pricing2', 'howToJoin', 'footer']

export async function create () {
  const secondaryPlanetStages = [
    {transform: 'translate(-50%,-50%) translateX(-65rem) translateY(-20rem) scale(.6) rotate(20deg)', opacity: 1},
    {transform: 'translate(-50%,-50%) translateX(-65rem) translateY(-20rem) scale(.6) rotate(20deg)', opacity: 1},
    {transform: 'translate(-50%,-50%) translateX(-15rem) translateY(-20rem) scale(.6) rotate(20deg)', opacity: 1},
    {transform: 'translate(-50%,-50%) translateX(15rem) translateY(-30rem) scale(.6) rotate(15deg)', opacity: 1},
    {transform: 'translate(-50%,-50%) translateX(15rem) translateY(-20rem) scale(.7) rotate(10deg)', opacity: 1},
  ]

  model.create({
    stages: [
      {"target":"-2.1867299437872134e-7rad 0rad -6.56018983136164e-7m", "orbit":"3.3000000000000016rad 1.3089969389957472rad 20.094352703280414m", "orientation":"-74deg 139deg 146deg", "exposure": 4, "transform":"translate(-50%, -50%) translateX(0vw) translateY(9vw) rotate(-286deg) scale(1)"},
      {"target":"3.1424461965912087e-7rad 2.6958239907060033e-7rad -6.56018983136164e-7m","orbit":"3.5000000000000018rad 1.3089969389957472rad 20.094352703280414m","orientation":"-74deg 139deg 146deg","exposure":4,"transform":"translate(-50%, -50%) translateX(0vw) translateY(-34vw) rotate(-318deg) scale(0.8)"},
      {"target":"4.039437602187945e-7rad 2.717457334711071e-7rad -6.56018983136164e-7m","orbit":"3.800000000000002rad 1.3089969389957472rad 20.094352703280414m","orientation":"-67deg 139deg 146deg","exposure":6,"transform":"translate(-50%, -50%) translateX(38vw) translateY(28vw) rotate(-302deg) scale(1)"},
      {"target":"4.039437602187945e-7rad 2.717457334711071e-7rad -6.56018983136164e-7m","orbit":"3.800000000000002rad 1.008996938995747rad 20.094352703280414m","orientation":"-67deg 139deg 146deg","exposure":6,"transform":"translate(-50%, -50%) translateX(38vw) translateY(59vw) rotate(-302deg) scale(1)"},
      {"target":"4.6299398714921836e-7rad 3.1574450787275055e-7rad -6.56018983136164e-7m","orbit":"4.200000000000001rad 1.008996938995747rad 20.094352703280414m","orientation":"-67deg 139deg 146deg","exposure":6,"transform":"translate(-50%, -50%) translateX(-59vw) translateY(162vw) rotate(-302deg) scale(1)"},
    ],
    names,
    interpolationDecay: 300,
    onStageChange: id => animate('.planet-secondary', secondaryPlanetStages[id], {duration: 2, easing: 'cubic-bezier(0.175, 0.885, 0.320, 1)'})
  })
}

export function destroy () {
  model.destroy(names)
}
