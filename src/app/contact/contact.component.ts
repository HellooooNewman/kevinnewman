import { CustomFormsModule } from 'ng2-validation';
// import { Http } from '@angular/http';
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

    public contactForm: FormGroup;
    public message: String = '';
    public messageState;
    @ViewChild('contactFormElement') contactFormElement: ElementRef;

    constructor(private dataService: DataService,
                private fb: FormBuilder) { }

    ngOnInit() {
        this.dataService.setTitle('Contact');
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            subject: ['', Validators.required],
            telephone: [''],
            message: ['', Validators.required],
            emptyField: ['', Validators.maxLength(0)],
        });
        this.messageState = messageStates.pending;
    }

    submitForm(value: any): void {
        let baseUrl = 'https://api.elasticemail.com/v2/email/send';
        let apiKey = 'c48501b5-38ab-4080-85dd-2954b6a2a90f';
        let message =  `Hello, my name is ${value.name}
                        ${value.message}
                        name: ${value.name}
                        phone: ${value.telephone}
                        email: ${value.email}`;

        let url = `${baseUrl}?apikey=${apiKey}&subject=${encodeURI(value.subject)}&from=${encodeURI(value.email)}&to=contact@kevinnewman.ca&bodyHtml=${encodeURI(message)}`;

        this.message = "";
        this.messageState = messageStates.sending;
        this.contactFormElement.nativeElement.classList.add('is-sent');
        this.contactFormElement.nativeElement.class = messageStates.sending;

        this.dataService.sendEmail(url).subscribe(
            response => {
                this.messageState = messageStates.sent;
                this.contactFormElement.nativeElement.classList.remove('is-sent');
                console.log('success');
                if (!response.success) {
                    this.messageState = messageStates.failure;
                    this.message = response.error;
                    this.contactFormElement.nativeElement.classList.add('failed-launch');
                    setTimeout(() => {
                        this.messageState = messageStates.pending;
                        this.contactFormElement.nativeElement.classList.remove('is-sent');
                        this.contactFormElement.nativeElement.classList.remove('failed-launch');
                    }, 900);
                } else {
                    this.contactFormElement.nativeElement.classList.add('success');
                    this.messageState = messageStates.success;
                }
            },
            err => {
                console.log('error');
                this.messageState = messageStates.failure;
                this.message = 'Something went wrong ¯\\_(ツ)_/¯';
                setTimeout(() => {
                    this.contactFormElement.nativeElement.classList.add('failed-launch');
                    setTimeout(() => {
                        this.messageState = messageStates.pending;
                        this.contactFormElement.nativeElement.classList.remove('is-sent');
                        this.contactFormElement.nativeElement.classList.remove('failed-launch');
                    }, 900);
                }, 900);
            }
        );
    }
}
