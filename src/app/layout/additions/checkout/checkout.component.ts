import {   Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../../shared/services/checkout/checkout.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent   implements OnInit {

  
  cartId:string=""

  isLoading:boolean=false
  constructor(private _CheckoutService:CheckoutService , private _ActivatedRoute:ActivatedRoute){}
 
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe((res:any)=>{
        this.cartId=res.params.Cid;         
      })
  
  }
  cartFrom:FormGroup=new FormGroup({
    details:new FormControl(null,[Validators.required]),
    city:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  })


  payment(){
    this.isLoading=true;
   this._CheckoutService.CreateCashOrder(this.cartId ,this.cartFrom.value).subscribe({
    next:(res:any)=>{

    window.open(res.session.url,"_self");
    this.isLoading=false;
    },
    error:(err:any)=>{
      console.log('payment failed',err);
      this.isLoading=false;
    }
   })
 
  }

}
