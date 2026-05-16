import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule
  ],
  templateUrl: './app.html'
})
export class AppComponent {

  constructor(private translate: TranslateService, private router: Router) {

    this.translate.setDefaultLang('de');

    this.translate.use('de');

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

      });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

   @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {

    const zoomKeys = ['+', '-', '=', '_'];

    if (
      (event.ctrlKey || event.metaKey) &&
      zoomKeys.includes(event.key)
    ) {
      event.preventDefault();
    }

    // Ctrl + Mousewheel
    if (event.ctrlKey) {
      event.preventDefault();
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (event.ctrlKey) {
      event.preventDefault();
    }
  }

    // @HostListener('document:contextmenu', ['$event'])
    // disableRightClick(event: MouseEvent) {
    //   event.preventDefault();
    // }
}