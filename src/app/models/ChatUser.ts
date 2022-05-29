import {AbstractEntity} from "./AbstractEntity";
import {Chat} from "./Chat";
// @ts-ignore
import {User} from "./User";
import {Message} from "./Message";

export interface ChatUser extends AbstractEntity {
  chat: Chat;
  user: User;
  lastReadMessage: Message;
}
