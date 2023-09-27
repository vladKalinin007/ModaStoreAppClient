import {trigger, animate, transition, style, stagger, query, animateChild, keyframes} from '@angular/animations';

export const cascade = trigger('cascade', [
  transition('* => *', [
    query(':enter', style({ opacity: 0 }), { optional: true }),

    query(':enter', stagger('100ms', [
      animate('1s ease-in', keyframes([
        style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
        style({ opacity: .5, transform: 'scale(0.5)', offset: 0.3 }),
        style({ opacity: 1, transform: 'scale(1.1)', offset: 0.8 }),
        style({ opacity: 1, transform: 'scale(1)', offset: 1 }),
      ]))]), { optional: true })
  ]) ]);

export const fastCascade = trigger('fastCascade', [
  transition('* => *', [
    query(':enter', style({ opacity: 0 }), { optional: true }),

    query(':enter', stagger('50ms', [
      animate('0.3s ease-in-out', keyframes([
        style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
        style({ opacity: .5, transform: 'scale(0.5)', offset: 0.5 }),
        style({ opacity: 1, transform: 'scale(1.10)', offset: 0.8 }),
        style({ opacity: 1, transform: 'scale(1)', offset: 1 }),
      ]))]), { optional: true })
  ]) ]);



export const fadeIn = trigger('fadeInAnimation', [
  transition('* => *', [
    query(':enter', style({ opacity: 0 }), { optional: true }),

    query(':enter', stagger('100ms', [
      animate('1s ease-in', keyframes([
        style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
        style({ opacity: .5, transform: 'scale(0.5)', offset: 0.3 }),
        style({ opacity: 1, transform: 'scale(1.1)', offset: 0.8 }),
        style({ opacity: 1, transform: 'scale(1)', offset: 1 }),
      ]))]), { optional: true })
  ])
])





