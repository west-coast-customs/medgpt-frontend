import { ResolveFn } from '@angular/router';
import { Chat, ChatsService } from '../../shared/services/chats.service';
import { inject } from '@angular/core';

export const chatsResolver: ResolveFn<Chat[]> = () => {
  const chatsService: ChatsService = inject(ChatsService)

  return chatsService.loadAll()
};
