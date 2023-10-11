import {Component, OnInit, Signal, ViewEncapsulation} from '@angular/core';
import {BasketService} from "../../../features/basket/basket.service";
import {debounceTime, distinctUntilChanged, Observable, of, switchMap} from "rxjs";
import {IBasket} from "../../models/basket";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {BasketComponent} from "../../../features/basket/basket/basket.component";
import {Overlay} from "@angular/cdk/overlay";
import {NavigationEnd, Router} from "@angular/router";
import {IUser} from "../../models/user";
import {AccountService} from "../../../features/account/account.service";
import {WishlistService} from "../../../features/wishlist/wishlist.service";
import {IWishlist} from "../../models/customer/wishlist";
import {SearchService} from "../../services/search.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IProduct} from "../../models/product";
import {IPagination} from "../../models/pagination";
import {fastCascade} from "../../../shared/animations/fade-in.animation";
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import {AuthenticationComponent} from "../../../features/account/components/authentication/authentication.component";


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

  currentUser: Signal<IUser>;
  basket$: Observable<IBasket>;
  wishlist$: Observable<IWishlist>;
  products$: Observable<IProduct[]>
  searchResults$: Observable<IPagination>;

  isMenuActive: boolean = false;
  isSearchActive: boolean = false;
  dialogRef: MatDialogRef<BasketComponent>;
  isCheckoutPage: boolean = false;

  searchForm: FormGroup;

  constructor(
    private basketService: BasketService,
    public dialog: MatDialog,
    private overlay: Overlay,
    private router: Router,
    private accountService: AccountService,
    private wishlistService: WishlistService,
    private searchService: SearchService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
    this.currentUser = this.accountService._currentUser.asReadonly();
    this.wishlist$ = this.wishlistService.wishlist$;
    this.products$ = this.wishlistService.products$;
    this.setSearchObservable();
    this.checkIfCheckoutPage();
  }

  exit(): void {

    this.confirmationService.confirm({
    message: 'Are you sure that you want to log out?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',

    accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have logged out' });
        this.logout();
    },

    reject: (type: any) => {
        switch (type) {
            case ConfirmEventType.REJECT:
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
            case ConfirmEventType.CANCEL:
                this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
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
          return this.searchService.search(searchValue);
        }
      })
    );
  }

  openLoginModal() {
    this.dialog.open(AuthenticationComponent, {
      width: '415px',
      height: '600px'
    })
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
    if (!this.isSearchActive) this.searchForm.patchValue({ search: '' });
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
    console.log("toggled");
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.id = 'my-dialog-id';
    dialogConfig.width = '1008px';
    dialogConfig.height = '648px';
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.hasBackdrop = true;
    dialogConfig.disableClose = false
    dialogConfig.restoreFocus = true;
    dialogConfig.closeOnNavigation = true;

    this.dialogRef = this.dialog.open(BasketComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  private checkIfCheckoutPage() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isCheckoutPage = (event.urlAfterRedirects === '/checkout');
      }
    });
  }
}
