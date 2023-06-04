import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsPageComponent {}
