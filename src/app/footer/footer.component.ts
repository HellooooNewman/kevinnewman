import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public isContactPage: boolean = false;
  public footerBg = "./assets/ground.svg";
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isContactPage = this.router.url === '/contact' ? true : false;
      }
    });
  }
}
