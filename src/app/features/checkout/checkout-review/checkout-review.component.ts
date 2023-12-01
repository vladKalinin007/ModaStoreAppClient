import {Component, Input, OnInit, inject} from '@angular/core';
import {IBasket} from "../../../core/models/basket";
import {Observable, forkJoin, map, of, switchMap} from "rxjs";
import {BasketService} from "../../basket/basket.service";
import {ToastrService} from "ngx-toastr";
import {FormGroup} from "@angular/forms";
import { ProductService } from 'src/app/core/services/product.service/product.service';
import { IProduct } from 'src/app/core/models/product';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  readonly #basketService = inject(BasketService);
  readonly #productService = inject(ProductService);

  @Input() checkoutForm: FormGroup;
  
  basket$: Observable<IBasket>;
  products$: Observable<IProduct[]>

  ngOnInit(): void {
    this.basket$ = this.#basketService.basket$;
    this.fetchProductsByIds();
  }

  fetchProductsByIds() {
    this.basket$
      .pipe(
        switchMap(basket => 
          forkJoin(
            basket.items.map(item => 
              this.#productService.getProduct(item.id).pipe(
                map(product => ({ ...product, quantity: item.quantity }))
              )
            )
          )
        )
      )
      .subscribe({
        next: products => this.products$ = of(products),
        error: err => console.log(err)
      });
  }

}
