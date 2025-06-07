import { DataService } from './services/services.data';
import { Component, ViewEncapsulation, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { Router, NavigationEnd } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';

import { routerTransition } from './router.animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
declare let ga: Function;

@Component({
  selector: 'app-app',
  encapsulation: ViewEncapsulation.None,
  animations: [routerTransition],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
})

export class AppComponent implements OnInit {

  public position: string;
  readonly maxNavScrollHeight: number = 260;

  constructor(
    public dataService: DataService,
    @Inject(DOCUMENT) private document: Document,
    public router: Router,
    public translateService: TranslateService
    ) {
    // Translations
    translateService.addLangs(['en', 'fr']);
    translateService.setDefaultLang('en');

    // Google analytics
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    console.log('Oh hey....what are you doing here :P');
    console.log('Try putting your mouse on the stars in the header. ^');
    console.log('Did you know if you press ctrl + p on the home page you can get the most up to date version of my resume');

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.dataService.setTitle(this.dataService.title.getValue().toString());
    });
  }

  changeOfRoutes() {
    if (this.document.scrollingElement.scrollTop > 350) {
      window.scrollTo(0, 330);
    }
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
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
