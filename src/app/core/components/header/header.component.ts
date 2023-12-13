import {Component, HostListener, OnInit, Signal, ViewEncapsulation, inject} from '@angular/core';
import {BasketService} from "../../../features/basket/basket.service";
import {debounceTime, distinctUntilChanged, filter, Observable, of, switchMap} from "rxjs";
import {IBasket} from "../../models/basket";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BasketComponent} from "../../../features/basket/basket/basket.component";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {IUser} from "../../models/user";
import {WishlistService} from "../../../features/wishlist/wishlist.service";
import {IWishlist} from "../../models/customer/wishlist";
import {SearchService} from "../../services/search.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IProduct} from "../../models/product";
import {IPagination} from "../../models/pagination";
import {fastCascade} from "../../../shared/animations/fade-in.animation";
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import {AuthenticationComponent} from "../../../features/account/components/authentication/authentication.component";
import { UserService } from '../../services/user.service';
import { ShopService } from 'src/app/features/shop/shop.service';
import { AccountService } from 'src/app/features/account/account.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    fastCascade,
  ],
  providers: [ConfirmationService, MessageService],
})
export class HeaderComponent implements OnInit {
  readonly #basketService = inject(BasketService);
  readonly #dialog = inject(MatDialog);
  readonly #router = inject(Router);
  readonly #userService = inject(UserService);
  readonly #wishlistService = inject(WishlistService);
  readonly #searchService = inject(SearchService);
  readonly #formBuilder = inject(FormBuilder);
  readonly #confirmationService = inject(ConfirmationService);
  readonly #messageService = inject(MessageService);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #shopService = inject(ShopService);
  readonly #accountService = inject(AccountService);
  

  currentUser: Signal<IUser>;
  basket$: Observable<IBasket>;
  wishlist$: Observable<IWishlist>; 
  products$: Observable<IProduct[]>
  searchResults$: Observable<IPagination<IProduct>>;

  dialogRef: MatDialogRef<BasketComponent>;

  isMenuActive: boolean = false;
  isSearchActive: boolean = false;
  isCheckoutPage$: Observable<boolean> = of(false);
  isScrolled: boolean = true;
  isModalOpen: boolean = false;
  isOptionsActive$: Observable<boolean>;
  isMenuVisible: boolean = false;
  isAccountVisible: boolean = false;
  isMenuVisible$: Observable<boolean> = of(false);

  prevScrollPos = window.pageYOffset;

  searchForm: FormGroup;

  constructor() {
    this.searchForm = this.#formBuilder.group({
      search: ['']
    });
    this.#userService.toggleLoginFunction = this.toggleLogin.bind(this);
    this.#shopService.toggleSideBarVisibilityFunction = this.setMenuVisibility.bind(this);
    this.#accountService.toggleAccountFunction = this.toggleAccount.bind(this);
    this.subscribeForNavigationEnd();
  }

  ngOnInit() {
    this.basket$ = this.#basketService.basket$;
    this.currentUser = this.#userService.user;
    this.wishlist$ = this.#wishlistService.wishlist$;
    this.products$ = this.#wishlistService.products$;
    this.setSearchObservable();
    this.checkIfCheckoutPage();
    this.checkSearchResults();
    this.checkScreenSize();
  }

  setMenuVisibility() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  subscribeForNavigationEnd() {
    this.#router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkScreenSize();
    });
  }

  checkScreenSize(): void {
    if (window.innerWidth <= 480) {
      this.isMenuVisible = this.#checkForShopRoute() ? true : false;
      this.isAccountVisible = this.#checkForAccountRoute() ? true : false;
    } else {
      this.isMenuVisible = false;
    }
  }

  #checkForShopRoute(): boolean {
    const routeArray = this.#router.url.split('/').filter(part => part);
    const isShopInUrl = routeArray.includes('shop');
    return isShopInUrl && routeArray.length === 2;
  }

  #checkForAccountRoute(): boolean {
    const routeArray = this.#router.url.split('/').filter(part => part);
    return routeArray.includes('account');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkScreenSize();
    this.isMobile();
  }

  exit(): void {
    this.#confirmationService.confirm({
    message: 'Are you sure that you want to log out?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',

    accept: () => {
        this.#messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have logged out' });
        this.logout();
    },

    reject: (type: any) => {
        switch (type) {
            case ConfirmEventType.REJECT:
                this.#messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
            case ConfirmEventType.CANCEL:
                this.#messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }

  setSearchObservable() {
    this.searchResults$ = this.searchForm.get('search').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchValue: string) => {
        if (searchValue.trim() === '') {
          return of({ pageIndex: 0, pageSize: 0, count: 0, data: [] });
        } else {
          return this.#searchService.search(searchValue);
        }
      })
    );
  }

  checkSearchResults() {
  this.searchResults$.subscribe(results => {
    if (results && results.data && results.data.length > 0) {
      this.isModalOpen = true;
    } else {
      this.isModalOpen = false;
    }
  });
  }

  toggleLogin() {
    let dialogWidth = '415px';
    let dialogHeight = '600px';
    let maxWidth = '415px';
    let maxHeight = '600px';
  
    if (window.innerWidth <= 480) {
      dialogWidth = '100%';
      dialogHeight = '100%';
      maxWidth = '100vw';
      maxHeight = '100vh';
    }
  
    this.#dialog.open(AuthenticationComponent, {
      width: dialogWidth,
      height: dialogHeight,
      maxWidth: maxWidth,
      maxHeight: maxHeight,
    });
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
    if (!this.isSearchActive) this.searchForm.patchValue({ search: '' });
    if (!this.isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
    this.isModalOpen = !this.isModalOpen;
  }

  toggleBasket() {
    let dialogWidth = '1008px';
    let dialogHeight = '648px';
    let maxWidth = '1008px';
    let maxHeight = '648px';
  
    if (window.innerWidth <= 480) {
      dialogWidth = '100%';
      dialogHeight = '100%';
      maxWidth = '100vw';
      maxHeight = '100vh';
    }
  
    this.dialogRef = this.#dialog.open(BasketComponent, {
      width: dialogWidth,
      height: dialogHeight,
      maxWidth: maxWidth,
      maxHeight: maxHeight,
    });
  }

  toggleOptions() {
    this.#shopService.toggleSideBarVisibilityFunction();
  }

  toggleAccount() {
    this.#accountService.toggleAccountFunction();
  }

  isMobile(): boolean {
    return window.innerWidth <= 480;
  }

  logout() {
    this.#userService.logoutUser().subscribe({
      next: () => {
        this.#router.navigateByUrl('/');
      },
      error: error => console.log(error)
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScrollEvent($event){
    if (!this.isModalOpen) {
      let currentScrollPos = window.pageYOffset;
      this.isScrolled = this.prevScrollPos > currentScrollPos;
      this.prevScrollPos = currentScrollPos;
    }
  }

  private checkIfCheckoutPage() {
    this.#router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isCheckoutPage$ = of(event.urlAfterRedirects === '/checkout');
        this.isModalOpen = false;
        const urlSegments = event.urlAfterRedirects.split('/');
        if (urlSegments.length === 4 && urlSegments[1] === 'shop') {
          this.searchResults$ = of({ pageIndex: 0, pageSize: 0, count: 0, data: [] });
          this.isSearchActive = false;
          document.body.classList.remove('modal-open');
        }
      }
    });
  }
}
