import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./features/home/home/home.component";
import {TestErrorComponent} from "./core/components/test-error/test-error.component";
import {ServerErrorComponent} from "./core/components/server-error/server-error.component";
import {NotFoundComponent} from "./core/components/not-found/not-found.component";
import {BlogComponent} from "./features/blog/blog/blog.component";
import {ChatComponent} from "./features/chat/chat/chat.component";
import {MemberComponent} from "./features/member/member/member.component";
import {AdminComponent} from "./features/admin/admin/admin.component";
import {WishlistComponent} from "./features/wishlist/wishlist/wishlist.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {breadcrumb: 'Home'}
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: {breadcrumb: 'Admin'}
  },
  {
    path: 'account',
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
    path: 'blog',
    component: BlogComponent,
    data: {breadcrumb: 'Blog'}
  },
  {
    path: 'chat',
    component: ChatComponent,
    data: {breadcrumb: 'Chat'}
  },
  {
    path: 'member',
    component: MemberComponent,
    data: {breadcrumb: 'Member'}
  },
  {
    path: 'checkout',
    /*canActivate: [AuthGuard],*/
    loadChildren: () => import('./features/checkout/checkout.module').then(m => m.CheckoutModule),
    data: {breadcrumb: 'Checkout'}
  },
  {
    path: 'test-error',
    component: TestErrorComponent,
    data: {breadcrumb: 'Test Error'}
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
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

