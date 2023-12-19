import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable, forkJoin} from "rxjs";
import { ShopParams } from 'src/app/core/models/shopParams';
import { IPagination } from 'src/app/core/models/pagination';
import { IProduct } from 'src/app/core/models/product';
import { IBrand } from 'src/app/core/models/brand';
import { IType } from 'src/app/core/models/productType';
import { IProductSize } from 'src/app/core/models/catalog/product-size.interface';
import { IProductColor } from 'src/app/core/models/catalog/product-color.interface';
import { IProductAttribute } from 'src/app/core/models/catalog/product-attribute.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BASE_URL: string = environment.apiUrl + 'products';

  constructor(private http: HttpClient) { }

  getProducts(shopParams?: ShopParams) {

    let params = new HttpParams();

    params = shopParams?.brandId ? params.append('brandId', shopParams.brandId) : params;
    params = shopParams?.typeId ? params.append('typeId', shopParams.typeId) : params;
    params = shopParams?.search ? params.append('search', shopParams.search) : params;

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    const options = { observe: 'response' as const, params };

    return this.http.get<IPagination<IProduct>>(this.BASE_URL, options).pipe(
      map(response => response.body)
    );
  }

  getBestsellers(quantity?: number) {
    let params: HttpParams = new HttpParams();
    params = params.append('isBestseller', 'true');
    if (quantity) params = params.append('pageSize', quantity.toString());
    const options = { observe: 'response' as const, params };
    return this.http.get<IPagination<IProduct>>(this.BASE_URL, options).pipe(
      map(response => response.body)
    );
  }

  getNewProducts(quantity?: number) {
    let params: HttpParams = new HttpParams();
    params = params.append('isNew', 'true');
    if (quantity) params = params.append('pageSize', quantity.toString());
    const options = { observe: 'response' as const, params };
    return this.http.get<IPagination<IProduct>>(this.BASE_URL, options).pipe(
      map(response => response.body)
    );
  }

  getOnSaleProducts(quantity?: number) {
    let params: HttpParams = new HttpParams();
    params = params.append('isOnSale', 'true');
    if (quantity) params = params.append('pageSize', quantity.toString());
    const options = { observe: 'response' as const, params };
    return this.http.get<IPagination<IProduct>>(this.BASE_URL, options).pipe(
      map(response => response.body)
    );
  }

  getProduct(id: string) {
    const url: string = `${this.BASE_URL}` + `?id=${id}`;
    console.log(`CHECK URL: ${url}`)
    return this.http.get<IPagination<IProduct>>(url).pipe(
      map(response => response.data[0])
    );
  }

  getRelatedProducts(ids: string[]): Observable<IProduct[]> {
    const requests = ids.map(id => this.getProduct(id));
    return forkJoin(requests);
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.BASE_URL + 'productBrand/');
  }

  getTypes() {
    return this.http.get<IType[]>(this.BASE_URL + 'productType/');
  }

  getProductsByCategory(categoryName: string): Observable<IProduct[]> {
    const url: string = `${this.BASE_URL}products?categoryName=${categoryName}`;
    console.log("it works")
    return this.http.get<IProduct[]>(url);
  }

  getSizes(category: string): Observable<IProductSize[]> {
    return this.http.get<IProductSize[]>(this.BASE_URL + '/sizes/' + category);
  }

  getColors(category: string): Observable<IProductColor[]> {
    return this.http.get<IProductColor[]>(this.BASE_URL + '/colors/' + category);
  }

  getAttributes(category: string): Observable<IProductAttribute> {
    return this.http.get<IProductAttribute>(this.BASE_URL + '/attributes/' + category);
  }

  getFeaturedProducts(type: string, quantity: string): Observable<IProduct[]> {
    let params = new HttpParams();
    if (type && type === 'Bestsellers') {
      params = params.append('isBestseller', 'true');
      params = params.append('pageSize', quantity);
    }
    if (type && type === 'New') {
      params = params.append('isNew', 'true');
      params = params.append('pageSize', quantity);
    }
    if (type && type === 'OnSale') {
      params = params.append('isOnSale', 'true');
      params = params.append('pageSize', quantity);
    }
    const options = { observe: 'response' as const, params };
    return this.http.get<IProduct[]>(this.BASE_URL, options).pipe(
      map(response => response.body)
    );
  }
}
