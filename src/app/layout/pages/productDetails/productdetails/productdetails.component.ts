import { Product } from './../../../../shared/interfaces/product';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../../shared/services/products/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [RouterLink,CarouselModule,NgFor],
  templateUrl:'./productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit{
  


  productDetail!:Product
  isLoding: boolean = false
   constructor(private _ProductService:ProductService ,private _ActivatedRoute:ActivatedRoute ,private _CartService:CartService ,private  _toastr:ToastrService){}
  ngOnInit(): void {
   this._ActivatedRoute.paramMap.subscribe((res:any)=>{
      console.log(res.params.id);
      this._ProductService.getDetails(res.params.id).subscribe({
        next:(res)=>{
          console.log(res.data);
          this.productDetail=res.data;    
        },
        error:(err)=>{
          console.error(err);
        }  
      })
   })
  }
    
   productDetails!:Product

   addProductToCard(pId:string){
    this.isLoding=true
     this._CartService.AddProducttoCart(pId).subscribe({
       next: (res:any) => {
        console.log(res);
        this.isLoding=false
        this._toastr.success(res.message);
       },
       error: (error) => {
         console.error('Error adding product to cart: ', error);
         this.isLoding=false;
       }
     })
  }



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
      
    },
    nav: true,
    rtl:true
  }
  

 }
