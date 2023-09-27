import {Component, OnChanges, OnInit} from '@angular/core';
import {Observable} from "rxjs";
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
import { DeliveryService } from 'src/app/shared/services/delivery.service/delivery.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class OrderTotalsComponent implements OnInit, OnChanges {

    @Input() checkoutForm: FormGroup;
    @Input() stripe: any;
    @Input() cardNumber: any;
    @Input() deliveryMethodId: any;

    basketTotal$: Observable<IBasketTotals> = this.basketService.basketTotal$;
    shippingPrice$: Observable<number> = this.basketService.shipping$;


    constructor(
      private basketService: BasketService,
      private formBuilder: FormBuilder,
      private checkoutService: CheckoutService,
      private toastr: ToastrService,
      private router: Router,
      private confirmationService: ConfirmationService,
      private messageService: MessageService,
      private orderService: OrderService,
      private deliveryService: DeliveryService
    ) {}


    ngOnInit(): void {
      this.basketTotal$ = this.basketService.basketTotal$;
      this.shippingPrice$ = this.basketService.shipping$;
    }

    ngOnChanges(): void {
      console.log("OnChanges.Stripe: ", this.stripe);
      console.log("OnChanges.CardNumber: ", this.cardNumber);
      console.log("OnChanges.CheckoutForm: ", this.checkoutForm);
    }

    submitOrder() {

      const orderToCreate = new OrderToCreate(
        this.basketService.getCurrentBasketValue().id,
        this.deliveryService.deliveryMethodId,
        this.checkoutForm.get('addressForm').value
      )

      this.orderService.addUserOrder(orderToCreate).subscribe({
        next: (response: any) => {
          console.log(response);
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
          console.log(error);
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
        console.error(error);
        this.messageService.add(
        {
          severity: 'warn',
          summary: 'Error',
          detail: 'Order placement failed'
        }
        );
      }
    }

    private async createOrder(basket: IBasket) {
      const orderToCreate: IOrderToCreate = this.getOrderToCreate(basket);
      return this.checkoutService.createOrder(orderToCreate);
    }

    // Don't forget to link to upper component (checkout.component.ts)
    private getOrderToCreate(basket: IBasket) {
      return {
        basketId: basket.id,
        deliveryMethodId: this.checkoutForm.get('deliveryForm').get('deliveryMethod').value,
        shipToAddress: this.checkoutForm.get('addressForm').value
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
