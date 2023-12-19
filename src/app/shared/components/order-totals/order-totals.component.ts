import {Component, OnChanges, OnInit} from '@angular/core';
import {Observable, map} from "rxjs";
import {IBasketTotals} from "../../../core/models/basket";
import {BasketService} from "../../../features/basket/basket.service";
import {FormBuilder} from "@angular/forms";
import {CheckoutService} from "../../../features/checkout/checkout.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import { NavigationExtras } from '@angular/router';
import { IBasket } from 'src/app/core/models/basket';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { IOrderToCreate } from 'src/app/core/models/order';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrderService } from 'src/app/shared/services/order-service/order.service';
import { OrderToCreate } from 'src/app/core/models/order';
import { DeliveryService } from 'src/app/shared/services/delivery-service/delivery.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class OrderTotalsComponent implements OnInit {

    @Input() checkoutForm: FormGroup;
    @Input() stripe: any;
    @Input() cardNumber: any;
    @Input() deliveryMethodId: any;

    basketTotal$: Observable<IBasketTotals>;
    shippingPrice$: Observable<number>;
    itemQuantity$: Observable<number>;


    constructor(
      private basketService: BasketService,
      private toastr: ToastrService,
      private router: Router,
      private messageService: MessageService,
      private orderService: OrderService,
    ) {}


    ngOnInit(): void {
      this.basketTotal$ = this.basketService.basketTotal$;
      this.shippingPrice$ = this.basketService.shipping$;
      this.calculateItemQuantity();
    }

    calculateItemQuantity() {
      this.itemQuantity$ = this.basketService.basket$.pipe(
        map((basket: IBasket) => {
          return basket.items.length;
        })
      );
    }

    submitOrder() {
      this.orderService.addUserOrder().subscribe({
        next: (response: any) => {
          this.messageService.add(
            {
              severity: 'success',
              summary: 'Success',
              detail: 'Order has been created'
            }
          );
          this.confirmPayment(this.basketService.getCurrentBasketValue());
        },
        error: (error: any) => {
          this.messageService.add(
            {
              severity: 'warn',
              summary: 'Error',
              detail: 'Order placement failed'
            }
          );
        }

      });

    }


    async confirmPayment(basket: IBasket) {
      try {
        const paymentResult = await this.confirmPaymentWithStripe(basket);

        if (paymentResult.paymentIntent) {

          this.messageService.add(
            {
              severity: 'success',
              summary: 'Success',
              detail: 'Order has been created'
            }
          );

          this.basketService.deleteBasket(basket);
          this.router.navigate(['/account/orders']);

        } else {
          this.toastr.error(paymentResult.error.message);
        }
      } catch (error) {
        this.messageService.add(
        {
          severity: 'warn',
          summary: 'Error',
          detail: 'Order placement failed'
        }
        );
      }
    }

    private async confirmPaymentWithStripe(basket: IBasket) {
      return this.stripe.confirmCardPayment(basket.clientSecret, {
        payment_method: {
          card: this.cardNumber,
          billing_details: {
            name: this.checkoutForm.get('paymentForm').get('nameOnCard').value
          }
        }
      });
    }
}
