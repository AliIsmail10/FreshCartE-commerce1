import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService ,private _Router:Router) { }
  errMsg!:string; 
  isLogin!:boolean;
registerForm:FormGroup=new FormGroup({
  'name': new FormControl(null, [Validators.required,Validators.minLength(3), Validators.maxLength(15)]),
  'email': new FormControl(null ,[Validators.required, Validators.email]),
  'phone': new FormControl(null,[Validators.required,Validators.pattern('^01[0125][0-9]{8}$')]),
  'password': new FormControl(null,[Validators.required ,Validators.pattern("^[A-Z][a-zA-Z0-9]{4,9}$")]),
  'rePassword': new FormControl(null,[Validators.required , Validators.pattern("^[A-Z][a-zA-Z0-9]{4,9}$")]),
},this.checkPassword)
sandData() {
  if(this.registerForm.invalid)
  {
    return;
  }
  this.isLogin=true;
  this._AuthService.sentRegister(this.registerForm.value).subscribe(
    {

      
      next: (res:any) => {
        
        this._Router.navigate(['/login']);
        this.isLogin=false;
      },
      error: (err:any) => {
        this.errMsg=err.error.message;
        this.isLogin=false;
      }
    }
  )
} 

checkPassword(form:any){
 
  if(form.get("password").value === form.get("rePassword").value)
  { return null
  }
  else{
    return {"passwordMatch":true};
  }
}


}
