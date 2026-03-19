import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/contracts',
    pathMatch: 'full',
  },
  {
    path: 'contracts',
    loadComponent: () => import('./views/contract/list/contract-list'),
  },
  {
    path: 'contracts/create',
    loadComponent: () => import('./views/contract/create/contract-create'),
  },
  {
    path: 'contracts/:id',
    loadComponent: () => import('./views/contract/detail/contract-detail'),
  },
  {
    path: '404',
    loadComponent: () => import('./views/generics/page-not-found'),
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
