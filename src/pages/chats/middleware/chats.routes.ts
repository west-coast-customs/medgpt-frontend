import { Routes } from "@angular/router";
import { chatResolver } from './chat.resolver';
import { profileResolver } from './profile.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('../ui/chat/chat.page'),
      },
      {
        path: 'settings',
        loadComponent: () => import('../ui/settings/settings.page'),
        resolve: { profile: profileResolver },
      },
      {
        path: ':id',
        loadComponent: () => import('../ui/chat/chat.page'),
        resolve: { chat: chatResolver }
      }
    ]
  },
];

export default routes;
