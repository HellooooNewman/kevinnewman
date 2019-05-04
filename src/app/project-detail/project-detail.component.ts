import { DataService } from './../services/services.data';
import { Project } from './../interfaces/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  public project: Observable<Project>
  // public nextProject: Project;
  // public prevProject: Project;
  private id: Number;
  private sub: any;
  loading: boolean = false

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

  async ngOnInit() {
    this.sub = this.route.params.subscribe(params => this.id = params['id']);
    this.loading = true
    if (!this.dataService.projectsLoaded) {
      this.dataService.getProject(this.id)
      this.loading = false
    }
    this.project = await this.dataService.project.map(_proj => {
      
      let proj = _proj.filter(p => p.id === this.id.toString())[0]
      if(proj !== undefined)
        this.dataService.setTitle(proj.title);
      return proj
    }
    );

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    // this._project.unsubscribe();
    // this.project = null;
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
