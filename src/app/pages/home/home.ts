import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { NavbarComponent } from '../../components/navbar/navbar';
import { HeroComponent } from '../../components/hero/hero';
import { AboutComponent } from '../../components/about/about';
import { ContactComponent } from '../../components/contact/contact';
import { FooterComponent } from '../../components/footer/footer';
import { BooksComponent } from '../../components/books/books';
interface CbbConfig {
  showBooksSection: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    BooksComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  showBooksSection = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<CbbConfig>('/assets/data/cbb-config.json').subscribe({
      next: config => {
        this.showBooksSection = config.showBooksSection !== false;
      },
      error: error => console.error('CBB-Konfiguration konnte nicht geladen werden.', error)
    });
  }
}