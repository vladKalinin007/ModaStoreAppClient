import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  ISeenProductList,
  SeenProductList,
} from "../../core/models/customer/seenProductList";
import {environment} from "../../../environments/environment";
import {map, switchMap} from "rxjs/operators";
import {BehaviorSubject, forkJoin, Observable} from "rxjs";
import {ISeenProduct} from "../../core/models/customer/seen-product";
import {IProduct} from "../../core/models/product";
import {ProductService} from "../../core/services/product.service/product.service";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  public baseUrl: string = environment.apiUrl;
  public historySource: BehaviorSubject<ISeenProductList> = new BehaviorSubject<ISeenProductList>(null);
  public history$ : Observable<ISeenProductList> = this.historySource.asObservable();
  public _productSource: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  public product$ : Observable<IProduct[]> = this._productSource.asObservable();

  constructor(private http: HttpClient, private productService: ProductService) { }

  createLocalProductsViewsHistoryId() {
    const seenProductList: SeenProductList = new SeenProductList();
    localStorage.setItem('views_history_id', seenProductList.id);
    return seenProductList;
  }

  deleteLocalProductsViewsHistoryId(id: string) {
    localStorage.removeItem('views_history_id');
  }

  getItemsFromProductsViewsHistory(): Observable<IProduct[]> {

    const id = localStorage.getItem('views_history_id');

    const url = this.baseUrl + 'SeenProduct/' + id;


    return this.http.get<ISeenProductList>(url)
      .pipe(
        switchMap((viewedProductsList) => {
            this.historySource.next(viewedProductsList);
            const productsIds = viewedProductsList.seenProducts.map((product) => product.id);
            console.log("HistoryService. products ids: ", productsIds)
            const productObservables = productsIds.map((productId) => this.productService.getProduct(productId));
            console.log("HistoryService. product observables: ", productObservables)

            const result: Observable<IProduct[]> = forkJoin(productObservables);
            console.log("HistoryService. result: ", result)
            result.subscribe(products => {
              console.log("HistoryService. products: ", products)
              this._productSource.next(products);

            });

            return result;
          }
        ));
  }

  setProductsViewsHistory(seenProductList: ISeenProductList) {
    const url: string = this.baseUrl + 'SeenProduct';
    return this.http.post(url, seenProductList).subscribe((response: ISeenProductList) => {
      this.historySource.next(response);
    }, error => {
      console.log(error);
    });
  }

  addItemToProductsViewsHistory(product: IProduct) {
    const seenProduct: ISeenProduct = this.toViewedProduct(product);
    const seenProductList: ISeenProductList = this.getCurrentProductsViewsHistoryValue() ?? this.createLocalProductsViewsHistoryId();
    seenProductList.seenProducts = this.addOrUpdateViewedProducts(seenProductList.seenProducts, seenProduct);
    this.setProductsViewsHistory(seenProductList);
  }

  addOrUpdateViewedProducts(viewedProducts: ISeenProduct[], viewedProduct: ISeenProduct): ISeenProduct[] {
    const index = viewedProducts.findIndex((item: ISeenProduct) => item.id === viewedProduct.id);
    if (index === -1) {
      viewedProducts.push(viewedProduct);
    } else {
      viewedProducts[index] = viewedProduct;
    }
    return viewedProducts;
  }


  toViewedProduct(product: IProduct): ISeenProduct {
    return { ...product };
  }

  getCurrentProductsViewsHistoryValue(): ISeenProductList {
    return this.historySource.value;
  }
}
