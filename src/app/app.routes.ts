import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/main/main.component'),
  },
  {
    path: 'chats',
    loadComponent: () => import('../pages/chats/chats.component'),
    children: [
      {
        path: ':id',
        loadComponent: () => import('../pages/chat/chat.component')
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
