import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor,NgIf,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {


  cartItems!: Cart;
  cartItemsCount: string = '';
  constructor(private _CartService:CartService ,private toastr: ToastrService,private  _Router:Router ){ }
  ngOnInit(): void {
    const token = localStorage.getItem('userToken');
    if (!token) {
      this.toastr.error('User not logged in');
      this._Router.navigate(['/login']);  // Redirect to login if no token
      return;

    }
  
    localStorage.setItem("currentPage",'/cart');
    this.loadCart();
  }
  
  loadCart(): void {
    this._CartService.GetLoggedUserCart().subscribe({
      next: (cart) => {
        this.cartItems = cart;
        
      }
    });
  }
  
   udateQuantity(cartId:string, quantity:number){
    this._CartService.UpdateCartProductQuantity(cartId,quantity).subscribe({
      next: (cart) => {
        this.cartItems = cart;
        this.toastr.success('Quantity updated successfully');
      }
    })
   }
  
   RemoveSpecificCartItem(cartId:string){
    this._CartService.RemoveSpecificCartItem(cartId).subscribe({
      next: (cart) => {
        this.cartItems = cart;
        
        this.toastr.error('Item removed from cart successfully');
        this._CartService.cartItem.next(cart.numOfCartItems)
      }
    })
   }

   resetCart(){
    this._CartService.ClearUserCart().subscribe({
      next: (cart) => {
        this.cartItems = cart;
        
        this.toastr.error('Cart reset successfully');
        this._CartService.cartItem.next(0)
      }
    })
   }
}
