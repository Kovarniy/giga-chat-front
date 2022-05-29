import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatTextName'
})
export class ChatTextNamePipe implements PipeTransform {

  transform(chatName: string): unknown {
    return chatName.substring(0, 2);
  }

}
