import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient) { }

  getAllCategories():Observable< any>{
    return this._HttpClient.get(`${Enviroment.baseUrl}/api/v1/categories`)
  }


  GetSpecificCategory(categoryId:string):Observable <any>{
     return this._HttpClient.get(`${Enviroment.baseUrl}/api/v1/categories/${categoryId}`)
  }
}
