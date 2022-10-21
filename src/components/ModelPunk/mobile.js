import * as model from '../../elements/Model/mobile.js'

const names = ['hero', 'whatWeDo', 'howToJoin', 'pricing']

export async function create () {
  model.create({
    stages: [
      { target: '-20m 160m  3m',  orbit: '-81.933deg 90.527deg 80m',    exposure: 1.5, },
      { target: ' 10m 160m 12m',  orbit: '-230.32deg 59.014deg 80m',    exposure: 0.7, },
      { target: ' 55m  85m -2m',  orbit: '-432.76deg 77.35deg 110.5m',  exposure: 0.7, },
      { target: '  0m 150m  0m',  orbit: '-361.93deg 121.47deg 90.9m',  exposure: 0.7, }
    ],
    names,
  })
}

export function destroy () {
  model.destroy(names)
}
