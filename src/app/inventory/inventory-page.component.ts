import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryPageComponent {}
