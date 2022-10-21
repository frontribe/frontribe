import {timeline} from 'motion'
import stagger from '../../scripts/stagger.js'
import {oncePerCond, removeCond} from '../../scripts/utils.js'
import createButtonAnim from '../../elements/Button/scripts.js'
import createRollerAnim from '../../elements/IconBoxRoller/scripts.js'

const parent = document.querySelector('[data-name="howToJoin"]')
const contents = parent.innerHTML

export function create () {
  const buttonAnim = createButtonAnim(document.querySelector('.how-to-join__button'))
  const rollerAnim = createRollerAnim(document.querySelector('.how-to-join__box-icon-box'))

  const tl = timeline([
    ['.how-to-join',         {position: 'fixed', top: 0, left: 0}, {duration: 0, at: 0}],
    ['.how-to-join__box-bg', {transform: ['translateY(24vh)', 'translateY(0vh)', 'translateY(-24vh)']}, {duration: 2, at: 0}],
    ['.how-to-join__box',    {transform: ['translateY(6vh)', 'translateY(0vh)', 'translateY(-6vh)']}, {duration: 2, at: 0}],
    ['.how-to-join__list',   {transform: ['translateY(3vh)', 'translateY(0vh)', 'translateY(-3vh)']}, {duration: 2, at: 0}],

    ['.how-to-join__title',  {transform: ['translateY(6vh)', 'translateY(0vh)', 'translateY(-6vh)']}, {duration: 2, at: 0}],
    ['.how-to-join__desc',   {transform: ['translateY(3vh)', 'translateY(0vh)', 'translateY(-3vh)']}, {duration: 2, at: 0}],
    ['.how-to-join__button', {transform: ['translateY(1vh)', 'translateY(0vh)', 'translateY(-1vh)']}, {duration: 2, at: 0}],
    ['.how-to-join',         {opacity: [0,  1, 0], zIndex: [0 , 1, 0]}, {duration: 1, at: .5}],
  ], {easing: 'cubic-bezier(1,1,0,0)'})

  tl.pause()

  stagger.onStageProgress('howToJoin', p => {
    tl.currentTime = p
    oncePerCond('howToJoin', .3 < p && p < 1.7, isTrue => {
      if (isTrue) {
        buttonAnim.play()
        rollerAnim.play()
      } else {
        buttonAnim.currentTime = 0
        rollerAnim.currentTime = 0
      }
    })
  })
}

export function destroy () {
  removeCond('howToJoin')
  stagger.removeStageProgress('howToJoin')
  parent.innerHTML = contents
}
