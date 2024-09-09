import { Injectable } from '@angular/core';
import { ProductService } from '../../../shared/services/products/product.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { WritableSignal, signal } from '@angular/core';
import { Product } from '../../../shared/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  productList: WritableSignal<Product[]> = signal([]);
  isLoding: boolean = false;
  wishlistProductIds: string[] = [];

  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _WishlistService: WishlistService,
  ) {}

  fetchProducts(searchTerm: string = '') {
    return this._ProductService.getAllProducts().subscribe({
      next: (products: any) => {
        this.productList.set(products.data);
      },
      error: (error) => {
        console.error('Error fetching products: ', error);
      },
    });
  }

  addProductToCart(productId: string) {
    this.isLoding = true;
    return this._CartService.AddProducttoCart(productId).subscribe({
      next: (res: any) => {
        this.isLoding = false;
        this._CartService.cartItem.next(res.numOfCartItems);
      },
      error: (error) => {
        this.isLoding = false;
        console.error('Error adding product to cart: ', error);
      },
    });
  }

  fetchWishlist() {
    return this._WishlistService.GetLoggedUserWishlist().subscribe({
      next: (wishList) => {
        this.wishlistProductIds = wishList.data.map((item: any) => item.id);
      },
      error: (error) => {
        console.error('Error fetching wishlist: ', error);
      },
    });
  }

  toggleWishlist(productId: string) {
    const isInWishlist = this.isProductInWishlist(productId);
    if (isInWishlist) {
      this.removeFromWishlist(productId);
    } else {
      this.addToWishlist(productId);
    }
  }

  isProductInWishlist(productId: string): boolean {
    return this.wishlistProductIds.includes(productId);
  }

  // Add product to the wishlist
  private addToWishlist(productId: string) {
    return this._WishlistService.AddProductToWishlist(productId).subscribe({
      next: (res: any) => {
        this.wishlistProductIds.push(productId);
      },
      error: (error) => {
        console.error('Error adding product to wishlist: ', error);
      },
    });
  }

  private removeFromWishlist(productId: string) {
    return this._WishlistService.RemoveProductFromWishlist(productId).subscribe({
      next: (res: any) => {
        this.wishlistProductIds = this.wishlistProductIds.filter(id => id !== productId);
      },
      error: (error) => {
        console.error('Error removing product from wishlist: ', error);
      },
    });
  }
}
