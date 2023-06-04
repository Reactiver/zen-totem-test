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
