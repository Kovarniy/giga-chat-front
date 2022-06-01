import {Avatar} from "./avatar";
import {User} from "./user";
import {AbstractEntity} from "./AbstractEntity";
import {Chat} from "./Chat";
import {ChannelUser} from "./ChannelUser";

export interface Channel extends AbstractEntity {
  about:	string;
  avatar?:	Avatar;
  link?:	string;
  name:	string;
  owner: User;
  chats?: Chat[];
  channelUsers?: ChannelUser[];
}
