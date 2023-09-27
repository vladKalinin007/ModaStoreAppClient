import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBasket } from 'src/app/core/models/basket';
import { Order, OrderToCreate } from 'src/app/core/models/order';
import { environment } from 'src/environments/environment';
import { IOrder } from 'src/app/core/models/order';
import { Observable } from 'rxjs';
import { IOrderToCreate } from 'src/app/core/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url: string = environment.apiUrl + 'Order';

  constructor(
    private http: HttpClient,
    ) { }

  getUserOrders() {
    return this.http.get<IOrder[]>(this.url);
  }

  addUserOrder(order: IOrderToCreate): Observable<IOrderToCreate> {

    return this.http.post<IOrderToCreate>(this.url, order);
  }


}
