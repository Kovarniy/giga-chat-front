import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../models/user";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  user: User;

  constructor(private userService: UserService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this._createUserForm();
  }

  private _createUserForm() {
    this.user = {
      name: '',
      login: '',
      password: ''
    };
  }

  onUserLogin() {
    this.userService.login(this.user)
      .subscribe({
        next: (user) => {
          if (!user.token) {
            return;
          }
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user));

          this.toastr.success('Успех!', `
          Пользователь с именем ${user.login} успешно авторизован!`);
        },
        error: (error) => {
          this.toastr.error('Неудача!', `
          Пользователя с именем ${error.name} не существует!`);
        },
      });
  }

}
