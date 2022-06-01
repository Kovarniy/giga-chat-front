import {Channel} from "./Channel";
import {Avatar} from "./avatar";
import {AbstractEntity} from "./AbstractEntity";
import {Message} from "./Message";
import {ChatType} from "./ChatType";
import {ChatUser} from "./ChatUser";

export interface Chat extends AbstractEntity {
  avatar?: Avatar;
  channel?: Channel;
  chatType?: ChatType;
  name?:	string;
  messages?: Message[];
  chatUsers?: ChatUser[];
}
