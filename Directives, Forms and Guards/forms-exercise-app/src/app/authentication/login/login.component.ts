import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModel } from '../models/login.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginModel;
  loginFailed: boolean;
  errorMessage: string;

  constructor(private authService : AuthService,
    private router : Router) { 
      this.model = new LoginModel('', '');
  }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.model)
    .subscribe(
      data => {
        //console.log(data);
        this.successfulLogin(data);
      },
      err => {
       // console.log(err);
        this.loginFailed = true;
        this.errorMessage = err.error.description;
      }
    )
  }

  successfulLogin(data){   // receive data from Kenvey
    this.authService.authtoken = data['_kmd']['authtoken'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    this.router.navigate(['/home']);
  }
}
