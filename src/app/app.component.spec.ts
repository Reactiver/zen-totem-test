import { AppComponent } from './app.component';
import { fireEvent, render, screen } from '@testing-library/angular';
import { TuiRootModule } from '@taiga-ui/core';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { HeaderComponent } from './header/header.component';

test('should render home page by default', async () => {
  await render(AppComponent, {
    imports: [HeaderComponent, TuiRootModule, RouterTestingModule],
    routes: routes,
  });

  const title = await screen.findByText('Home Page');

  expect(title).toBeInTheDocument();
});

test('should open needed page by clicking link in the header', async () => {
  await render(AppComponent, {
    imports: [HeaderComponent, TuiRootModule, RouterTestingModule],
    routes: routes,
  });

  fireEvent.click(await screen.findByText('Home'));
  expect(await screen.findByText('Home Page')).toBeInTheDocument();

  fireEvent.click(await screen.findByText('Inventory'));
  expect(await screen.findByText('Inventory Page')).toBeInTheDocument();

  fireEvent.click(await screen.findByText('Reports'));
  expect(await screen.findByText('Reports Page')).toBeInTheDocument();

  fireEvent.click(await screen.findByText('Billing'));
  expect(await screen.findByText('Billing Page')).toBeInTheDocument();

  fireEvent.click(await screen.findByText('Profile'));
  expect(await screen.findByText('Profile Page')).toBeInTheDocument();
});
