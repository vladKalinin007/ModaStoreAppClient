import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HistoryService } from './history.service';
import { ProductService } from '../../core/services/product.service/product.service';
import { BehaviorSubject } from 'rxjs';
import {ISeenProduct} from "../../core/models/customer/seen-product";
import {ISeenProductList} from "../../core/models/customer/seenProductList";
import {IProduct} from "../../core/models/product";

describe('HistoryService', () => {
  let historyService: HistoryService;
  let httpMock: HttpTestingController;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HistoryService,
        ProductService
      ]
    });

    historyService = TestBed.inject(HistoryService);
    httpMock = TestBed.inject(HttpTestingController);
    productService = TestBed.inject(ProductService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(historyService).toBeTruthy();
  });

  it('should create a local products views history id', () => {
    const seenProductList: ISeenProductList = historyService.createLocalProductsViewsHistoryId();
    expect(seenProductList).toBeTruthy();
    expect(localStorage.getItem('views_history_id')).toEqual(seenProductList.id);
  });

  it('should delete a local products views history id', () => {
    localStorage.setItem('views_history_id', 'test-id');
    historyService.deleteLocalProductsViewsHistoryId('test-id');
    expect(localStorage.getItem('views_history_id')).toBeFalsy();
  });

  it('should get items from products views history', () => {
    const seenProductList: ISeenProductList = {
      id: 'test-id',
      seenProducts: [
        {
          id: '1',
          name: 'Product 1',
          description: 'Description 1',
          price: 10,
          pictureUrl: 'url1',
          productType: 'type1',
          productBrand: 'brand1'
        },
        {
          id: '2',
          name: 'Product 2',
          description: 'Description 2',
          price: 20,
          pictureUrl: 'url2',
          productType: 'type2',
          productBrand: 'brand2'
        }
      ]
    };
    spyOn(historyService.historySource, 'next');
    spyOn(productService, 'getProduct').and.returnValue(new BehaviorSubject<IProduct>(null).asObservable());
    historyService.getItemsFromProductsViewsHistory().subscribe((products: IProduct[]) => {
      expect(products.length).toEqual(2);
      expect(historyService.historySource.next).toHaveBeenCalledWith(seenProductList);
      expect(productService.getProduct).toHaveBeenCalledTimes(2);
    });
    const req = httpMock.expectOne(`${historyService.baseUrl}SeenProduct/test-id`);
    expect(req.request.method).toBe('GET');
    req.flush(seenProductList);
  });

  it('should set products views history', () => {
    const seenProductList: ISeenProductList = {
      id: 'test-id',
      seenProducts: [
        {
          id: '1',
          name: 'Product 1',
          description: 'Description 1',
          price: 10,
          pictureUrl: 'url1',
          productType: 'type1',
          productBrand: 'brand1'
        },
        {
          id: '2',
          name: 'Product 2',
          description: 'Description 2',
          price: 20,
          pictureUrl: 'url2',
          productType: 'type2',
          productBrand: 'brand2'
        }
      ]
    };
    spyOn(historyService.historySource, 'next');
    historyService.setProductsViewsHistory(seenProductList);
    const req = httpMock.expectOne(`${historyService.baseUrl}SeenProduct`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(seenProductList);
    req.flush(seenProductList);
    expect(historyService.historySource.next).toHaveBeenCalledWith(seenProductList);
  });

  it('should add item to products views history', () => {
    const product: IProduct = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      shortDescription: 'Short description 1',
      price: 10,
      oldPrice: 0,
      specialPrice: 0,
      discountPercentage: 0,
      stockQuantity: 10,
      displayOrder: 0,
      pictureUrl: 'url1',
      productType: 'type1',
      productBrand: 'brand1',
      isBestSeller: false,
      isNew: false,
      category: 'category1',
      color: 'color1',
      season: 'season1',
      material: 'material1',
      style: 'style1',
      pattern: 'pattern1',
      occasion: 'occasion1',
      sleeve: 'sleeve1',
      neckline: 'neckline1',
      dressLength: 'dressLength1',
      waistline: 'waistline1',
      silhouette: 'silhouette1',
      decoration: 'decoration1',
      closureType: 'closureType1',
      pantClosureType: 'pantClosureType1',
      pantLength: 'pantLength1',
      pantStyle: 'pantStyle1',
      fitType: 'fitType1',
      colors: [],
      pictures: [],
      reviews: [],
      sizes: [],
      relatedProducts: [],
      isInWishlist: false
    };
    const seenProductList: ISeenProductList = {
      id: 'test-id',
      seenProducts: [
        {
          id: '1',
          name: 'Product 1',
          description: 'Description 1',
          price: 10,
          pictureUrl: 'url1',
          productType: 'type1',
          productBrand: 'brand1'
        }
      ]
    };
    spyOn(historyService, 'getCurrentProductsViewsHistoryValue').and.returnValue(seenProductList);
    spyOn(historyService, 'setProductsViewsHistory');
    historyService.addItemToProductsViewsHistory(product);
    expect(historyService.getCurrentProductsViewsHistoryValue).toHaveBeenCalled();
    expect(historyService.setProductsViewsHistory).toHaveBeenCalledWith(seenProductList);
  });

  it('should add or update viewed products', () => {
    const viewedProducts: ISeenProduct[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        price: 10,
        pictureUrl: 'url1',
        productType: 'type1',
        productBrand: 'brand1'
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        price: 20,
        pictureUrl: 'url2',
        productType: 'type2',
        productBrand: 'brand2'
      }
    ];
    const viewedProduct: ISeenProduct = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      pictureUrl: 'url1',
      productType: 'type1',
      productBrand: 'brand1'
    };
    const result: ISeenProduct[] = historyService.addOrUpdateViewedProducts(viewedProducts, viewedProduct);
    expect(result.length).toEqual(2);
    expect(result[0]).toEqual(viewedProduct);
    expect(result[1]).toEqual(viewedProducts[1]);
  });

  it('should convert product to viewed product', () => {
    const product: IProduct = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      shortDescription: 'Short description 1',
      price: 10,
      oldPrice: 0,
      specialPrice: 0,
      discountPercentage: 0,
      stockQuantity: 10,
      displayOrder: 0,
      pictureUrl: 'url1',
      productType: 'type1',
      productBrand: 'brand1',
      isBestSeller: false,
      isNew: false,
      category: 'category1',
      color: 'color1',
      season: 'season1',
      material: 'material1',
      style: 'style1',
      pattern: 'pattern1',
      occasion: 'occasion1',
      sleeve: 'sleeve1',
      neckline: 'neckline1',
      dressLength: 'dressLength1',
      waistline: 'waistline1',
      silhouette: 'silhouette1',
      decoration: 'decoration1',
      closureType: 'closureType1',
      pantClosureType: 'pantClosureType1',
      pantLength: 'pantLength1',
      pantStyle: 'pantStyle1',
      fitType: 'fitType1',
      colors: [],
      pictures: [],
      reviews: [],
      sizes: [],
      relatedProducts: [],
      isInWishlist: false
    };
    const result: ISeenProduct = historyService.toViewedProduct(product);
    expect(result).toEqual({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      pictureUrl: 'url1',
      productType: 'type1',
      productBrand: 'brand1'
    });
  });

  it('should get current products views history value', () => {
    const seenProductList: ISeenProductList = {
      id: 'test-id',
      seenProducts: [
        {
          id: '1',
          name: 'Product 1',
          description: 'Description 1',
          price: 10,
          pictureUrl: 'url1',
          productType: 'type1',
          productBrand: 'brand1'
        }
      ]
    };
    historyService.historySource.next(seenProductList);
    const result: ISeenProductList = historyService.getCurrentProductsViewsHistoryValue();
    expect(result).toEqual(seenProductList);
  });
});
