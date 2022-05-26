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

  user: FormGroup;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this._createUserForm()
  }

  private _createUserForm() {
    this.user = new FormGroup({
      login: new FormControl(null),
      name: new FormControl(null),
      password: new FormControl(null)
    })
  }

  register() {
    const _user: User = {
      name: this.user.get('name'),
      login: this.user.get('login'),
      password: this.user.get('password')
    }
    const newUser = this.userService.register(_user);
    console.log(newUser);
  }

}
