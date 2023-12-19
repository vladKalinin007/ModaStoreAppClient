import {Component, OnInit, inject} from '@angular/core';
import {IOrder} from "../../../core/models/order";
import {OrderService} from "../../../shared/services/order-service/order.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  readonly #orderService = inject(OrderService)

  orders$: Observable<IOrder[]>;

  ngOnInit(): void {
    this.#orderService.getUserOrders().subscribe({
      next: (orders: IOrder[]) => {
        this.orders$ = of(orders);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
