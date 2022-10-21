import {timeline, stagger} from 'motion'

export default function (scroll, delay = 2.7) {
  const $ = selector => scroll.querySelector(`.scroll__${selector}`)
  const $$ = selector => scroll.querySelectorAll(`.scroll__${selector}`)
  const easing = 'cubic-bezier(.7,0,0,1)'

  const mouseLength = $('mouse').getTotalLength()
  const lineLength = $('line').getTotalLength()
  const circle1Length = $('circle-1').getTotalLength()
  const circle2Length = $('circle-2').getTotalLength()

  const tl1 = timeline([
    [scroll,        {opacity: 1},                         {duration: 0}],
    [$('mouse'),    {strokeDasharray: mouseLength},       {duration: 0}],
    [$('line'),     {strokeDasharray: lineLength},        {duration: 0}],
    [$('mouse'),    {opacity: [0, 1]},                    {duration: delay}],
    [$('mouse'),    {strokeDashoffset: [mouseLength, 0]}, {duration:  .8, easing}],
    [$('line'),     {strokeDashoffset: [lineLength, 0]},  {duration:  .5, easing}],
    [$$('tri'),     {opacity: [0,.4]}, {duration: .4, delay: stagger(.1), easing: 'ease-in-out', at: '-.3'}],
  ])

  const tl2 = timeline([
    [$('circle-1'), {strokeDasharray: circle1Length},     {duration: 0}],
    [$('circle-2'), {strokeDasharray: circle2Length},     {duration: 0}],
    [$('circle-1'), {opacity: .4},    {duration: 4}],
    [$('circle-1'), {strokeDashoffset: [circle1Length, 0, circle1Length * -1]}, {duration: 1.5, easing}],
    [$('circle-2'), {strokeDashoffset: [circle2Length, 0, circle2Length * -1]}, {duration: 1.5, easing, delay: .3, at: '<'}],
  ], {repeat: Infinity})

  const animation = {
    play () {
      tl1.play()
      tl2.stop()
      tl2.play()
    }
  }

  return animation
}
