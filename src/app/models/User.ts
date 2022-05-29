import {Avatar} from "./avatar";
import {AbstractEntity} from "./AbstractEntity";

export interface User extends AbstractEntity {
  about?: string;
  avatar?: Avatar;
  isPublic?:	boolean;
  login?: string;
  name?:	string;
  token?: string;
  password?: string;
}
