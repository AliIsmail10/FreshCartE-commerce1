import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './layout/pages/login/login.component';
import { ForgetPasswordComponent } from './layout/additions/forget-password/forget-password.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


export const routes: Routes = [
    {path: '', redirectTo: 'register', pathMatch: 'full'},
    {path: 'home', loadComponent:()=>import('./layout/pages/home/home.component').then(m=>m.HomeComponent) ,canActivate:[authGuard],title: 'Home'},
    {path: 'brands', loadComponent:()=>import('./layout/pages/brands/brands.component').then(m=>m.BrandsComponent) ,canActivate:[authGuard],title: 'Brands'},
    {path: 'cart', loadComponent:()=>import('./layout/pages/cart/cart.component').then(m=>m.CartComponent) ,canActivate:[authGuard],title: 'Cart'},
    {path: 'categories', loadComponent:()=>import('./layout/pages/categories/categories.component').then(m=>m.CategoriesComponent) ,canActivate:[authGuard],title: 'Categories'},
    {path: 'register',component:RegisterComponent,title: 'Register'},
    {path: 'forgetpassword' ,component:ForgetPasswordComponent,title: 'Forget Password'},
    {path: 'login' ,component:LoginComponent,title: 'Login'},
    {path: 'products', loadComponent:()=>import('./layout/pages/products/products.component').then(m=>m.ProductsComponent) ,canActivate:[authGuard],title: 'Products'},
    {path: 'wishlist', loadComponent:()=>import('./layout/pages/WishList/wishlist/wishlist.component').then(m=>m.WishlistComponent) ,canActivate:[authGuard],title: 'Products'},
    {path: 'productdetails/:id', loadComponent:()=>import('./layout/pages/productDetails/productdetails/productdetails.component').then(m=>m.ProductdetailsComponent) ,canActivate:[authGuard],title:'Products Details'},
    {path: 'checkout/:Cid', loadComponent:()=>import('./layout/additions/checkout/checkout.component').then(m=>m.CheckoutComponent) ,canActivate:[authGuard],title:'Checkout Details'},
    {path: 'GetSpecificBrand/:Bid', loadComponent:()=>import('./layout/pages/detailsBrand/details-brands/details-brands.component').then(m=>m.DetailsBrandsComponent) ,canActivate:[authGuard],title:'Brand Details'},
    {path: 'GetSpecificsCategory/:id', loadComponent:()=>import('./layout/pages/specificCategory/specific-category/specific-category.component').then(m=>m.SpecificCategoryComponent) ,canActivate:[authGuard],title:'specific category'},


    {path: 'settings', loadChildren :()=> import('../app/setting/setting.module').then((c)=>c.SettingModule)},

    {path: '**', loadComponent:()=>import('./layout/additions/not-found/not-found.component').then(m=>m.NotFoundComponent) ,canActivate:[authGuard],title: 'Not Found'}, 

    
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
  })
  export class AppRoutingModule { }