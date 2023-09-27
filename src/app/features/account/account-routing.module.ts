import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {SettingsComponent} from "./settings/settings.component";
import {OrdersComponent} from "./orders/orders.component";
import {WalletComponent} from "./wallet/wallet.component";
import {ReviewsComponent} from "./reviews/reviews.component";
import {UserInfoComponent} from "./user-info/user-info.component";
import {AccountComponent} from "./account/account.component";
import {SeenComponent} from "./seen/seen.component";

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'user-information',
        component: UserInfoComponent
      },
      {
        path: 'seen',
        component: SeenComponent
      },
      {
        path: 'reviews',
        component: ReviewsComponent
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
