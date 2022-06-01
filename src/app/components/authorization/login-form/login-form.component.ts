import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  user: User;

  constructor(private userService: UserService,
              private toastr: ToastrService,
              private router: Router) {
  }

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

          this.toastr.success(`
          Пользователь с именем ${user.login} успешно авторизован!`, 'Успех!');
          this.router.navigate(['/chat-application']);
        },
        error: (error) => {
          this.toastr.error("Неверный логин или пароль", "Ошибка!");
        },
      });
  }

}
