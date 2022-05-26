export interface User {
  about?: string;
  avatar?: Avatar;
  creationTime?: string;
  id?: string;
  isPublic?:	boolean;
  login: string;
  name:	string;
  token?: string;
  password: string;
}

export interface Avatar {
  creationTime: string;
  id:	string;
  path: string
}
