import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales/sales.component';
import { HrComponent } from './hr/hr.component';

const routes: Routes = [
  {path:"" ,redirectTo:"sales",pathMatch:"full"},
    {path:"sales" ,component:SalesComponent},
   {path:"hr" ,component:HrComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
