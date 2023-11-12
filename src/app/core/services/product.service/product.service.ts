import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ShopParams} from "../../models/shopParams";
import {IPagination} from "../../models/pagination";
import {map} from "rxjs/operators";
import {IProduct} from "../../models/product";
import {IBrand} from "../../models/brand";
import {IType} from "../../models/productType";
import {Observable} from "rxjs";
import {IProductColor} from "../../models/catalog/product-color";
import {IProductSize} from "../../models/catalog/product-size";
import {IProductAttribute} from "../../models/catalog/i-product-attribute";

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

  getBestsellers() {
    let params: HttpParams = new HttpParams();
    params = params.append('isBestseller', 'true');
    const options = { observe: 'response' as const, params };
    return this.http.get<IPagination<IProduct>>(this.BASE_URL, options).pipe(
      map(response => response.body)
    );
  }

  getNewProducts() {
    let params: HttpParams = new HttpParams();
    params = params.append('isNew', 'true');
    const options = { observe: 'response' as const, params };
    return this.http.get<IPagination<IProduct>>(this.BASE_URL, options).pipe(
      map(response => response.body)
    );
  }

  getOnSaleProducts() {
    let params: HttpParams = new HttpParams();
    params = params.append('isOnSale', 'true');
    const options = { observe: 'response' as const, params };
    return this.http.get<IPagination<IProduct>>(this.BASE_URL, options).pipe(
      map(response => response.body)
    );
  }

  getProduct(id: string) {
    return this.http.get<IProduct>(this.BASE_URL).pipe(
      map(response => response[0])
    );
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

  getSizes(): Observable<IProductSize[]> {
    return this.http.get<IProductSize[]>(this.BASE_URL + '/sizes');
  }

  getColors(): Observable<IProductColor[]> {
    return this.http.get<IProductColor[]>(this.BASE_URL + '/colors');
  }

  getAttributes(): Observable<IProductAttribute> {
    return this.http.get<IProductAttribute>(this.BASE_URL + '/attributes');
  }
}
