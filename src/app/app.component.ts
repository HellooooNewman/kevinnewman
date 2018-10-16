import { DataService } from './services/services.data';
import { Component, ViewEncapsulation, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

import { routerTransition } from './router.animations';
declare let ga: Function;

@Component({
    moduleId: module.id,
    selector: 'app-app',
    encapsulation: ViewEncapsulation.None,
    animations: [routerTransition],
    template: `
        <app-header [style.top]="position + 'px'" [class.small-nav]="dataService.smallNav"></app-header>
        <main [@routerTransition]="getState(route)">
            <router-outlet #route="outlet" (activate)="changeOfRoutes()"></router-outlet>
        </main>
        <app-footer></app-footer>`,
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    public position: string;
    readonly maxNavScrollHeight: number = 260;

    constructor(public dataService: DataService,
        @Inject(DOCUMENT) private document: Document,
        public router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        });
    }

    ngOnInit() {
        console.log('Oh hey....what are you doing here :P');
        console.log('Try clicking on the stars in the header. ^');
    }

    public getState(outlet) {
        return outlet.activatedRouteData.state;
    }

    changeOfRoutes() {
        if (this.document.scrollingElement.scrollTop > 350) {
            window.scrollTo(0, 330);
        }
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        let scrollPosition = this.document.scrollingElement.scrollTop;
        if (scrollPosition < this.maxNavScrollHeight) {
            this.position = '-' + scrollPosition;
        }

        if (scrollPosition > 260) {
            this.dataService.smallNav = true;
        } else {
            this.dataService.smallNav = false;
        }

        // Just to make sure it doesn't go past the scroll point
        if (scrollPosition > this.maxNavScrollHeight) {
            this.position = '-' + this.maxNavScrollHeight.toString();
        }
    }
}
