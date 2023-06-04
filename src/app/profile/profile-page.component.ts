import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { TuiErrorModule } from '@taiga-ui/core';
import { TuiValidationError } from '@taiga-ui/cdk';

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

export function textRequiredValidator(message: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    return value === undefined || value === null || value === ''
      ? new TuiValidationError(message)
      : null;
  };
}

export function maxLengthValidator(
  maxLength: number,
  message: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    return value.length > maxLength ? new TuiValidationError(message) : null;
  };
}
