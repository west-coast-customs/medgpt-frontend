import { ResolveFn } from '@angular/router';
import { Chat, ChatsService } from '../../../entities/chat/api/chats.service';
import { inject } from '@angular/core';

export const chatsResolver: ResolveFn<Chat[]> = () => inject(ChatsService).loadAll();
