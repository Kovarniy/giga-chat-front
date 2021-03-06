import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'giga-chat-front';

  constructor(private authService: AuthService) {
  }

  public isAuth(): boolean {
    return this.authService.isAuth();
  }

}
