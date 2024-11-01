import { Routes } from '@angular/router';
import { chatGuard } from '../pages/chat/chat.guard';

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
        path: 'new',
        loadComponent: () => import('../pages/chat-placeholder/chat-placeholder.component')
      },
      {
        path: ':id',
        loadComponent: () => import('../pages/chat/chat.component'),
        canActivate: [chatGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
