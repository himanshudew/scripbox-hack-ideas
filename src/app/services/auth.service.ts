import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserId = new BehaviorSubject('');// used in dashboard
  isUserLoggedIn = new BehaviorSubject(false);// used in app root header

  login(userid: string): void {
    this.setLoginData(userid, true);
    localStorage.setItem('userid', userid);
    localStorage.setItem('isLoggedIn', "true");
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.setLoginData('', false);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('isLoggedIn') == "true") {
      //setting subject to be maintained in case of refresh
      this.setLoginData(localStorage.getItem('userid'), true);
      return true;
    }
    else {
      return false;
    }
  }

  setLoginData(userid, loggedInStatus): void {
    this.getUserId.next(userid);
    this.isUserLoggedIn.next(loggedInStatus);
  }
}
