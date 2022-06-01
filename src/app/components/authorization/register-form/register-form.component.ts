import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  user: User;

  constructor(private userService: UserService,
              private toastr: ToastrService) {
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
    this.userService.register(this.user)
      .subscribe({
        next: (user) => {
          this.toastr.success('Успех!', `
          Пользователь с именем ${user.login} успешно зарегистрирован!`);
        },
        error: (error) => {
          this.toastr.error(`
          Пользователь с именем ${error.name} не может быть зарегистрирован!`);
        },
      });

  }

}
