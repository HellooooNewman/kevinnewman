import { Observable } from 'rxjs/Rx';
import { Project } from './../interfaces/common';
import { DataService } from './../services/services.data';
import { Component, OnInit } from '@angular/core';
import { PlaceholderContent } from './../shared/placeholder-content';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public projects: Observable<Project[]>;

  constructor(private dataService: DataService) {
  }

  async ngOnInit() {
    this.dataService.setTitle('Projects');
    if (!this.dataService.projectsLoaded) {
      this.dataService.getAllProjects();
    }
    this.projects = await this.dataService.project;
  }
}
