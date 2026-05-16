import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  currentLang = 'de';

  constructor(private translate: TranslateService) {

    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('de');

    const savedLang = localStorage.getItem('lang');

    if (savedLang) {
      this.use(savedLang);
    } else {
      this.use('de');
    }
  }

  use(lang: string) {
    this.currentLang = lang;

    this.translate.use(lang);

    localStorage.setItem('lang', lang);
  }
}