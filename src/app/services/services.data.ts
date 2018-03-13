import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { Project } from './../interfaces/common';
import { environment } from '../../environments/environment';

@Injectable()
export class DataService {
    protected baseUrl: String = 'http://localhost/kevinnewman/';
    public title: Subject<String> = new Subject();
    public smallNav: Boolean = false;

    // Data storage
    public project: Observable<Project[]>;
    private _project: BehaviorSubject<Project[]>;
    public dataStore: {
        projects: Project[]
    };

    constructor(private http: HttpClient,
                private titleService: Title
            ) {
        this.dataStore = { projects: [] };
        this._project = <BehaviorSubject<Project[]>>new BehaviorSubject([]);
        this.project = this._project.asObservable();
        if (environment.production) {
            this.baseUrl = 'https://www.kevinnewman.ca/api/';
        }
    }

    setTitle = (title: String) => {
        this.titleService.setTitle(`${title} - Kevin Newman`);
        this.title.next(title);
    }

    getProject = (id: Number): Observable<Project> => {
        return this.project.map(data => data.filter((project) => project.id === id.toString())[0]);
    }

    // Not used. 
    getNextPreviousProject = (project): Observable<Project[]> => {
        return this.project.map(data => {
            let projects = [];
            if (data) {
                let index = data.indexOf(project);
                projects.push(data[1 - index]);
                projects.push(data[1 + index]);
                return projects;
            }
        });
    }

    getAllProjects = () => {
        if (this.dataStore.projects.length === 0) {
            this.http.get(`${this.baseUrl}projects`).subscribe((data: Array<any>) => {
                this.dataStore.projects = data;
                this._project.next(Object.assign({}, this.dataStore).projects);
            }, error => console.log('Could not load projects.'));
        }
    }

    sendEmail = (url: string): Observable<any> => {
        return this.http.get(url);
    }
}
