import {Avatar} from "./avatar";
import {User} from "./user";
import {AbstractEntity} from "./AbstractEntity";

export interface Channel extends AbstractEntity {
  about:	string;
  avatar:	Avatar;
  link:	string;
  name:	string;
  owner: User;
}
