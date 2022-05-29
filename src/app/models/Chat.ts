import {Channel} from "./Channel";
import {Avatar} from "./avatar";
import {AbstractEntity} from "./AbstractEntity";
import {Message} from "./Message";
import {ChannelUser} from "./ChannelUser";

export interface Chat extends AbstractEntity {
  avatar?: Avatar;
  channel?: Channel;
  chatType?: string; // TODO возмжно тут можно представить данные по другому
  name?:	string;
  messages?: Message[];
  chatUsers?: ChannelUser[];
}
