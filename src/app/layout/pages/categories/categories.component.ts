import { Component } from '@angular/core';
import { CategoriesService } from '../../../shared/services/Categories/categories.service';
import { Categories } from '../../../shared/interfaces/categories';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  allCategories:Categories[]=[];
  cartItems!: Cart;

  cartItemsCount: string = '';

  constructor(private _CategoriesService:CategoriesService ,private _CartService:CartService){}
  ngOnInit(): void {
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem("currentPage",'/categories')
    }

    this._CategoriesService.getAllCategories().subscribe({
      next:(res:any)=>{
       
       
        this.allCategories = res.data;
        this._CartService.GetLoggedUserCart().subscribe({
          next: (cart) => {
            this.cartItems = cart;
            
          }
        })
      }
    })
   }
  
  
}
