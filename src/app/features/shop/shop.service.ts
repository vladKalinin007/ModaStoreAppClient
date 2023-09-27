import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {IPagination} from "../../core/models/pagination";
import {IBrand} from "../../core/models/brand";
import {IType} from "../../core/models/productType";
import {map} from "rxjs/operators";
import {ShopParams} from "../../core/models/shopParams";
import {IProduct} from "../../core/models/product";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams): Observable<IPagination> {

    let params: HttpParams = new HttpParams();

    params = params.append('category', shopParams.category);

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

    return this.http.get<IPagination>(this.baseUrl + 'product', {observe: 'response', params}).pipe(map(response => {
        return response.body;
      })
    );
  }

  getProduct(id: string): Observable<IProduct>
  {
    return this.http.get<IProduct>(this.baseUrl + 'product/' + id);
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.baseUrl + 'productBrand');
  }

  getTypes(category: string): Observable<IType[]> {
    return this.http.get<IType[]>(this.baseUrl + 'ProductType/Category?key=' + category);
  }

  getCategories() {
    return this.http.get<IType[]>(this.baseUrl + 'category');
  }

}
