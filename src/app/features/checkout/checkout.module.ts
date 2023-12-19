import { NgModule } from '@angular/core';
import { CheckoutComponent } from './checkout/checkout.component';
import {CheckoutRoutingModule} from "./checkout-routing.module";
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import {FeaturesModule} from "../features.module";
import { CheckoutUserInfoComponent } from './checkout-user-info/checkout-user-info.component';
import {FormsModule} from "@angular/forms";
import { MessageService } from 'primeng/api';




@NgModule({
  declarations: [
    CheckoutComponent,
    CheckoutDeliveryComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    CheckoutUserInfoComponent,
  ],
  providers: [
    MessageService
  ],
    imports: [
        FeaturesModule,
        CheckoutRoutingModule,
        FormsModule,
    ]
})
export class CheckoutModule { }
