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
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
