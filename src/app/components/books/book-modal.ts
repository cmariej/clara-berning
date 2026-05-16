import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Book } from './book.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.html',
  styleUrls: ['./book-modal.scss'],
  imports: [
    CommonModule, TranslateModule
  ],
})
export class BookModalComponent {

  @Input() book!: Book;

  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }
}