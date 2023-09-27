import {Component, OnInit} from '@angular/core';
import {BasketService} from "./features/basket/basket.service";
import {AccountService} from "./features/account/account.service";
import {MenuItem} from "primeng/api";
import {NavigationEnd, Router} from "@angular/router";
import {WishlistService} from "./features/wishlist/wishlist.service";
import {HistoryService} from "./shared/services/history.service";
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AppComponent implements OnInit {

  items: MenuItem[];
  showNavigationBar: boolean = true;

  title: string = 'Moda';

  constructor(
    private basketService: BasketService,
    private accountService: AccountService,
    private wishlistService: WishlistService,
    private historyService: HistoryService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
    this.loadWishlist();
    this.addItemsToSpeedDial();
    this.updateComponentVisibility();
    this.loadProductViewsHistory();
  }

  updateComponentVisibility() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;

        this.showNavigationBar = !(currentRoute === '/checkout');

      }
    });
  }

  addItemsToSpeedDial() {
    this.items = [
      {
        icon: 'pi pi-facebook',
        command: () => {
          this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
        }
      },
      {
        icon: 'pi pi-linkedin',
        command: () => {
          this.messageService.add({ severity: 'info', summary: 'Delete', detail: 'Data Deleted' });
        }
      },
      {
        icon: 'pi pi-telegram',
        command: () => {
          this.messageService.add({ severity: 'info', summary: 'Help', detail: 'Data Updated' });
        }
      },
      {
        icon: 'pi pi-whatsapp',
        command: () => {
          this.messageService.add({ severity: 'info', summary: 'Search', detail: 'Data Searched' });
        }
      },
      {
        icon: 'pi pi-instagram',
        command: () => {
          this.messageService.add({ severity: 'info', summary: 'Save', detail: 'Data Saved' });
        }
      }
    ];
  }

  loadCurrentUser(): void {
    const token: string = localStorage.getItem('token');

    if (token) {
      this.accountService.loadCurrentUser(token).subscribe({
        next: () => console.log('initialized user'),
        error: error => console.log("user is not initialized: ", error)
      })
    }
  }

  loadBasket(): void {
    console.log("BASKET TEST. app.loadBasket() called");
    const basketId: string = localStorage.getItem('basket_id');

    if (basketId) {
      this.basketService.getBasket(basketId).subscribe({
        next: () => console.log('initialized basket'),
        error: error => console.log(error)
      })
    }
  }

  loadWishlist(): void {
    const wishlistId: string = localStorage.getItem('wishlist_id');

    if (wishlistId) {
      this.wishlistService.getWishlist(wishlistId).subscribe({
        next: () => console.log('initialized wishlist'),
        error: error => console.log('LoadWishlistError: ', error)
      })
    }
  }

  loadProductViewsHistory(): void {

    const views_history_id: string = localStorage.getItem('views_history_id');

    if (views_history_id) {

      this.historyService.getItemsFromProductsViewsHistory().subscribe({
        next: () => console.log('initialized history'),
        error: error => console.log(error)
      })

    }
  }
  }

