import { Injectable } from '@angular/core';
import { StripeScriptTag } from "stripe-angular"
import {BasketService} from "../../../features/basket/basket.service";
import {CheckoutService} from "../../../features/checkout/checkout.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
/*import { StripeService, StripeCardComponent } from '@stripe/angular-stripe';*/
import { StripeService, StripeCardComponent } from 'ngx-stripe';



declare var Stripe: any;

@Injectable({
  providedIn: 'root'
})
export class StripePayService {

    stripe: any;
    cardNumber: any;
    cardExpiry: any;
    cardCvc: any;
    cardErrors: any;
    loading: boolean = false;

    value: string;
    isOnlineSelected: boolean = false;
    cardNumberValid: boolean = false;
    cardExpiryValid: boolean = false;
    cardCvcValid: boolean = false;

    cardHandler = this.onChange.bind(this);

    constructor(
      private basketService: BasketService,
      private checkoutService: CheckoutService,
      private toastr: ToastrService,
      private router: Router,
      private stripeService: StripeService
    ) { }

    // ngAfterViewInit(): void {
    //   this.stripe = Stripe('pk_test_51N2dxoAoGAOX0ZrldcpNA9P3tDlCWnSlv1S1dHfEcuqRxdJ6d4td8X0bINRoEOAF1vq99FvWIcQaRqj6NYSA5iZ200jX0tZYRh');
    //   const elements = this.stripe.elements();
    //
    //   this.cardNumber = elements.create('cardNumber');
    //   this.cardNumber.mount(this.cardNumberElement.nativeElement);
    //
    //   this.cardExpiry = elements.create('cardExpiry');
    //   this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    //
    //   this.cardCvc = elements.create('cardCvc');
    //   this.cardCvc.mount(this.cardCvcElement.nativeElement);
    //
    //   this.cardNumber.addEventListener('change', this.cardHandler);
    //   this.cardExpiry.addEventListener('change', this.cardHandler);
    //   this.cardCvc.addEventListener('change', this.cardHandler);
    // }

    onChange({error}) {
      if (error) {
        this.cardErrors = error.message;
      } else {
        this.cardErrors = null;
      }

      switch (error?.elementType) {
        case 'cardNumber':
          this.cardNumberValid = error?.complete || false;
          break;
        case 'cardExpiry':
          this.cardExpiryValid = error?.complete || false;
          break;
        case 'cardCvc':
          this.cardCvcValid = error?.complete || false;
          break;
      }
    }

  /*async pay() {
    const { token, error } = await this.stripeService.createToken(this.card.element, {
      name: 'CUSTOMER_NAME',
      address_line1: 'CUSTOMER_ADDRESS_LINE1',
      address_city: 'CUSTOMER_ADDRESS_CITY',
      address_state: 'CUSTOMER_ADDRESS_STATE',
      address_zip: 'CUSTOMER_ADDRESS_ZIP'
    });

    if (error) {
      // handle error
    } else {
      // send token to server to process payment
    }
  }*/


}
