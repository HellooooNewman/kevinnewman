import { Observable } from "rxjs/Rx"
import { GameJam } from "./../interfaces/common"
import { DataService } from "./../services/services.data"
import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-game-jam",
  templateUrl: "./game-jam.component.html",
  styleUrls: ["./game-jam.component.scss"],
})
export class GameJamComponent implements OnInit {
  public gameJams: Observable<GameJam[]>
  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.setTitle("Game Jams")
    this.gameJams = this.dataService.game_jam
    this.dataService.getAllGames()
  }
}
