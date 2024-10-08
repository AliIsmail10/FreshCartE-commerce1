import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Enviroment } from '../../../base/enviroment';
import { jwtDecode } from 'jwt-decode';
import { LoginData, UserData } from '../../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:BehaviorSubject<any>=new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient , private _Router:Router) {
    if(typeof localStorage !== 'undefined'){
      if(localStorage.getItem("userToken") !== null){
        this.deCodeUserData()
        this._Router.navigate([localStorage.getItem("currentPage")]);
      }
    }
   }

  sentRegister(userData:UserData):Observable<any>{
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/auth/signup`,userData)
  } 
  
  sentLogin(userData:LoginData):Observable<any>{
    return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/auth/signin`,userData);
  }

  deCodeUserData(){
    const token = localStorage.getItem('userToken');
    this.userData.next(jwtDecode(JSON.stringify(token)))       
}


sendEmailApi(email:string):Observable<any>{
  return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/auth/forgotPasswords`,email)
}


sendCodeApi(code:string):Observable<any>{
  return this._HttpClient.post(`${Enviroment.baseUrl}/api/v1/auth/verifyResetCode`, code)
}



resetDataApi(restData:any):Observable<any>{
  return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, restData)
}

}
