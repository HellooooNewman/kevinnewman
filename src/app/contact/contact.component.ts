import { DataService } from './../services/services.data';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

const enum messageStates {
  pending,
  sending,
  sent,
  failure,
  success
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [TranslateModule],
})
export class ContactComponent implements OnInit {
  public message: String = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.setTitle('contact');
  }
}
