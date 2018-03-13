import { trigger, animate, style, group, animateChild, query, stagger, transition } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
    transition('* <=> *', [
        // Initial state of new route
        query(':enter',
            style({
                width: '100%',
                transform: 'translateX(-5%)',
                opacity: 0
            }),
            { optional: true }
        ),
        // move page off screen right on leave
        query(':leave',
            animate('500ms ease',
                style({
                    width: '100%',
                    transform: 'translateX(5%)',
                    opacity: 0,
                })
            ),
            { optional: true }
        ),
        // move page in screen from left to right
        query(':enter',
            animate('500ms ease',
                style({
                    opacity: 1,
                    transform: 'translateX(0%)'
                })
            ),
            { optional: true }
        )
    ])
]);

