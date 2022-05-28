import {Chat} from "./Chat";
import {User} from "./user";

export interface Message {
  chat:	Chat;
  creationTime:	string | Date;
  id:	string;
  isRead:	boolean;
  sender:	User;
  text:	string;
}
