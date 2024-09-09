import { Component } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { Brands } from '../../../shared/interfaces/brands';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  constructor(private _BrandsService:BrandsService,private _CartService:CartService ) { }
  allBrands:Brands[]=[];
  
  cartItems!: Cart;

  cartItemsCount: string = '';
  
  ngOnInit(): void {
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem("currentPage",'/brands')
    }


    this._BrandsService.getAllBrands().subscribe({
      next:(res:any)=>{
       
       
        this.allBrands = res.data;
        this._CartService.GetLoggedUserCart().subscribe({
          next: (cart) => {
            this.cartItems = cart;
            
          },
          error: (error) => {
            
          }
        })
      },
      error:(err)=>{

        
      }
    })
   }
   GetSpecificBrand(bId:string){
     this._BrandsService.GetSpecificBrand(bId).subscribe({
       next: (res) => {
         
       },
       error: (error) => {
         
       }
     })
   }  
}
