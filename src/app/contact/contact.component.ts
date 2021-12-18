import { CustomFormsModule } from 'ng2-validation';
import { DataService } from './../services/services.data';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators, FormBuilder, FormsModule } from '@angular/forms';

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
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public message: String = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.setTitle('Contact');
  }
}
