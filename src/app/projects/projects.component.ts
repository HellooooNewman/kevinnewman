import { Observable } from "rxjs"
import { filter, map } from "rxjs/operators"
import { Project } from "./../interfaces/common"
import { DataService } from "./../services/services.data"
import { Component, OnInit } from "@angular/core"
import { animate, query, stagger, style, transition, trigger } from '@angular/animations'
import { CommonModule, AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
  imports: [CommonModule, AsyncPipe, TranslateModule, RouterModule],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ],
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
    // Restore showArchivedProjects from localStorage
    const archivedPref = localStorage.getItem('showArchivedProjects');
    this.showArchivedProjects = archivedPref === 'true';
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
    // Save to localStorage
    localStorage.setItem('showArchivedProjects', String(this.showArchivedProjects));
  }
}
