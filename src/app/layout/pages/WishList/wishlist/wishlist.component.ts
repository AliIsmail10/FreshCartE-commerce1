import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../../../shared/services/wishlist/wishlist.service';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../shared/interfaces/product';
import { CartService } from '../../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent  implements OnInit {
 


  wishlistItems:WritableSignal<Product[]> = signal([]);
  isLoding:boolean=false
  constructor(private _WishlistService:WishlistService ,private _CartService:CartService,private toastr: ToastrService) {}
  ngOnInit(): void {

     this._WishlistService.GetLoggedUserWishlist().subscribe({
      next: (wishList) => {
        this.wishlistItems.set(wishList.data as Product[]);
        console.log('this.wishlistItems :', this.wishlistItems);
      }
     })
  }
  
  
  
  


  addProductToCard(pId:string){
    this.isLoding=true
     this._CartService.AddProducttoCart(pId).subscribe({
       next: (res:any) => {
        
        this.isLoding=false
        this.toastr.success(res.message);
     this._CartService.cartItem.next(res.numOfCartItems);
     
        
      
      }       })
  
    }

    removeFromWishList(pId: string) {
      this._WishlistService.RemoveProductFromWishlist(pId).subscribe({
        next: (res: any) => {
          this.wishlistItems.update(items => items.filter(item => item._id !== pId));
          this.toastr.error(res.message);
        },
        error: (error) => {
          console.error('Error removing product from wishlist: ', error);
        }
      });
    }
    
}
