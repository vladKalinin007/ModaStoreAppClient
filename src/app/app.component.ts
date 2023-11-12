import {Component, OnInit, inject} from '@angular/core';
import {BasketService} from "./features/basket/basket.service";
import {AccountService} from "./features/account/account.service";
import {MenuItem} from "primeng/api";
import {NavigationEnd, Router} from "@angular/router";
import {WishlistService} from "./features/wishlist/wishlist.service";
import {HistoryService} from "./shared/services/history.service";
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  readonly #basketService: BasketService = inject(BasketService);
  readonly #accountService: AccountService = inject(AccountService);
  readonly #wishlistService: WishlistService = inject(WishlistService);
  readonly #historyService: HistoryService = inject(HistoryService);
  readonly #router: Router = inject(Router);
  readonly #storageService: StorageService = inject(StorageService);

  items: MenuItem[];
  showNavigationBar: boolean = true;

  title: string = 'Moda';

  constructor() { }

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
    this.loadWishlist();
    this.updateComponentVisibility();
    this.loadProductViewsHistory();
  }

  updateComponentVisibility() {
    this.#router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;

        this.showNavigationBar = !(currentRoute === '/checkout');

      }
    });
  }

  loadCurrentUser(): void {
    const token: string = this.#storageService.getItem('token');

    if (token) {
      this.#accountService.loadCurrentUser(token).subscribe({
        next: () => console.log('initialized user'),
        error: error => console.log("user is not initialized: ", error)
      })
    }
  }

  loadBasket(): void {
    const basketId: string = this.#storageService.getItem('basket_id');

    if (basketId) {
      this.#basketService.getBasket(basketId).subscribe({
        next: () => console.log('initialized basket'),
        error: error => console.log(error)
      })
    }
  }

  loadWishlist(): void {
    const wishlistId: string = this.#storageService.getItem('wishlist_id');

    if (wishlistId) {
      this.#wishlistService.getWishlist(wishlistId).subscribe({
        next: () => console.log('initialized wishlist'),
        error: error => console.log('LoadWishlistError: ', error)
      })
    }
  }

  loadProductViewsHistory(): void {

    const views_history_id: string = this.#storageService.getItem('views_history_id');

    if (views_history_id) {

      this.#historyService.getItemsFromProductsViewsHistory().subscribe({
        next: () => console.log('initialized history'),
        error: error => console.log(error)
      })

    }
  }
  }

