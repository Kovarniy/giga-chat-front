import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * Пользователь авторизован.
   */
  public isAuth(): boolean {
    return !!localStorage.getItem('token')
        || !!localStorage.getItem('user');
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getUser(): string {
    return localStorage.getItem('user');
  }

  public getCurrentUserLogin(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.login ? user?.login : null;
  }

}
