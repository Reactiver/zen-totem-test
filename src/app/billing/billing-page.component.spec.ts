import { BillingPageComponent } from './billing-page.component';
import { render, screen } from '@testing-library/angular';

test('should display "Billing Page" title', async () => {
  await render(BillingPageComponent);

  const title = await screen.findByText('Billing Page');

  expect(title).toBeInTheDocument();
});
