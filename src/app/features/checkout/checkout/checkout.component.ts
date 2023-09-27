import {Component, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../account/account.service";
import {IBasket} from "../../../core/models/basket";
import {BasketService} from "../../basket/basket.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnChanges {

  checked = false;
  disabled = false;

  stripe: any;
  cardNumber: any;

  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private basketService: BasketService
              ) {}

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getDeliveryMethodValue();
    this.getAddressFormValues();
  }

  ngOnChanges(): void {
    console.log('this.checkoutForm', this.checkoutForm);
    console.log('this.stripe', this.stripe);
    console.log('this.cardNumber', this.cardNumber);
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required]
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required],
        cardNumber: [null, Validators.required],
        cardExpiry: [null, Validators.required],
        cardCvc: [null, Validators.required]
      })
    });
  }

  getAddressFormValues() {
    this.accountService
      .getUserAddress()
      .subscribe({
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

    const basket: IBasket = this.basketService.getCurrentBasketValue();

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
