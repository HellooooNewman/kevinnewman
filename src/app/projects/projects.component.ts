import { Observable } from "rxjs/Rx"
import { Project } from "./../interfaces/common"
import { DataService } from "./../services/services.data"
import { Component, OnInit } from "@angular/core"
import { map } from "rxjs/operators"
import { animate, query, stagger, style, transition, trigger } from '@angular/animations'

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit {
  public projects: Observable<Project[]>
  public archivedProjects: Observable<Project[]>
  loading: boolean = false
  showArchivedProjects: boolean = false

  constructor(public dataService: DataService) { }

  async ngOnInit() {
    this.loading = true
    this.dataService.setTitle("projects")
    this.projects = this.dataService.project.pipe(
      map(projects => projects
        .filter(item => !item.archived)
        .sort((a, b) => this.sortDate(a, b))
      )
    )
    this.archivedProjects = this.dataService.project.pipe(
      map(projects => projects
        .filter(item => item.archived)
        .sort((a, b) => this.sortDate(a, b))
      )
    )

    this.dataService.getAllProjects()
  }

  sortDate(a: Project, b: Project){
    return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
  }

  showMoreProjects() {
    this.showArchivedProjects = !this.showArchivedProjects
  }
}
