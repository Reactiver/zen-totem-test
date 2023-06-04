import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { TuiErrorModule } from '@taiga-ui/core';
import { maxLengthValidator, textRequiredValidator } from './validators';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  form = new FormGroup({
    email: new FormControl('my-email@gmail.com'),
    firstName: new FormControl('', [
      textRequiredValidator('Введите имя'),
      maxLengthValidator(255, 'Имя не должно превышать 255 символов'),
    ]),
  });
}
