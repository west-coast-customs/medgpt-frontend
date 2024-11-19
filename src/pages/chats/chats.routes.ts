import { Routes } from "@angular/router";

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
      }
    ]
  },
];

export default routes;
