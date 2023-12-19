import { Injectable, inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  ISeenProductList,
  SeenProductList,
} from "../../../core/models/customer/seenProductList";
import {environment} from "../../../../environments/environment";
import {map, switchMap} from "rxjs/operators";
import {BehaviorSubject, forkJoin, Observable} from "rxjs";
import {IProduct} from "../../../core/models/product";
import { ProductService } from '../product-service/product.service';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  readonly #http: HttpClient = inject(HttpClient);
  readonly #productService: ProductService = inject(ProductService);

  BASE_URL: string = environment.apiUrl;
  #historySource: BehaviorSubject<ISeenProductList> = new BehaviorSubject<ISeenProductList>(null);
  history$ : Observable<ISeenProductList> = this.#historySource.asObservable();
  #productSource: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  product$ : Observable<IProduct[]> = this.#productSource.asObservable();

  constructor() { }

  createHistory(): ISeenProductList {
    const seenProductList: SeenProductList = new SeenProductList();
    localStorage.setItem('views_history_id', seenProductList.id);
    return seenProductList;
  }

  getHistory(): Observable<IProduct[]> {
  const id: string = localStorage.getItem('views_history_id');
  const URL: string = this.BASE_URL + 'seen-product/' + id;

  return this.#http.get<ISeenProductList>(URL)
    .pipe(
      switchMap((viewedProductsList) => {
          this.#historySource.next(viewedProductsList);
          const productsIds = viewedProductsList.seenProductsIds.map((id) => id);
          const productObservables = productsIds.map((productId) => this.#productService.getProduct(productId));
          const result: Observable<IProduct[]> = forkJoin(productObservables);
          return result.pipe(map(products => {
            this.#productSource.next(products);
            return products.reverse();
          }));
        }
      ));
  }
  

  setHistory() {
    const URL: string = this.BASE_URL + 'seen-product';
    const viewedProductList: ISeenProductList = this.#historySource.getValue();
    return this.#http.post(URL, viewedProductList).subscribe({
      next: (response) => {
        this.#historySource.next(response as ISeenProductList);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  updateHistory(id: string) {
    const currentHistory: ISeenProductList = this.#historySource.getValue();
    const seenProductList: ISeenProductList = currentHistory ?? this.createHistory();
    if (!seenProductList.seenProductsIds.includes(id)) {
      seenProductList.seenProductsIds.push(id);
      this.#historySource.next(seenProductList);
      this.setHistory();
    }
  }
}
