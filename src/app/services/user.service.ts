import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {ApiUrls} from "../models/constants/ApiUrls";
import {EnvironmentService} from "./environment.service";
import {AuthService} from "./auth.service";
import {RequestParams} from "../models/constants/RequestParams";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  domain = this.environmentService.getValue('domain');
  requestOptions = {
    headers: new HttpHeaders(RequestParams.header),
  };

  constructor(private httpClient: HttpClient,
              private environmentService: EnvironmentService,
              private authService: AuthService) {

    const token = authService.getToken();
    this.requestOptions.headers.set('Authorization', `Bearer ${token}`);
  }

  public register(user: User): Observable<User> {
    return this.httpClient.post<User>(this.domain + ApiUrls.registerUrl, user);
  }

  public login(user: User): Observable<User> {
    return this.httpClient.post<User>(this.domain + ApiUrls.loginUrl, user);
  }

  public getUser(id: String): Observable<User> {
    return this.httpClient.get<User>(this.domain + ApiUrls.userUrl + id, this.requestOptions);
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(this.domain + ApiUrls.userUrl, user, this.requestOptions);
  }

}
