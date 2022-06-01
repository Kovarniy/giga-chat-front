import {AbstractEntity} from "./AbstractEntity";
import {Channel} from "./Channel";
import {User} from "./user";

export interface ChannelUser extends AbstractEntity {
  channel?: Channel;
  user?: User;
}
