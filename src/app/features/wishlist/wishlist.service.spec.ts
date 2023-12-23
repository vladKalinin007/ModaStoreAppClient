import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WishlistService } from './wishlist.service';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/shared/services/product-service/product.service';
import { StorageService } from 'src/app/core/services/storage-service/storage.service';
import { productMock } from 'src/app/shared/mocks/product.mock';
import { IWishlist } from 'src/app/core/models/customer/wishlist';
import { IProduct } from 'src/app/core/models/product';
import { of } from 'rxjs';


describe('WishlistService', () => {
  let service: WishlistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WishlistService, ProductService, StorageService]
    });

    service = TestBed.inject(WishlistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product to wishlist if not already in', () => {
    service.addProductToWishlist(productMock);
    expect(service.getCurrentProductsValue()).toContain(productMock);
  });
  
  it('should not add product to wishlist if already in', () => {
    service.addProductToWishlist(productMock);
    const initialProducts = service.getCurrentProductsValue();
    service.addProductToWishlist(productMock);
    expect(service.getCurrentProductsValue()).toEqual(initialProducts);
  });

});