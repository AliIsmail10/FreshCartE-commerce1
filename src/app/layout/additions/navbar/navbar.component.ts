import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { NgClass, NgIf } from '@angular/common';
import { TranalateService } from '../../../shared/services/translation/translate.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ,NgClass, NgIf,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  [x: string]: any;
  isLogin: boolean = false;
  wishlistCount: number = 0;
  cartNumber!: number;
 lang:boolean = false

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  constructor(private flowbiteService: FlowbiteService,
              private _AuthService: AuthService,
              private _Router: Router,
              private _CartService: CartService,
              private _WishlistService: WishlistService,
              private _TranalateService:TranalateService) {}

  ngOnInit(): void {
    if(typeof localStorage !== 'undefined'){
    this.changeButton()

    } 
    this._AuthService.userData.subscribe(() => {
      this.isLogin = this._AuthService.userData.getValue() !== null;
    });

    this._CartService.GetLoggedUserCart().subscribe({
      next: (res: any) => {
        this._CartService.cartItem.next(res.numOfCartItems);
      }
    });

    this._CartService.cartItem.subscribe((res) => {
      this.cartNumber = res;
    });

    this._WishlistService.wishlistCount$.subscribe((count) => {
      this.wishlistCount = count;
    });

    this.flowbiteService.loadFlowbite(flowbite => {
      
    });
  }

  logout() {
    localStorage.removeItem("userToken");
    this._AuthService.userData.next(null);
    this._Router.navigate(['/login']);
    this.isLogin = false;
  }


  changeLanguage(lang: string): void {
    
  this._TranalateService.changeLanguage(lang)
  this.changeButton()
  }
  changeButton(): void {
     if (typeof  window !== "undefined" && typeof localStorage.getItem("lang") !==null && localStorage.getItem("lang") === "en") {
      this.lang = true;
    } else if(typeof localStorage.getItem("lang") !== "undefined" && localStorage.getItem("lang") === "ar") {
          this.lang = false;
    }
  }
  
}
