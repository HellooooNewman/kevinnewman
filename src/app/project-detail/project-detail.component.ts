import { DataService } from './../services/services.data';
import { Project } from './../interfaces/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  public project$: Observable<Project>
  // public nextProject: Project;
  // public prevProject: Project;
  private id: Number;
  private sub: Subscription;

  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 10,
    slidesPerView: 1,
    grabCursor: true,
    zoom: true
  };

  constructor(private dataService: DataService,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    window.scrollTo(0, 0)

    this.sub = this.route.params.subscribe(params => this.id = params['id'])
    this.project$ = this.dataService.project.pipe(
      map(projects => projects.find(p => p.id === this.id.toString())),
      tap(project => this.dataService.setTitle(project.title))
    )
    this.dataService.getAllProjects()
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  // getNextPreviousProjects(project) {
  //   this.dataService.getNextPreviousProject(project).subscribe(data => {
  //     this.prevProject = data[0];
  //     this.nextProject = data[1];
  //   });
  // }

  // changeProject(project) {
  //   this.id = Number(this.project.id);
  //   this.getNextPreviousProjects(project);
  //   this.project = project;
  //   this.dataService.setTitle(this.project.title);
  // }
}
