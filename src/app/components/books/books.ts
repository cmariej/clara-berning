import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookModalComponent } from './book-modal';
import { Book, Translation } from './book.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
export class BooksComponent {

  books: Book[] = [
    {
      id: 1,
      title: 'Fate of the Seven Crowns',
      subtitle: 'Der Sand wird bluten',
      genre: 'Romantasy',
      image: 'assets/images/book-covers/Fate-of-the-Seven-Crowns-1.png',
      description: {
        de: 'Zwei Welten. Ein gefährlicher Verrat, Und eine Liebe, die zum Sturm wird.',
        en: 'This book is currently only available in German.'
      },
      blurb: 'Band 1 der Seven Crown Reihe\n\nEine Welt, die von Wüstensand und Brutalität beherrscht und eine Rebellin, deren Leben komplett auf den Kopf gestellt wird.\n\nMaelyn ist nichts wichtiger, als ihre Liebsten zu beschützen und dem König von Korana endlich die Stirn bieten zu können. Seit dem Tod ihrer Eltern kämpft sie an der Seite ihres Bruders und den Rebellen unerbittlich für eine bessere Zukunft. Doch verändert sich alles, als sie einen Fremden vor einem Diebstahl rettet, der nicht so recht in ihre Welt von Armut und Hunger zu passen scheint.\n\nKaeden ist ein Adliger, der für alles steht, das sie verabscheut. Und als sich Maelyn auch noch ihre eigenen verbotene Magie offenbart, wird er zu ihrem Feind. Doch trotz aller Gefahren kann sie diesem verhängnisvollem Mann einfach nicht fernbleiben.\n\nAls sie erfährt, dass Kaeden hat ein Geheimnis hütet, dass für die Rebellen den Triumpf über das Königshaus bedeuten könnten, ist Maelyn hin- und hergerissen. Soll sie den Mann verraten, der ihr Herz höher schlagen lässt oder ihrem Bruder und den Rebellen den Rücken kehren?\n\nWie weit wird sie gehen, um die zu schützen, die sie liebt?\n\nZwei Welten. Ein gefährlicher Verrat. Und eine Liebe, die zum Sturm wird.'
    },
    {
      id: 2,
      title: 'Fate of the Seven Crowns',
      subtitle: 'Die Magie wird jagen',
      genre: 'Romantasy',
      image: 'assets/images/book-covers/Fate-of-the-Seven-Crowns-2.png',
      description: {
        de: 'TBA',
        en: 'This book is currently only available in German.'
      },
      blurb: 'TBA'
    },
    {
      id: 3,
      title: 'Fate of the Seven Crowns',
      subtitle: 'Die Welt wird beben',
      genre: 'Romantasy',
      image: 'assets/images/book-covers/Fate-of-the-Seven-Crowns-3.png',
      description: {
        de: 'TBA',
        en: 'This book is currently only available in German.'
      },
      blurb: 'TBA'
    }
  ];

  selectedBook: Book | null = null;

  currentPage = 0;

  visibleBooks = 3;

  cardWidth = 460;

  constructor(private translate: TranslateService) {}

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