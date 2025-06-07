import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'translation-toggle',
  templateUrl: './translation-toggle.component.html',
  styleUrls: ['./translation-toggle.component.scss'],
  imports: [CommonModule, TranslateModule],
})
export class TranslationToggleComponent {
  languages = [
    {
      value: 'en',
      text: 'enButton',
    },
    {
      value: 'fr',
      text: 'frButton',
    },
  ]

  constructor(private translate: TranslateService) { }

  translateSite(langauge: string) {
    this.translate.use(langauge);
  }
}
