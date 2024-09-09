import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);



  // Check if window and localStorage are available
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    if (localStorage.getItem("userToken") !== null) {
      return true;
    } else {

      localStorage.setItem("navigateTo",state.url)
      return _router.navigate(['/login']);
    }
  } else {
    // Handle the case where localStorage is not available
    return _router.navigate(['/login']);
  }
};
