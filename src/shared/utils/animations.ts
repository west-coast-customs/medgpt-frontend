import { animate, animation, group, keyframes, query, style, transition, trigger } from '@angular/animations';

export const fadeOnEnter = (time: number) => trigger('fadeOnEnter', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(`${ time }ms`, style({ opacity: 1 }))
  ]),
])

export const fadeOnTrigger = (time: number) => trigger('fadeOnTrigger', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0 }),
      animate(`${ time }ms`, style({ opacity: 1 }))
    ], { optional: true })
  ]),
])

export const fadeInOutHeight = (time: number) => trigger('fadeInOutHeight', [
  transition(':enter', [
    style({ opacity: 0, height: 0 }),
    animate(`${ time }ms`, style({ opacity: 1, height: '*' }))
  ]),
  transition(':leave', [
    animate(`${ time }ms`, style({ opacity: 0, height: 0 }))
  ]),
])

export const fadeInUpOnEnter = (time: number) => trigger('fadeInUpOnEnter', [
  transition(':enter', [
    style({ visibility: 'hidden' }),
    animation([
      animate(`${ time }ms`,
        keyframes([
          style({
            visibility: 'visible',
            opacity: 0,
            transform: 'translate3d(0, 100%, 0)',
            easing: 'ease',
            offset: 0
          }),
          style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 })
        ])
      )
    ])
  ])
])

export const slideInRightOutLeft = (time: number) => trigger('slideInRightOutLeft', [
  transition(':enter', [
    style({ visibility: 'hidden' }),
    animation([
      animate(
        `${ time }ms`,
        keyframes([
          style({ visibility: 'visible', transform: 'translate3d(-100%, 0, 0)', easing: 'ease', offset: 0 }),
          style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 })
        ])
      )
    ])
  ]),
  transition(':leave', [
    animation([
      animate(
        `${ time }ms`,
        keyframes([
          style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 0 }),
          style({ transform: 'translate3d(-100%, 0, 0)', visibility: 'hidden', easing: 'ease', offset: 1 })
        ])
      )
    ])
  ]),
])

export const bounceInRightOutRight = (time: number) => trigger('bounceInRightOutRight', [
  transition(':enter', [
    style({ visibility: 'hidden' }),
    animation(
      group([
        animate(
          `${ time }ms`,
          keyframes([
            style({ transform: 'translate3d(100%, 0, 0)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0 }),
            style({ transform: 'translate3d(-25px, 0, 0)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0.6 }),
            style({ transform: 'translate3d(10px, 0, 0)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0.75 }),
            style({ transform: 'translate3d(-5px, 0, 0)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0.9 }),
            style({ transform: 'translate3d(0, 0, 0)', easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 1 })
          ])
        ),
        animate(
          `${ time }ms`,
          keyframes([
            style({ visibility: 'visible', opacity: 0, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0 }),
            style({ opacity: 1, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0.6 }),
            style({ opacity: 1, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 1 })
          ])
        )
      ]),
    )],
  ),
  transition(':leave', [
    animation(
      group([
        animate(
          `${ time }ms`,
          keyframes([
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 0 }),
            style({ opacity: 1, transform: 'translate3d(-20px, 0, 0)', easing: 'ease', offset: 0.2 }),
            style({ opacity: 0, transform: 'translate3d(100%, 0, 0)', easing: 'ease', offset: 1 })
          ])
        )
      ]),
    )]
  ),
])
