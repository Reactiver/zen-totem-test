import { ProfilePageComponent } from './profile-page.component';
import { render, screen } from '@testing-library/angular';

test('should display "Profile Page" title', async () => {
  await render(ProfilePageComponent);

  const title = await screen.findByText('Profile Page');

  expect(title).toBeInTheDocument();
});
