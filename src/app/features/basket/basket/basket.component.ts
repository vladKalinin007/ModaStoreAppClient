import {Component, OnInit, inject} from '@angular/core';
import {Observable} from "rxjs";
import {IBasket, IBasketItem, IBasketTotals} from "../../../core/models/basket";
import {BasketService} from "../basket.service";
import {MatDialogRef} from "@angular/material/dialog";
import {WishlistService} from "../../wishlist/wishlist.service";
import {IWishlist} from "../../../core/models/customer/wishlist";
import {cascade, fadeIn} from "../../../shared/animations/fade-in.animation";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  readonly #basketService: BasketService = inject(BasketService);
  readonly #wishlistService: WishlistService = inject(WishlistService);
  readonly #dialogRef: MatDialogRef<BasketComponent> = inject(MatDialogRef);

  basket$: Observable<IBasket>;
  wishlist$: Observable<IWishlist>;
  basketTotal$: Observable<IBasketTotals> = this.#basketService.basketTotal$;
  basketItemsCount: number;
  count$: Observable<number>;

  constructor() {}

  ngOnInit(): void {
    this.basket$ = this.#basketService.basket$;
    this.wishlist$ = this.#wishlistService.wishlist$;
    this.calculateBasketItems();
    console.log(this.basket$);
  }

  calculateBasketItems() {
    this.basketItemsCount = this.#basketService.countBasketItems()
  }

  closeDialog(): void {
    this.#dialogRef.close();
  }

  removeBasketItem(item: IBasketItem): void {
    this.#basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item: IBasketItem): void {
    this.#basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: IBasketItem): void {
    this.#basketService.decrementItemQuantity(item);
  }

}
