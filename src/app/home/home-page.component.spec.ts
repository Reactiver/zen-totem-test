import { HomePageComponent } from './home-page.component';
import { render, screen } from '@testing-library/angular';

test('Should display "Home Page" title', async () => {
  await render(HomePageComponent);

  const title = await screen.findByText('Home Page');

  expect(title).toBeInTheDocument();
});
