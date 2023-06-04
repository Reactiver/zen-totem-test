import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-billing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './billing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingPageComponent {}
