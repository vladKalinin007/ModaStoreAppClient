import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CheckoutService} from "../checkout.service";
import {IDeliveryMethod} from "../../../core/models/deliveryMethod";
import {BasketService} from "../../basket/basket.service";
import {ICity} from "../../../core/models/city";
import {DeliveryService} from "../../../shared/services/delivery-service/delivery.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss'],
  providers: [MessageService]
})
export class CheckoutDeliveryComponent implements OnInit {

  @Input() checkoutForm: FormGroup;

  deliveryMethods: IDeliveryMethod[];
  selectedDeliveryMethod: IDeliveryMethod;
  selectedDeliveryPrice: number;

  cities: ICity[];
  selectedCity: ICity;
  isPostalDeliverySelected: boolean = false;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  isOnlineSelected: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private checkoutService: CheckoutService,
    private basketService: BasketService,
    private deliveryService: DeliveryService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getDeliveryMethods();
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  radioButtonChange(event: any) {
    this.isOnlineSelected = event.source.value === "2";
  }

  getDeliveryMethods() {
    this.deliveryService.getDeliveryMethods()
      .subscribe( {
      next: (dm: IDeliveryMethod[]) => {
        this.deliveryMethods = dm;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
      }
    });
  }

  onSelectionChange(selectedValue: IDeliveryMethod) {
    console.log(selectedValue)
    this.setShippingPrice(selectedValue);
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
    this.deliveryService.setShippingPrice(deliveryMethod);
  }


}
