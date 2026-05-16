import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import {
  provideTranslateService,
  TranslateModule
} from '@ngx-translate/core';

import {
  provideTranslateHttpLoader
} from '@ngx-translate/http-loader';

import { AppComponent } from './app/app';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),

    provideRouter(routes),

    provideTranslateService({
      lang: 'de',
      fallbackLang: 'de',
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
      })
    }),

    importProvidersFrom(TranslateModule)
  ]
}).catch(err => console.error(err));