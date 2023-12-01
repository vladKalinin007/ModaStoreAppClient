import {Component, OnChanges, OnInit, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../account/account.service";
import {IBasket} from "../../../core/models/basket";
import {BasketService} from "../../basket/basket.service";
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  readonly #userService = inject(UserService);
  readonly #messageService = inject(MessageService);
  readonly #fb = inject(FormBuilder);
  readonly #basketService = inject(BasketService);

  checked = false;
  disabled = false;

  stripe: any;
  cardNumber: any;

  checkoutForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getDeliveryMethodValue();
    this.getAddressFormValues();
  }

  createCheckoutForm() {
    this.checkoutForm = this.#fb.group({
      addressForm: this.#fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        zipcode: [null, Validators.required],
      }),
      deliveryForm: this.#fb.group({
        deliveryMethod: [null, Validators.required]
      }),
      paymentForm: this.#fb.group({
        nameOnCard: [null, Validators.required],
        cardNumber: [null, Validators.required],
        cardExpiry: [null, Validators.required],
        cardCvc: [null, Validators.required]
      })
    });
  }

  getAddressFormValues() {
    this.#userService.getAddress().subscribe({
      next: address => {
        if (address) {
          this.checkoutForm.get('addressForm').patchValue(address);
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getDeliveryMethodValue() {

    const basket: IBasket = this.#basketService.getCurrentBasketValue();

    if (basket.deliveryMethodId !== null) {
      this.checkoutForm
        .get('deliveryForm')
        .get('deliveryMethod')
        .patchValue(basket.deliveryMethodId.toString());
    }
  }

  setStripe(stripe: any): void {
    this.stripe = stripe;
  }

  setCardNumber(cardNumber: any): void {
    this.cardNumber = cardNumber;
  }

}
