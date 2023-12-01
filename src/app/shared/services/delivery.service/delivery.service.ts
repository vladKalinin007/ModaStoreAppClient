import { Injectable } from '@angular/core';
import {IDeliveryMethod} from "../../../core/models/deliveryMethod";
import {IBasket} from "../../../core/models/basket";
import {BasketService} from "../../../features/basket/basket.service";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  baseUrl: string = environment.apiUrl;

  public shipping: number = 0;
  private shippingSource: Subject<number> = new Subject<number>();
  public shipping$ = this.shippingSource.asObservable();
  deliveryMethodId: string;

  constructor(
    private basketService: BasketService,
    private httpClient: HttpClient,
  ) { }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.deliveryMethodId = deliveryMethod.id;
    this.shipping = deliveryMethod.price;
    this.shippingSource.next(this.shipping);
    const basket: IBasket = this.basketService.getCurrentBasketValue();
    basket.deliveryMethodId = deliveryMethod.id;
    basket.shippingPrice = deliveryMethod.price;
    this.basketService.calculateTotals();
    this.basketService.setBasket(basket);
  }

  getDeliveryMethods(): Observable<IDeliveryMethod[]> {
    return this.httpClient.get(this.baseUrl + 'deliveryMethods').pipe(
      map((dm: IDeliveryMethod[]) => {
          return dm.sort((a, b) => b.price - a.price);
        }
      ));
  }
}
