import { Routes } from "@angular/router";
import { chatResolver } from './chat.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('../ui/chat.page'),
      },
      {
        path: ':id',
        loadComponent: () => import('../ui/chat.page'),
        resolve: { chat: chatResolver }
      }
    ]
  },
];

export default routes;
