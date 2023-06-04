import { FormControl, FormGroup } from '@angular/forms';

export function validateAllFormFields(form: FormGroup): void {
  Object.keys(form.controls).forEach((field) => {
    const control = form.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      validateAllFormFields(control);
    }
  });
}
