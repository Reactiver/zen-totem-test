import { ReportsPageComponent } from './reports-page.component';
import { render, screen } from '@testing-library/angular';

test('should display "Reports Page" title', async () => {
  await render(ReportsPageComponent);

  const title = await screen.findByText('Reports Page');

  expect(title).toBeInTheDocument();
});
