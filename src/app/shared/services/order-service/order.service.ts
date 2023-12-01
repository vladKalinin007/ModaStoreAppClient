import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IBasket } from 'src/app/core/models/basket';
import { Order, OrderToCreate } from 'src/app/core/models/order';
import { environment } from 'src/environments/environment';
import { IOrder } from 'src/app/core/models/order';
import { Observable } from 'rxjs';
import { IOrderToCreate } from 'src/app/core/models/order';
import { BasketService } from 'src/app/features/basket/basket.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly #httpClient: HttpClient = inject(HttpClient);
  readonly #basketService: BasketService = inject(BasketService);

  url: string = environment.apiUrl;

  getUserOrders() {
    return this.#httpClient.get<IOrder[]>(this.url + 'orders', {withCredentials: true});
  }

  addUserOrder() {
    const basketId = this.#basketService.getCurrentBasketValue().id;
    const URL = this.url + 'order/' + basketId;
    return this.#httpClient.post(URL, {}, {withCredentials: true});
  }


}
