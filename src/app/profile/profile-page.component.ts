import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPhoneModule,
} from '@taiga-ui/kit';
import {
  TuiAlertService,
  TuiButtonModule,
  TuiErrorModule,
  TuiLoaderModule,
  TuiNotification,
} from '@taiga-ui/core';
import {
  maxLengthValidator,
  minLengthValidator,
  textRequiredValidator,
  urlValidator,
} from './form-helpers/validators';
import { Profile, ProfileService } from './profile.service';
import { BehaviorSubject, catchError, finalize, map, switchMap } from 'rxjs';
import { TuiLetModule } from '@taiga-ui/cdk';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { validateAllFormFields } from './form-helpers/validate-all-form-fields';

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
  private readonly destroyRef = inject(DestroyRef);
  private readonly profileService = inject(ProfileService);
  private readonly tuiAlertService = inject(TuiAlertService);

  private readonly isSaving = new BehaviorSubject<boolean>(false);

  readonly isFormSaving$ = this.isSaving.asObservable();

  readonly form$ = this.profileService.getProfile().pipe(
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
      validateAllFormFields(form);

      return;
    }

    this.isSaving.next(true);

    this.profileService
      .saveProfile(form.getRawValue())
      .pipe(
        finalize(() => this.isSaving.next(false)),
        switchMap(() =>
          this.tuiAlertService.open('Profile updated successfully', {
            status: TuiNotification.Success,
          })
        ),
        catchError((errorMessage: string) =>
          this.tuiAlertService.open(errorMessage, {
            status: TuiNotification.Error,
            autoClose: false,
          })
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
