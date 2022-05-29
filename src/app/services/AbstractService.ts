import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RequestParams} from "../models/constants/RequestParams";
import {EnvironmentService} from "./environment.service";
import {AuthService} from "./auth.service";

export abstract class AbstractService {

  protected domain = this.environmentService.getValue('domain');
  protected requestOptions = {
    headers: new HttpHeaders(RequestParams.header),
  };

  protected constructor(protected httpClient: HttpClient,
                        protected environmentService: EnvironmentService,
                        protected authService: AuthService) {

    const token = authService.getToken();
    this.requestOptions.headers.set('Authorization', `Bearer ${token}`);
  }

}
