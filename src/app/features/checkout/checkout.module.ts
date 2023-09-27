import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import {CheckoutRoutingModule} from "./checkout-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import {FeaturesModule} from "../features.module";
import { CheckoutUserInfoComponent } from './checkout-user-info/checkout-user-info.component';
import {FormsModule} from "@angular/forms";




@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutAddressComponent,
    CheckoutDeliveryComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    CheckoutSuccessComponent,
    CheckoutUserInfoComponent,
  ],
    imports: [
        FeaturesModule,
        CheckoutRoutingModule,
        FormsModule,
    ]
})
export class CheckoutModule { }
