import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  isLoginTab = true;

  constructor() { }

  ngOnInit(): void {

  }


  changeToLogin() {
    this.isLoginTab = true;
  }

  changeToRegistration() {
    this.isLoginTab = false;
  }
}
