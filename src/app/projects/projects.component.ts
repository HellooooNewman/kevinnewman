import { Observable } from "rxjs/Rx"
import { Project } from "./../interfaces/common"
import { DataService } from "./../services/services.data"
import { Component, OnInit } from "@angular/core"

@Component({
    selector: "app-projects",
    templateUrl: "./projects.component.html",
    styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit {
    public projects: Observable<Project[]>
    loading: boolean = false

    constructor(public dataService: DataService) {}

    async ngOnInit() {
        this.loading = true
        this.dataService.setTitle("Projects")
        this.dataService.projectsLoaded = false
        if (!this.dataService.projectsLoaded) {
            this.loading = false
            this.dataService.getAllProjects()
        }
        this.projects = await this.dataService.project
    }
}
