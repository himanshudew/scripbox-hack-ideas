import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required]
    });
    this.authService.logout();
  }

  // convenience getter for easy access to form fields  
  get form() { return this.loginForm.controls; }

  login() {
    // stop here if form is invalid  
    if (this.loginForm.invalid) {
      this.message = "Please input your userid.";
    }
    else {
      if (this.form.userid.value == 'admin') {// check for username
        this.authService.login(this.form.userid.value);
        this.router.navigate(['']);
      }
      else {
        this.message = "Please check your userid.";
      }
    }
  }
}  