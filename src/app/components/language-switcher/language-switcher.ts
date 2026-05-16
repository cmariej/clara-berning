import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.html',
  styleUrls: ['./language-switcher.scss']
})
export class LanguageSwitcherComponent {

  constructor(public translation: TranslationService) {}

  switchLanguage(lang: string) {
    this.translation.use(lang);
  }
}