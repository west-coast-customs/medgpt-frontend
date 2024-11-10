import { Routes } from "@angular/router";
import { chatGuard } from '../chat/chat.guard';
import { ChatService } from '../../shared/services/chat.service';
import { ChatsService } from '../../shared/services/chats.service';

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
        canActivate: [chatGuard]
      }
    ]
  },
];

export default routes;
