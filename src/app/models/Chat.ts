import {Channel} from "./Channel";
import {Avatar} from "./avatar";
import {AbstractEntity} from "./AbstractEntity";

export interface Chat extends AbstractEntity {
  avatar?: Avatar;
  channel?: Channel;
  chatType?: string; // TODO возмжно тут можно представить данные по другому
  name?:	string;
}
