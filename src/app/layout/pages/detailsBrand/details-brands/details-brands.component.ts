import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../../shared/services/brands/brands.service';
import { Brands } from '../../../../shared/interfaces/brands';

@Component({
  selector: 'app-details-brands',
  standalone: true,
  imports: [],
  templateUrl: './details-brands.component.html',
  styleUrl: './details-brands.component.scss'
})
export class DetailsBrandsComponent implements OnInit {

   DetailsBrands!:Brands;

   constructor(private _BrandsService:BrandsService , private ActivatedRoute:ActivatedRoute){}
  
   ngOnInit(): void {
  
     this.ActivatedRoute.paramMap.subscribe((res:any)=> {
     
     
     this._BrandsService.GetSpecificBrand(res.params.Bid).subscribe({
      next:(res :any)=>{
        this.DetailsBrands=res.data;

        
      },
      error:(err:any)=>{
        
      }
     })
    });
   }

  
}
