import { inject, Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IProductReview} from "../../../core/models/catalog/product-review";
import {ProductService} from "../../../core/services/product.service/product.service";
import {map} from "rxjs/operators";
import {forkJoin, Observable} from "rxjs";
import {switchMap} from "rxjs/internal/operators/switchMap";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  readonly #http = inject(HttpClient);
  readonly #productsService = inject(ProductService);

  BASE_URL: string = environment.apiUrl + 'reviews';

  userReviews$: Observable<IProductReview[]>;
  latestReviews$: Observable<IProductReview[]>; 

  constructor() {
    this.#getUserReviews();
    this.#getLatestReviews();
  }

  #getUserReviews(): void {
    this.userReviews$ = this.#http.get<IProductReview[]>(this.BASE_URL).pipe(
      switchMap((reviews: IProductReview[]) => {
        const productObservables = reviews.map(review => {
          return this.#productsService.getProduct(review.productId).pipe(
            map(product => {
              review.productName = product.name;
              review.pictureUrl = product.pictureUrl;
              return review;
            })
          );
        });
        return forkJoin(productObservables);
      })
    );
  }

  #getLatestReviews() {
    this.latestReviews$ = this.#http.get<IProductReview[]>(this.BASE_URL + '/latest');
    console.log(`review service, latestReviews$: ${this.latestReviews$}`)
    console.log(`STEP ONE`);
  }

  addUserReview(review: IProductReview) {
    return this.#http.post(this.BASE_URL, review);
  }

  deleteUserReview(id: number) {
    return this.#http.delete(this.BASE_URL + id);
  }
}
