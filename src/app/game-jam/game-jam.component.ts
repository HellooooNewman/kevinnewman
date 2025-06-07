import { Observable } from "rxjs"
import { GameJam } from "./../interfaces/common"
import { DataService } from "./../services/services.data"
import { Component, OnInit } from "@angular/core"
import { CommonModule, AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: "app-game-jam",
  templateUrl: "./game-jam.component.html",
  styleUrls: ["./game-jam.component.scss"],
  imports: [CommonModule, AsyncPipe, TranslateModule],
})
export class GameJamComponent implements OnInit {
  public gameJams: Observable<GameJam[]>
  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.dataService.setTitle("gameJams")
    this.gameJams = this.dataService.game_jam
    this.dataService.getAllGames()
  }
}
