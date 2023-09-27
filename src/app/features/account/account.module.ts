import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AccountRoutingModule} from "./account-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { SettingsComponent } from './settings/settings.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { WalletComponent } from './wallet/wallet.component';
import { OrdersComponent } from './orders/orders.component';
import {FeaturesModule} from "../features.module";
import { AccountComponent } from './account/account.component';
import { UserInfoComponent } from './user-info/user-info.component';
import {MatSliderModule} from "@angular/material/slider";
import {MaterialModule} from "../../../material.module";
import { SeenComponent } from './seen/seen.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    ReviewsComponent,
    WalletComponent,
    OrdersComponent,
    AccountComponent,
    UserInfoComponent,
    SeenComponent,
    AuthenticationComponent,
  ],
  imports: [
    FeaturesModule,
    /*CommonModule,*/
    AccountRoutingModule,
    MatSliderModule,
    MaterialModule,
    /*SharedModule*/
  ]
})
export class AccountModule { }
