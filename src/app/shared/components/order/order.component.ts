import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { IOrder } from 'src/app/core/models/order';
import { IProduct } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service/product.service';
import { SharedModule } from '../../shared.module';
import { IAddress } from 'src/app/core/models/address';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    SharedModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnChanges {
  readonly #productService = inject(ProductService)

  @Input({required: true})
  order: IOrder;

  products$: Observable<IProduct[]>;
  address$: Observable<IAddress>;
  deliveryMethod$: Observable<string>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.order && changes.order.currentValue) {
      this.products$ = this.getOrderedProducts(changes.order.currentValue);
    }
  }

  getOrderedProducts(order: IOrder): Observable<IProduct[]> {
    return forkJoin(
      order.orderItems.map(orderItem => 
        this.#productService.getProduct(orderItem.itemOrdered_ProductItemId).pipe(
          map(product => ({ ...product, quantity: orderItem.quantity }))
        )
      )
    );
  }

}
