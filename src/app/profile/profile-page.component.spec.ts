import { ProfilePageComponent } from './profile-page.component';
import { render, screen } from '@testing-library/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { TuiErrorModule } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import userEvent from '@testing-library/user-event';

test('should display "Profile Page" title', async () => {
  await render(ProfilePageComponent);

  const title = await screen.findByText('Profile Page');

  expect(title).toBeInTheDocument();
});

test('should display required error if user touched first name field', async () => {
  const user = userEvent.setup();

  await render(ProfilePageComponent, {
    componentImports: [
      CommonModule,
      ReactiveFormsModule,
      TuiInputModule,
      TuiErrorModule,
      TuiFieldErrorPipeModule,
    ],
  });

  await user.click(await screen.findByLabelText('First Name'));
  await user.click(document.body);

  expect(await screen.findByText('Введите имя')).toBeInTheDocument();
});
