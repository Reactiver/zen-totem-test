import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
