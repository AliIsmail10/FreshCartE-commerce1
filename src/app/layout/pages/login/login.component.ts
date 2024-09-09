import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  constructor(private _AuthService:AuthService,private _Router:Router){}

   errMsg!:string;
   isLogin!:boolean;
  

   logSub!:Subscription;
   
  LoginForm:FormGroup=new FormGroup({
  'email': new FormControl(null ,[Validators.required, Validators.email]),
  'password': new FormControl(null,[Validators.required ,Validators.pattern("^[A-Z][a-zA-Z0-9]{4,9}$")]),
  })

  sandData() {
    if (this.LoginForm.invalid) {
      return;
    }
    this.isLogin = true;
    this.logSub = this._AuthService.sentLogin(this.LoginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('userToken', res.token);
        this._AuthService.deCodeUserData();
        this._Router.navigate([localStorage.getItem("navigateTo") || '/home']);
        this.isLogin = false;
        
      }
    });
  }
  

  
  ngOnDestroy(): void { 
    this.logSub?.unsubscribe()
  }
} 
