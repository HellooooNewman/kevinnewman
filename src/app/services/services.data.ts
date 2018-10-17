import { Title } from "@angular/platform-browser";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/Rx";
import { Project, GameJam } from "./../interfaces/common";
import { environment } from "../../environments/environment";

@Injectable()
export class DataService {
  protected baseUrl: String = "http://localhost/api/";
  public title: Subject<String> = new Subject();
  public smallNav: Boolean = false;
  public projectsLoaded: Boolean = false;

  // Data storage
  public project: Observable<Project[]>;
  private _project: BehaviorSubject<Project[]>;

  public featured: Observable<Project[]>;
  private _featured: BehaviorSubject<Project[]>;

  public game_jam: Observable<GameJam[]>;
  private _game_jam: BehaviorSubject<GameJam[]>;

  public dataStore: {
    projects: Project[];
    game_jams: GameJam[];
    featured: Project[];
  };

  constructor(private http: HttpClient, private titleService: Title) {
    this.dataStore = { projects: [], game_jams: [], featured: [] };
    this._project = <BehaviorSubject<Project[]>>new BehaviorSubject([]);
    this.project = this._project.asObservable();

    this._featured = <BehaviorSubject<Project[]>>new BehaviorSubject([]);
    this.featured = this._featured.asObservable();

    this._game_jam = <BehaviorSubject<GameJam[]>>new BehaviorSubject([]);
    this.game_jam = this._game_jam.asObservable();
    if (environment.production) {
      this.baseUrl = "https://www.kevinnewman.ca/api/";
    }
  }

  /**
   * Sets title of the page
   * @param title page title
   */
  setTitle = (title: String) => {
    this.titleService.setTitle(`${title} - Kevin Newman`);
    this.title.next(title);
  };

  /**
   * Get project by id
   * Not used.
   * @param id Project number
   * @returns Observable project
   */
  getProject = (id: Number): Observable<Project> => {
    return this.project.map(
      data => data.filter(project => project.id === id.toString())[0]
    );
  };

  /**
   * Get all projects
   * Not used.
   * @returns Observable project
   */
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
  };

  /**
   * Get all projects
   * @returns returns obersvable array of projects
   */
  getAllProjects = () => {
    if (this.dataStore.projects.length === 0) {
      this.http.get(`${this.baseUrl}projects`).subscribe(
        (data: Array<Project>) => {
          this.dataStore.projects = data;
          this.projectsLoaded = true;
          this._project.next(Object.assign({}, this.dataStore).projects);
        },
        error => console.log("Could not load projects.")
      );
    }
  };

  /**
   * Get all projects
   * @returns returns observable array of featured projects
   */
  getFeaturedProjects = () => {
    if (this.dataStore.featured.length === 0) {
      this.http.get(`${this.baseUrl}projects-featured`).subscribe(
        (data: Array<Project>) => {
          this.dataStore.featured = data;
          // this.projectsLoaded = true;
          this._featured.next(Object.assign({}, this.dataStore).featured);
        },
        error => console.log("Could not load featured projects.")
      );
    }
  };

  /**
   * Get all games from itch.io stored on my site
   * @returns returns observable array of games
   */
  getAllGames = () => {
    if (this.dataStore.game_jams.length === 0) {
      this.http.get(`${this.baseUrl}games`).subscribe(
        (data: Array<GameJam>) => {
          this.dataStore.game_jams = data;
          this._game_jam.next(Object.assign({}, this.dataStore).game_jams);
        },
        error => console.log("Could not load games.")
      );
    }
  };

  /**
   * Send email to server
   * @param url string
   * @returns An observable string
   */
  sendEmail = (url: string): Observable<any> => {
    return this.http.get(url);
  };
}
