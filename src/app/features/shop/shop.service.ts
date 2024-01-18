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
import { ReviewService } from 'src/app/shared/services/review-service/review.service';
import { IProductReview } from 'src/app/core/models/catalog/product-review';
import { IProductSize } from 'src/app/core/models/catalog/product-size.interface';
import { IProductColor } from 'src/app/core/models/catalog/product-color.interface';
import { IProductAttribute } from 'src/app/core/models/catalog/product-attribute.interface';
import { ProductService } from 'src/app/shared/services/product-service/product.service';

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

  getProducts(shopParams: ShopParams): Observable<IPagination<IProduct>>{
    return this.#productService.getProducts(shopParams);
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

  toggleMenuFunction: () => void;

}
