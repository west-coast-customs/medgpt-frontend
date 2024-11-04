import { animate, animation, keyframes, query, style, transition, trigger } from '@angular/animations';

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
