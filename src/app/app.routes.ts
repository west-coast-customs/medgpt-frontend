import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/main/main.component'),
  },
  {
    path: 'chats',
    loadChildren: () => import('../pages/chats/chats.routes'),
  },
  {
    path: '**',
    redirectTo: ''
  }
];
