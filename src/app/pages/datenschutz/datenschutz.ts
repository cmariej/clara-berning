import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-datenschutz',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './datenschutz.html',
  styleUrls: ['./datenschutz.scss']
})
export class DatenschutzComponent {}