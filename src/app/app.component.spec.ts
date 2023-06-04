import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';
import { TuiRootModule } from '@taiga-ui/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePageComponent } from './home/home-page.component';
import { routes } from './app-routing.module';

test('Should render home page by default', async () => {
  await render(AppComponent, {
    imports: [HomePageComponent, TuiRootModule, RouterTestingModule],
    routes: routes,
  });

  const title = await screen.findByText('Home Page');

  expect(title).toBeInTheDocument();
});
