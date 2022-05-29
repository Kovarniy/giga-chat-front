import {Avatar} from "./avatar";
import {AbstractEntity} from "./AbstractEntity";
import {ChatUser} from "./ChatUser";
import {ChannelUser} from "./ChannelUser";

export interface User extends AbstractEntity {
  about?: string;
  avatar?: Avatar;
  isPublic?:	boolean;
  login?: string;
  name?:	string;
  token?: string;
  password?: string;
  chatUsers?: ChatUser[];
  channelUsers?: ChannelUser[];
}
