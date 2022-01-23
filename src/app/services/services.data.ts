import { Title } from "@angular/platform-browser"
import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs/Observable"
import { BehaviorSubject } from 'rxjs';
import { Project, GameJam } from "./../interfaces/common"
import ProjectsJson from "../../assets/data/projects.json"
import GamesJson from "../../assets/data/games.json"
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class DataService {
  public title: BehaviorSubject<String> = new BehaviorSubject('home')
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

  constructor(private http: HttpClient, private titleService: Title, private translate: TranslateService) {
    this.dataStore = { projects: [], game_jams: [] }
  }

  /**
   * Sets title of the page
   * @param title page title
   */
  setTitle = (title: string) => {
    this.translate.get(title).subscribe((res: string) => {
      this.titleService.setTitle(`${res} - Kevin Newman`)
      this.title.next(title)
    })
  }

  /**
   * Get all projects
   * @returns returns obersvable array of projects
   */
  getAllProjects = () => {
    if (this.dataStore.projects.length === 0) {
      this.dataStore.projects = ProjectsJson as Project[]
      this._project.next(
        Object.assign({}, this.dataStore).projects
      )
    }
  }

  /**
   * Get all games from itch.io stored on my site
   * @returns returns observable array of games
   */
  getAllGames = () => {
    if (this.dataStore.game_jams.length === 0) {
      this.dataStore.game_jams = GamesJson as GameJam[]
      this._game_jam.next(
        Object.assign({}, this.dataStore).game_jams
      )
    }
  }
}
