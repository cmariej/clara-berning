import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './impressum.html',
  styleUrls: ['./impressum.scss']
})
export class ImpressumComponent {}