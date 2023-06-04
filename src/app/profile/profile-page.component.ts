import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneModule,
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
import {
  maxLengthValidator,
  minLengthValidator,
  textRequiredValidator,
  urlValidator,
} from './validators';
import { Profile, ProfileService } from './profile.service';
import { map } from 'rxjs';
import { TuiLetModule } from '@taiga-ui/cdk';

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
    TuiLetModule,
    TuiButtonModule,
    TuiLoaderModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  private readonly profileService = inject(ProfileService);

  form$ = this.profileService.getProfile().pipe(
    map(({ email, firstName, lastName, phoneNumber, webSiteUrl }) => {
      return new FormGroup({
        email: new FormControl<Profile['email']>(email),
        firstName: new FormControl<Profile['firstName']>(firstName, [
          textRequiredValidator('Введите имя'),
          maxLengthValidator(
            NAME_MAX_LENGTH,
            `Имя не должно превышать ${NAME_MAX_LENGTH} символов`
          ),
        ]),
        lastName: new FormControl<Profile['lastName']>(lastName, [
          textRequiredValidator('Введите фамилию'),
          maxLengthValidator(
            NAME_MAX_LENGTH,
            `Фамилия не должна превышать ${NAME_MAX_LENGTH} символов`
          ),
        ]),
        phoneNumber: new FormControl<Profile['phoneNumber']>(phoneNumber, [
          textRequiredValidator('Введите номер телефона'),
          minLengthValidator(12, `Номер телефона должен содержать 10 цифр`),
        ]),
        webSiteUrl: new FormControl<Profile['webSiteUrl']>(webSiteUrl, [
          urlValidator('Неверный URL'),
        ]),
      });
    })
  );

  save(form: FormGroup): void {
    if (form.invalid) {
      this.validateAllFormFields(form);
    } else {
      this.profileService.saveProfile(form.getRawValue());
    }
  }

  private validateAllFormFields(form: FormGroup): void {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
