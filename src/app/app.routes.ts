import { Routes } from '@angular/router';
import { ChatsService } from '../shared/services/chats.service';
import { chatsResolver } from '../pages/chats/chats.resolver';

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
    resolve: { chats: chatsResolver },
    providers: [ChatsService],
  },
  {
    path: '**',
    redirectTo: ''
  }
];
