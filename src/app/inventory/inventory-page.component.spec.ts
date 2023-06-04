import { InventoryPageComponent } from './inventory-page.component';
import { render, screen } from '@testing-library/angular';

test('Should display "Inventory Page" title', async () => {
  await render(InventoryPageComponent);

  const title = await screen.findByText('Inventory Page');

  expect(title).toBeInTheDocument();
});
