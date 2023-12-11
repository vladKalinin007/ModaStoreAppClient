import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {IPagination} from "../../core/models/pagination";
import {IBrand} from "../../core/models/brand";
import {IType} from "../../core/models/productType";
import {map} from "rxjs/operators";
import {ShopParams} from "../../core/models/shopParams";
import {IProduct} from "../../core/models/product";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable, of} from "rxjs";
import { ProductService } from 'src/app/core/services/product.service/product.service';
import { ReviewService } from 'src/app/shared/services/review-service/review.service';
import { IProductReview } from 'src/app/core/models/catalog/product-review';
import { IProductSize } from 'src/app/core/models/catalog/product-size.interface';
import { IProductColor } from 'src/app/core/models/catalog/product-color.interface';
import { IProductAttribute } from 'src/app/core/models/catalog/product-attribute.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  readonly #productService: ProductService = inject(ProductService);
  readonly #reviewService: ReviewService = inject(ReviewService);

  products$: Observable<IProduct[]>;
  brands$: Observable<IBrand[]>;
  types$: Observable<IType[]>;

  isMenuVisible$ = new BehaviorSubject<boolean>(false);

  isMenuVisible: boolean;

  baseUrl: string = environment.apiUrl;

  productReviews$: Observable<IProductReview[]>;

  constructor(private http: HttpClient) { 
    this.productReviews$ = this.#reviewService.productReviews$;
    this.getBrands();
  }

  getProducts(shopParams: ShopParams){

    let params: HttpParams = new HttpParams();

    if (shopParams.category) {
      if (shopParams.category.includes('bestsellers') || 
          shopParams.category.includes('new') || 
          shopParams.category.includes('sale')) {
        switch (shopParams.category) {
          case 'bestsellers':
            params = params.append('isBestSeller', 'true');
            break;
          case 'new':
            params = params.append('isNew', 'true');
            break;
          case 'sale':
            params = params.append('isOnSale', 'true');
            break;
        }
      } else {
        params = params.append('category', shopParams.category);
      }
    }

    if (shopParams.brandId) {
      params = params.append('brandId', shopParams.brandId);
    }

    if (shopParams.typeId) {
      params = params.append('typeId', shopParams.typeId);
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    if (shopParams.colorId) {
      params = params.append('colorId', shopParams.colorId);
    }

    if (shopParams.sizeId) {
      params = params.append('sizeId', shopParams.sizeId);
    }

    if (shopParams.material) {
      params = params.append('material', shopParams.material);
    }

    if (shopParams.season) {
      params = params.append('season', shopParams.season);
    }

    if (shopParams.pattern) {
      params = params.append('pattern', shopParams.pattern);
    }


    if (shopParams.price) {
      params = params.append('price', shopParams.price);
    }

    if (shopParams.minPrice && shopParams.maxPrice) {
      params = params.append('minPrice', shopParams.minPrice);
      params = params.append('maxPrice', shopParams.maxPrice);
    }

    if (shopParams.style) {
      params = params.append('style', shopParams.style);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    console.log(params)

    return this.http.get<IPagination<IProduct>>(this.baseUrl + 'products', {observe: 'response', params}).pipe(map(response => {
        return response.body;
      })
    );
  }

  getRelatedProducts(ids: string[]): Observable<IProduct[]> {
    return this.#productService.getRelatedProducts(ids);
  }

  getProductById(id: string): Observable<IProduct> {
    return this.#productService.getProduct(id);
  }

  getProduct(id: string): Observable<IProduct>
  {
    return this.http.get<IProduct>(this.baseUrl + 'product/' + id);
  }

  getReviewsForProduct(productId: string): Observable<IProductReview[]> {
    return this.#reviewService.getReviewsForProduct(productId);
  }

  getBrands() {
    this.brands$ = this.http.get<IBrand[]>(this.baseUrl + 'productBrands');
  }

  getTypes(name: string): Observable<IType[]> {
    return this.http.get<IType[]>(this.baseUrl + 'productTypes/category/' + name);
  }

  getSizes(name: string): Observable<IProductSize[]> {
    return this.#productService.getSizes(name);
  }

  getColors(name: string): Observable<IProductColor[]> {
    return this.#productService.getColors(name);
  }

  getAttributes(name: string): Observable<IProductAttribute> {
    return this.#productService.getAttributes(name);
  }

  toggleSideBarVisibilityFunction: () => void;

}
