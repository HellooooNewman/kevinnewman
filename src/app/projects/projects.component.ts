import { Observable } from 'rxjs/Rx';
import { Project } from './../interfaces/common';
import { DataService } from './../services/services.data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public projects: Observable<Project[]>;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.setTitle('Projects');
    this.projects = this.dataService.project;
  }

  selectProject (project: Project) {
  }
}
