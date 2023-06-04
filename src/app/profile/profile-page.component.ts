import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneModule,
} from '@taiga-ui/kit';
import { TuiErrorModule } from '@taiga-ui/core';
import {
  maxLengthValidator,
  minLengthValidator,
  textRequiredValidator,
} from './validators';

const NAME_MAX_LENGTH = 255;

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputPhoneModule,
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
      maxLengthValidator(
        NAME_MAX_LENGTH,
        `Имя не должно превышать ${NAME_MAX_LENGTH} символов`
      ),
    ]),
    lastName: new FormControl('', [
      textRequiredValidator('Введите фамилию'),
      maxLengthValidator(
        NAME_MAX_LENGTH,
        `Фамилия не должна превышать ${NAME_MAX_LENGTH} символов`
      ),
    ]),
    phoneNumber: new FormControl('', [
      minLengthValidator(12, `Номер телефона должен содержать 10 цифр`),
    ]),
  });
}
