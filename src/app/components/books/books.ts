import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookModalComponent } from './book-modal';
import { Book, Translation } from './book.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    BookModalComponent,
    TranslateModule
  ],
  templateUrl: './books.html',
  styleUrl: './books.scss'
})
export class BooksComponent implements OnInit  {

  books: Book[] = [];
  selectedBook: Book | null = null;
  currentPage = 0;
  visibleBooks = 3;
  cardWidth = 460;

  constructor(private translate: TranslateService, private http: HttpClient) {}

  ngOnInit(): void {

    this.http
      .get<Book[]>(
        `${environment.apiUrl}/projects/Schreiben/buecher`
      )

      .subscribe(data => {

        this.books = data.map(book => {

          let image = ''

          // Kein Bild hinterlegt
          if (!book.image) {

            image =
              `${environment.imageUrl}/uploads/books/cover-not-available.png`
          }

          // Bereits vollständige URL
          else if (
            book.image.startsWith('http')
          ) {

            image = book.image
          }

          // Relativer Upload-Pfad
          else {

            image =
              `${environment.imageUrl}${book.image}`
          }

          console.log(image)

          return {
            ...book,
            image
          }
        })

      })
  }

  get currentOffset(): number {
    return this.currentPage * this.visibleBooks * this.cardWidth;
  }

  get maxPage(): number {
    return Math.ceil(this.books.length / this.visibleBooks) - 1;
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