import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { Router, NavigationEnd, provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes
    ),

    provideHttpClient(),

    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'de'
      })
    )
  ]
}