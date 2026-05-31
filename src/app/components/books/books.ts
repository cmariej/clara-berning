import {
  Component,
  OnInit,
  ChangeDetectorRef,
  HostListener
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { BookModalComponent } from './book-modal';
import { Book } from './book.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    BookModalComponent,
    TranslateModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './books.html',
  styleUrl: './books.scss'
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  selectedBook: Book | null = null;
  currentPage = 0;

  visibleBooks = 3;
  cardWidth = 460;
  gap = 80;

  loading = false;

  @HostListener('window:resize')
  onResize(): void {
    this.updateSliderSettings();
  }

  constructor(
    private translate: TranslateService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loading = true;
    this.updateSliderSettings();
    this.cdr.detectChanges();

    this.http
      .get<Book[]>(
        `${environment.apiUrl}/projects/writing/books`
      )
      .subscribe({

        next: data => {

          this.books = data.map(book => {

            let image = '';

            // Kein Bild hinterlegt
            if (!book.image) {

              image =
                `${environment.imageUrl}/uploads/books/cover-not-available.png`;
            }

            // Bereits vollständige URL
            else if (book.image.startsWith('http')) {

              image = book.image;
            }

            // Relativer Upload-Pfad
            else {

              image =
                `${environment.imageUrl}${book.image}`;
            }

            return {
              ...book,
              image
            };
          });

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: err => {

          console.error(err);

          this.loading = false;

          this.cdr.detectChanges();
        }
      });
  }

  updateSliderSettings(): void {

    const width = window.innerWidth;

    if (width <= 480) {

      this.visibleBooks = 1;
      this.cardWidth = 180;
      this.gap = 0;
    }

    else if (width <= 1000) {

      this.visibleBooks = 1;
      this.cardWidth = 260;
      this.gap = 16;
    }

    // TABLET
    else if (width <= 1600) {

      this.visibleBooks = 2;
      this.cardWidth = 320;
      this.gap = 20;
    }

    // DESKTOP
    else {

      this.visibleBooks = 3;
      this.cardWidth = 380;
      this.gap = 80;
    }

    // verhindert leere Seiten nach Resize
    if (this.currentPage > this.maxPage) {
      this.currentPage = this.maxPage;
    }
  }

  get currentOffset(): number {
    return this.currentPage * (this.cardWidth + this.gap);
  }

  get maxPage(): number {
    return this.books.length - this.visibleBooks;
  }

  nextPage(): void {

    if (this.currentPage < this.maxPage) {
      this.currentPage++;
    }
  }

 prevPage(): void {

    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  openBook(book: Book): void {
    this.selectedBook = book;
  }

  closeModal(): void {
    this.selectedBook = null;
  }

  get currentLang(): 'de' | 'en' {
    return this.translate.getCurrentLang() as 'de' | 'en';
  }
}