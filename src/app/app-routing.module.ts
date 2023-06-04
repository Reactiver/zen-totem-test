import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: async () =>
      (await import('./home/home-page.component')).HomePageComponent,
  },
  {
    path: 'inventory',
    loadComponent: async () =>
      (await import('./inventory/inventory-page.component'))
        .InventoryPageComponent,
  },
  {
    path: 'reports',
    loadComponent: async () =>
      (await import('./reports/reports-page.component')).ReportsPageComponent,
  },
  {
    path: 'billing',
    loadComponent: async () =>
      (await import('./billing/billing-page.component')).BillingPageComponent,
  },
  {
    path: 'profile',
    loadComponent: async () =>
      (await import('./profile/profile-page.component')).ProfilePageComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
