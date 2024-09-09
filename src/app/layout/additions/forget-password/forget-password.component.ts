import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'] // Corrected the key to 'styleUrls'
})
export class ForgetPasswordComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
   
  isCodeForm: boolean = false
  isResetForm: boolean = false;
  errMsg!: string;
  isLogin: boolean = false; // Initialize to avoid undefined issues
  
  emailForm: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
  });

  codeForm: FormGroup = new FormGroup({
    'resetCode': new FormControl(null, [Validators.required]),
  });

  reDataForm: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'newPassword': new FormControl(null, [Validators.required, Validators.pattern("^[A-Z][a-zA-Z0-9]{4,9}$")]),
  });

  sendEmail() {
    if (this.emailForm.invalid) {
      return;
    }
    this.isLogin = true;
   
    this._AuthService.sendEmailApi(this.emailForm.value).subscribe({
      next: (res: any) => {
        console.log('Email sent successfully:', res);
        this.isLogin = false;
        this.isCodeForm=true;
        this.isResetForm=false;
    this.errMsg="";

      },
      error: (err: any) => {
        this.errMsg = err.error.message || 'Failed to send email.';
        console.error('Error sending email:', err);
        this.isLogin = false;
      }
    });
  }

  verifyCode() {
    if (this.codeForm.invalid) {
      return;
    }
    this.isLogin = true;
    this._AuthService.sendCodeApi(this.codeForm.value).subscribe({
      next: (res: any) => {
        console.log('Code verified successfully:', res);
        this.isLogin = false;
        this.isCodeForm=false;
    this.isResetForm=true;
    this.errMsg="";
      },
      error: (err: any) => {
        this.errMsg = err.error.message || 'Failed to verify code.';
        console.error('Error verifying code:', err);
        this.isLogin = false;
      }
    });
  }

  resetPassword() {
    if (this.reDataForm.invalid) {
      return;
    }
    this.isLogin = true;
    this.isCodeForm=false;
    this.isResetForm=true;
    console.log('Reset Password Data:', this.reDataForm.value); // Log the form data being sent
    this._AuthService.resetDataApi(this.reDataForm.value).subscribe({
      next: (res: any) => {
        console.log('Password reset successfully:', res);
        this.isLogin = false;
        localStorage.setItem("userToken", res.token)
        this._AuthService.deCodeUserData();
        this._Router.navigate(['/home']); // Optionally redirect after successful reset
      },
      error: (err: any) => {
        this.errMsg = err.error.message || 'Failed to reset password.';
        console.error('Error resetting password:', err);
        this.isLogin = false;
      }
    });
  }
}
