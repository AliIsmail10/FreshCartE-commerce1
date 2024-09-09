import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { HrComponent } from './hr/hr.component';
import { SalesComponent } from './sales/sales.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HrComponent,
    SalesComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule,

  ]
})
export class SettingModule { }
