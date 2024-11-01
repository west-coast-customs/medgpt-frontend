import { ActivatedRouteSnapshot, CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Chat, ChatsService } from '../../shared/services/chats.service';
import { map } from 'rxjs';

export const chatGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const chatId: string = route.params['id']
  const newChatUrl = inject(Router).parseUrl('/chats/new')

  return inject(ChatsService)
    .getChat(chatId)
    .pipe(map((chat: Chat | null) => {
      if (chat) {
        return true
      }

      return new RedirectCommand(newChatUrl)
    }))
};
