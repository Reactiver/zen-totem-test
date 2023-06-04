import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';

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

export function minLengthValidator(
  maxLength: number,
  message: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    return value.length < maxLength ? new TuiValidationError(message) : null;
  };
}

export function urlValidator(message: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === undefined || value === null || value === '') {
      return null;
    }

    const urlRegex = new RegExp(
      '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
    );

    return urlRegex.test(value) ? null : new TuiValidationError(message);
  };
}
