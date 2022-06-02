import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {ApiUrls} from "../models/constants/ApiUrls";
import {EnvironmentService} from "./environment.service";
import {AuthService} from "./auth.service";
import {RequestParams} from "../models/constants/RequestParams";
import {AbstractService} from "./AbstractService";

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService {

  private userUrl = this.domain + ApiUrls.userUrl;

  constructor(protected override httpClient: HttpClient,
              protected override environmentService: EnvironmentService,
              protected override authService: AuthService) {

    super(httpClient, environmentService, authService);
  }

  public register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.domain + ApiUrls.registerUrl, user);
  }

  public login(user: User): Observable<User> {
    return this.httpClient.post<User>(this.domain + ApiUrls.loginUrl, user);
  }

  public getUser(id: String): Observable<User> {
    return this.httpClient.get<User>(this.userUrl + "/" + id, this.requestOptions);
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient.patch<User>(this.userUrl, user, this.requestOptions);
  }

  public getUserByLogin(login: String): Observable<User> {
    return this.httpClient.get<User>(this.userUrl + "?login=" + login, this.requestOptions);
  }

}
