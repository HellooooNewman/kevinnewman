import { DataService } from './../services/services.data';
import { Project } from './../interfaces/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  public project: Project;
  public nextProject: Project;
  public prevProject: Project;
  private id: Number;
  private sub: any;

  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 10,
    slidesPerView: 1,
    grabCursor: true,
    zoom: true
  };

  constructor(private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => this.id = params['id']);
    this.dataService.getProject(this.id).subscribe(project => {
      this.project = project;
      if (this.project !== undefined) {
        this.dataService.setTitle(this.project.title);
        this.getNextPreviousProjects(project);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getNextPreviousProjects(project) {
    this.dataService.getNextPreviousProject(project).subscribe(data => {
      this.prevProject = data[0];
      this.nextProject = data[1];
    });
  }

  changeProject(project) {
    this.id = Number(this.project.id);
    this.getNextPreviousProjects(project);
    this.project = project;
    this.dataService.setTitle(this.project.title);
  }
}
