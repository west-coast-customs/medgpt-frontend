import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Chat, ChatsService } from '../../../../entities/chat/api/chats.service';
import { tap } from 'rxjs';

export const chatResolver: ResolveFn<Chat | null> = (route) => {
  const chatId: string = route.params['id']

  if (!chatId) return null;

  return inject(ChatsService).get(chatId)
    .pipe(tap((chat: Chat | null) =>
      !chat && void inject(Router).navigate(['/chats'])
    ))
};
