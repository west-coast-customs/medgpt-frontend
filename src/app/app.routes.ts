import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../shared/layouts/landing/landing.layout'),
    loadChildren: () => import('../pages/landing/landing.routes'),
  },
  {
    path: 'auth',
    loadComponent: () => import('../shared/layouts/auth/auth.layout'),
    loadChildren: () => import('../pages/auth/auth.routes'),
  },
  {
    path: 'chats',
    loadComponent: () => import('../pages/chats/chats.component'),
    loadChildren: () => import('../pages/chats/chats.routes'),
  },
  {
    path: '**',
    redirectTo: ''
  }
];
