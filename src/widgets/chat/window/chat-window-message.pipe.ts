import { Pipe, PipeTransform } from '@angular/core';
import { ChatMessage, ChatMessageSource } from '../../../entities/chat/api/chats.service';

@Pipe({
  name: 'chatWindowMessage',
  standalone: true
})
export class ChatWindowMessagePipe implements PipeTransform {
  transform(message: ChatMessage): string {
    let formattedMessage: string = `${ message.content }`

    if (message.sources?.length) {
      formattedMessage += `\n\n ${ this.#formatSources(message.sources) }`;
    }

    return formattedMessage.trim();
  }

  #formatSources(sources: ChatMessageSource[]): string {
    const sourcesList: string[] = sources.map((source: ChatMessageSource) => `<li>${ source.extended_title || source.title }</li>`)
    return `<i><span>${ $localize`:@@sources:Sources` }</span>:<ul>${ sourcesList.join('') }</ul></i>`
  }
}
