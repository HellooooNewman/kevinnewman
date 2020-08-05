import { Title } from "@angular/platform-browser"
import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs/Observable"
import { Subject, BehaviorSubject } from 'rxjs';
import { Project, GameJam } from "./../interfaces/common"
import { environment } from "../../environments/environment"

@Injectable()
export class DataService {
  protected baseUrl: String = "https://www.kevinnewman.ca/api/"
  public title: Subject<String> = new Subject()
  public smallNav: Boolean = false

  // Data storage
  private _project = <BehaviorSubject<Project[]>>(new BehaviorSubject([]))
  public project: Observable<Project[]> = this._project.asObservable()

  private _game_jam = <BehaviorSubject<GameJam[]>>new BehaviorSubject([])
  public game_jam: Observable<GameJam[]> = this._game_jam.asObservable()

  private dataStore: {
    projects: Project[]
    game_jams: GameJam[]
  }

  constructor(private http: HttpClient, private titleService: Title) {
    this.dataStore = { projects: [], game_jams: [] }

    if (environment.production) {
      this.baseUrl = "https://www.kevinnewman.ca/api/"
    }
  }

  /**
   * Sets title of the page
   * @param title page title
   */
  setTitle = (title: String) => {
    this.titleService.setTitle(`${title} - Kevin Newman`)
    this.title.next(title)
  }

  /**
   * Get all projects
   * @returns returns obersvable array of projects
   */
  getAllProjects = () => {
    if (this.dataStore.projects.length === 0) {
      this.http.get(`${this.baseUrl}projects`).subscribe(
        (data: Array<Project>) => {
          this.dataStore.projects = data
          this._project.next(
            Object.assign({}, this.dataStore).projects
          )
        },
        error => console.log("Could not load projects.")
      )
    }
  }

  /**
   * Get all games from itch.io stored on my site
   * @returns returns observable array of games
   */
  getAllGames = () => {
    if (this.dataStore.game_jams.length === 0) {
      this.http.get(`${this.baseUrl}games`).subscribe(
        (data: Array<GameJam>) => {
          this.dataStore.game_jams = data
          this._game_jam.next(
            Object.assign({}, this.dataStore).game_jams
          )
        },
        error => console.log("Could not load games.")
      )
    }
  }

  /**
   * Send email to server
   * @param url string
   * @returns An observable string
   */
  sendEmail = (url: string): Observable<any> => {
    return this.http.get(url)
  }
}
