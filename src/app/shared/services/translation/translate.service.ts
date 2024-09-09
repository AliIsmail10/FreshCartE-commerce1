import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranalateService {

  constructor(private _translate:TranslateService) {
 

     if(typeof window !== 'undefined' && localStorage.getItem('lang') !=='undefined') {
      this._translate.setDefaultLang("en");

      const lang=localStorage.getItem("lang");
      if(lang){
      this._translate.use(lang);
      }
      this.changeDir()
   
     }
   }

   
 
   changeDir(){
     

    if(localStorage.getItem("lang") == "en")
    {
      document.body.dir="ltr";
    }
    else if(localStorage.getItem("lang") == "ar"){
      document.body.dir="rtl";
    }
   }


      

   changeLanguage(lang:string){
    localStorage.setItem("lang",lang);
    this._translate.use(lang);
    this.changeDir()
    
    }
}
