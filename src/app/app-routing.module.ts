import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./features/home/home/home.component";
import {ServerErrorComponent} from "./core/components/server-error/server-error.component";
import {NotFoundComponent} from "./core/components/not-found/not-found.component";
import {WishlistComponent} from "./features/wishlist/wishlist/wishlist.component";
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {breadcrumb: 'Home'}
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/account/account.module')
      .then(m => m.AccountModule)
  },
  {
    path: 'shop/:categoryName',
    loadChildren: () => import('./features/shop/shop.module')
      .then(m => m.ShopModule),
    data: {breadcrumb: 'Shop'}
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    data: {breadcrumb: 'Wishlist'}
  },
  {
    path: 'basket',
    loadChildren: () => import('./features/basket/basket.module').then(m => m.BasketModule),
    data: {breadcrumb: 'Basket'}
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./features/wishlist/wishlist.module').then(m => m.WishlistModule),
    data: {breadcrumb: 'Wishlist'}
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/checkout/checkout.module').then(m => m.CheckoutModule),
    data: {breadcrumb: 'Checkout'}
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
    data : {breadcrumb: 'Server Error'}
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {breadcrumb: 'Not Found'}
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

