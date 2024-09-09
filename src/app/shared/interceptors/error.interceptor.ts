import { ToastrService } from 'ngx-toastr';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr: ToastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      
    
      if(typeof window !== 'undefined' && localStorage.getItem('userToken')!==null){
        toastr.error(err.message)
       
    
      }
     
      return throwError(()=>err)
    })
  );
};
