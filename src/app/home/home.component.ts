import { TruncatePipe } from './../pipes/truncate';
import { Project } from './../interfaces/common';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/filter';
import { DataService } from './../services/services.data';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public projects: Observable<Project[]>;

  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 2,
    spaceBetween: 10,
    grabCursor: true,
  };


  constructor(private titleService: Title,
              private dataService: DataService) { }

  ngOnInit() {
    this.dataService.setTitle('Home');
    this.projects = this.dataService.project.map(project =>
      project.filter(item => {
        if (item.promote === 'True') {
          return item;
        }
      })
    );
  }

}
