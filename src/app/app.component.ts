import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router,) { }

  title = 'scripbox-hack-ideas';
  isUserLoggedIn = false;

  ngOnInit(): void {
    this.authService.isUserLoggedIn.subscribe(val => this.isUserLoggedIn = val);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
