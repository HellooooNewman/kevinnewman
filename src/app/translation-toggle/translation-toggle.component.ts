import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'translation-toggle',
  templateUrl: './translation-toggle.component.html',
  styleUrls: ['./translation-toggle.component.scss']
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
