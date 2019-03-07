import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterModel } from '../models/register.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model : RegisterModel;
  loginFailed: boolean;
  errorMessage: string;

  constructor(private authService : AuthService,
    private router : Router) {                // in order to make redirect after register
    this.model = new RegisterModel('', '', '', '', 18);
  }

  
  ngOnInit() {
  }
  
  register(){
    delete this.model['confirmPassword'];
    
    this.authService.register(this.model)
    .subscribe(
      data => {
        this.router.navigate(['/login'])
      },
      err => {
        //console.log(err);
        this.loginFailed = true;
        this.errorMessage = err.error.description;
      }
    )
  }
}
