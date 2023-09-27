import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IDeliveryMethod} from "../../core/models/deliveryMethod";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {IOrderToCreate} from "../../core/models/order";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  createOrder(order: IOrderToCreate) {
    return this.httpClient.post(this.baseUrl + 'order', order);
  }

  getDeliveryMethods(): Observable<IDeliveryMethod[]> {
    return this.httpClient.get(this.baseUrl + 'Order/deliveryMethods').pipe(
      map((dm: IDeliveryMethod[]) => {
        return dm.sort((a, b) => b.price - a.price);
      }
    ));
  }
}
