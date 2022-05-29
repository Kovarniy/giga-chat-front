import {Chat} from "./Chat";
import {User} from "./user";
import {AbstractEntity} from "./AbstractEntity";

export interface Message extends AbstractEntity {
  chat?:	Chat;
  isRead?:	boolean;
  sender?:	User;
  text?:	string;
  isCuttentUserMessage?: boolean; // only front (not fans)
}
