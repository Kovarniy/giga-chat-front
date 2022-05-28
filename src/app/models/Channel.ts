import {Avatar} from "./avatar";
import {User} from "./user";

export interface Channel {
  about:	string;
  avatar:	Avatar;
  creationTime:	string | Date;
  id:	string;
  link:	string;
  name:	string;
  owner: User;
}
