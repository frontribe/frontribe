import {timeline} from 'motion'

export default function (button) {
  const $ = selector => button.querySelector(`.button__${selector}`)
  const easing = 'cubic-bezier(.7,0,0,.7)'
  const zero = .001

  const animation = timeline([
    [button,              {opacity: 1},                                  {duration: 0}],
    [$('dot'),            {opacity: [0,1], transform: 'rotate(180deg)'}, {duration: 1, easing}],
    [$('text-before'),    {transform: ['scaleX(0)', 'scaleX(1)']},       {duration: .5, easing,}],
    [$('text-after'),     {transform: ['scaleX(0)', 'scaleX(1)']},       {duration: .5, easing, at: '<'}],
    [$('text-before'),    {transformOrigin: 'left'},                     {duration: zero}],
    [$('text-after'),     {transformOrigin: 'right'},                    {duration: zero}],
    [$('dot'),            {opacity: 0},                                  {duration: zero}],
    [$('text-inner'),     {opacity: [0,1]},                              {duration: zero}],
    [$('text-before'),    {transform: 'scaleX(0)'},                      {duration: .5, easing, at: '<'}],
    [$('text-after'),     {transform: 'scaleX(0)'},                      {duration: .5, easing, at: '<'}],
    [$('border.-left'),   {transform: ['scaleY(0)', 'scaleY(1)']},       {duration: .4, easing, at: '-.3'}],
    [$('border.-right'),  {transform: ['scale(-1,0)', 'scale(-1,1)']},   {duration: .4, easing, at: '<'}],
    [$('border.-top'),    {transform: ['scaleX(0)', 'scaleX(1)']},       {duration: .4, easing}],
    [$('border.-bottom'), {transform: ['scaleX(0)', 'scaleX(1)']},       {duration: .8, easing, at: '-.3'}],
  ])

  animation.pause()

  return animation
}
