import { Routes } from '@angular/router';
import { ChatsService } from '../entities/chat/api/chats.service';
import { chatsResolver } from '../pages/chats/middleware/chats.resolver';
import { subscriptionResolver } from '../pages/chats/middleware/subscription.resolver';
import { chatsGuard } from '../pages/chats/middleware/chats.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/landing/layout/landing.layout'),
    loadChildren: () => import('../pages/landing/middleware/landing.routes'),
  },
  {
    path: 'auth',
    loadComponent: () => import('../pages/auth/layout/auth.layout'),
    loadChildren: () => import('../pages/auth/middleware/auth.routes'),
    data: { hideHeaderButton: true }
  },
  {
    path: 'chats',
    loadComponent: () => import('../pages/chats/layout/chats.layout'),
    loadChildren: () => import('../pages/chats/middleware/chats.routes'),
    resolve: { chats: chatsResolver, subscription: subscriptionResolver },
    canActivate: [chatsGuard],
    providers: [ChatsService],
  },
  {
    path: '**',
    redirectTo: ''
  }
];
