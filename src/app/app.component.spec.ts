import { ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { TestBed } from "@angular/core/testing";
import { BasketService } from "./features/basket/basket.service";
import { StorageService } from "./core/services/storage-service/storage.service";
import { HistoryService } from "./shared/services/history-service/history.service";
import { WishlistService } from "./features/wishlist/wishlist.service";
import { NavigationEnd, Router } from "@angular/router";
import { UserService } from "./shared/services/user-service/user.service";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { productMock } from "./shared/mocks/product.mock";
import { IUser } from "./core/models/user";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NavigationBarComponent } from "./shared/components/navigation-bar/navigation-bar.component";
import { HeaderComponent } from "./core/components/header/header.component";
import { SectionHeaderComponent } from "./core/components/section-header/section-header.component";
import { FooterComponent } from "./core/components/footer/footer.component";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ AppComponent, NavigationBarComponent, HeaderComponent, SectionHeaderComponent, FooterComponent ],
        providers: [ BasketService, UserService, WishlistService, HistoryService, Router, StorageService ],
        imports: [ RouterTestingModule, HttpClientTestingModule, SharedModule, CoreModule, BrowserAnimationsModule ]
      })
      .compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load current user', () => {
        const mockUser: IUser = { id: '1', email: 'email@email.com', phone: '12345', displayName: 'test', token: 'abdc112345' };
        const userService = TestBed.inject(UserService);
        spyOn(userService, 'getUser').and.returnValue(of(mockUser));
        
        component.loadCurrentUser();
        
        expect(userService.getUser).toHaveBeenCalled();
    });

    it('should load basket', () => {
        const mockBasketId = '1';
        const basketService = TestBed.inject(BasketService);
        const storageService = TestBed.inject(StorageService);
      
        spyOn(storageService, 'getItem').and.returnValue(mockBasketId);
        spyOn(basketService, 'getBasket').and.returnValue(of(null));
      
        component.loadBasket();
      
        expect(storageService.getItem).toHaveBeenCalledWith('basket_id');
        expect(basketService.getBasket).toHaveBeenCalledWith(mockBasketId);
    });

    it('should load wishlist', () => {
        const wishlistService = TestBed.inject(WishlistService);
        const storageService = TestBed.inject(StorageService);
        const mockWishlistId = '1';
      
        spyOn(storageService, 'getItem').and.returnValue(mockWishlistId);
        spyOn(wishlistService, 'getWishlist').and.returnValue(of([productMock]));
      
        component.loadWishlist();
      
        expect(storageService.getItem).toHaveBeenCalledWith('wishlist_id');
        expect(wishlistService.getWishlist).toHaveBeenCalledWith(mockWishlistId);
      });
  
    it('should load product views history', () => {
      const historyService = TestBed.inject(HistoryService);
      spyOn(historyService, 'getHistory').and.returnValue(of([productMock]));
      component.loadProductViewsHistory();
      expect(historyService.getHistory).toHaveBeenCalled();
    });
  });