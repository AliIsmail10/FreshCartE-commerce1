import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  ngOnInit(): void {
    
  }
  getAllProducts():Observable<any>{
   return this._HttpClient.get(`${Enviroment.baseUrl}/api/v1/products`)
  }

  getDetails(pId:string):Observable<any>{
  return this._HttpClient.get(`${Enviroment.baseUrl}/api/v1/products/${pId}`)
}

}
