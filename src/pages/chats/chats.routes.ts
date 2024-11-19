import { Routes } from "@angular/router";
import { chatResolver } from '../chat/chat.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('../chat/placeholder/chat-placeholder.component')
      },
      {
        path: ':id',
        loadComponent: () => import('../chat/chat.component'),
        resolve: { chat: chatResolver }
      }
    ]
  },
];

export default routes;
