import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../shared/services/Categories/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Categories } from '../../../../shared/interfaces/categories';

@Component({
  selector: 'app-specific-category',
  standalone: true,
  imports: [],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.scss'
})
export class SpecificCategoryComponent  implements OnInit{
  GetSpecificsCategory!:Categories
  constructor(private _CategoriesService:CategoriesService,private _ActivatedRoute:ActivatedRoute){

  }
  ngOnInit(): void {
   this._ActivatedRoute.paramMap.subscribe((res:any)=>{

    console.log(' GetSpecificsCategory:',res.params.id );
    this._CategoriesService.GetSpecificCategory(res.params.id).subscribe({
      next:(res:any)=>{
    this.GetSpecificsCategory=res.data;
    console.log('GetSpecificsCategory:',this.GetSpecificsCategory);
      },

      error:(error:any)=>{
        console.log('Error:',error);
      }
    })
     
   })
    
  }
}
