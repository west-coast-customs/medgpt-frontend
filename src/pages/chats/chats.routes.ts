import { Routes } from "@angular/router";
import { chatGuard } from '../chat/chat.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./chats.component'),
    children: [
      {
        path: '',
        loadComponent: () => import('../chat-placeholder/chat-placeholder.component')
      },
      {
        path: ':id',
        loadComponent: () => import('../chat/chat.component'),
        canActivate: [chatGuard]
      }
    ]
  },
];

export default routes;
