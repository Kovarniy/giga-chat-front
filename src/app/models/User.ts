import {Avatar} from "./avatar";

export interface User {
  about?: string;
  avatar?: Avatar;
  creationTime?: string | Date;
  id?: string;
  isPublic?:	boolean;
  login: string;
  name:	string;
  token?: string;
  password: string;
}
