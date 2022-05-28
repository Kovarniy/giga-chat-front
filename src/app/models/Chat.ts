import {Channel} from "./Channel";
import {Avatar} from "./avatar";

export interface Chat {
  avatar: Avatar;
  channel: Channel;
  chatType: string; // TODO возмжно тут можно представить данные по другому
  creationTime:	string | Date;
  id:	string;
  name:	string;
}
