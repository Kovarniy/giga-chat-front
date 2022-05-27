import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {EnvironmentService} from "./environment.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
              private environmentService: EnvironmentService) {
  }

  public register(user: User): Observable<User> {
    const domain = this.environmentService.getValue('domain');
    return this.httpClient.post<User>(domain + 'api/register', user);
  }

  public login(user: User): Observable<User> {
    const domain = this.environmentService.getValue('domain');
    return this.httpClient.post<User>(domain + 'api/login', user);
  }

}
