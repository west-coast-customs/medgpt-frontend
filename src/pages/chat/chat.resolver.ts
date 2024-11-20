import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Chat, ChatsService } from '../../shared/services/chats.service';
import { tap } from 'rxjs';

export const chatResolver: ResolveFn<Chat | null> = (route) => {
    const chatsService: ChatsService = inject(ChatsService)
    const router: Router = inject(Router)
    const chatId: string = route.params['id']

    return chatsService.get(chatId)
        .pipe(
            tap((chat: Chat | null) => {
                if (!chat) {
                    void router.navigate(['/chats'])
                }
            })
        )
};
