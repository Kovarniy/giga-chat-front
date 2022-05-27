import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this._createUserForm()
  }

  private _createUserForm() {
    this.user = {
      name: '',
      login: '',
      password: ''
    };
  }

  public onUserRegister() {
    this.userService.register(this.user);
  }

}
