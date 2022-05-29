import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {AuthService} from "./auth.service";

export abstract class AbstractService {

  protected domain = this.environmentService.getValue('domain');
  protected requestOptions : {headers: HttpHeaders};

  protected constructor(protected httpClient: HttpClient,
                        protected environmentService: EnvironmentService,
                        protected authService: AuthService) {

    const token = authService.getToken();
    this.requestOptions = {
      headers: new HttpHeaders({'Authorization' : `Bearer ${token}`})
    };
  }

}
