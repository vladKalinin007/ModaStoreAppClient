import { Injectable, inject } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IDeliveryMethod} from "../../core/models/deliveryMethod";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {IOrderToCreate} from "../../core/models/order";
import { BasketService } from '../basket/basket.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  readonly #basketService: BasketService = inject(BasketService);
  readonly #httpClient: HttpClient = inject(HttpClient);

  baseUrl: string = environment.apiUrl;

  createOrder(order: IOrderToCreate) {
    const basketId = this.#basketService.getCurrentBasketValue().id;
    return this.#httpClient.post(this.baseUrl + 'order/' + basketId, {});
  }

  getDeliveryMethods(): Observable<IDeliveryMethod[]> {
    return this.#httpClient.get(this.baseUrl + 'Order/deliveryMethods').pipe(
      map((dm: IDeliveryMethod[]) => {
        return dm.sort((a, b) => b.price - a.price);
      }
    ));
  }
}
