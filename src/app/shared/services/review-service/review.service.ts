import { inject, Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IProductReview, IPublishReview} from "../../../core/models/catalog/product-review";
import {map} from "rxjs/operators";
import {BehaviorSubject, forkJoin, Observable} from "rxjs";
import {switchMap} from "rxjs/internal/operators/switchMap";
import { ProductService } from '../product-service/product.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  readonly #http = inject(HttpClient);
  readonly #productsService = inject(ProductService);

  BASE_URL: string = environment.apiUrl + 'reviews';

  userReviews$: Observable<IProductReview[]>;
  latestReviews$: Observable<IProductReview[]>; 
  
  #productReviewSource: BehaviorSubject<IProductReview[]> = new BehaviorSubject<IProductReview[]>(null);
  productReviews$ = this.#productReviewSource.asObservable();

  constructor() {
    this.#getLatestReviews();
  }

  getUserReviews() {
    return this.#http.get<IProductReview[]>(this.BASE_URL, {withCredentials: true});
  }

  #getLatestReviews() {
    this.latestReviews$ = this.#http.get<IProductReview[]>(this.BASE_URL + '/latest');
  }

  getReviewsForProduct(productId: string) {
    const url: string = this.BASE_URL + '/products/' + productId;
    return this.#http.get<IProductReview[]>(url).pipe(
      map(reviews => {
        this.#productReviewSource.next(reviews);
        return reviews;
      }
    ));
  }

  addUserReview(review: IProductReview) {
    const currentReviews = this.#productReviewSource.getValue();

    if (currentReviews.length === 0) {
      currentReviews.push(review);
      this.#productReviewSource.next(currentReviews);
    } else {
      const updatedReviews = [review,...currentReviews];
      this.#productReviewSource.next(updatedReviews);
    }

    const publishReview = {
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      productId: review.productId,
      userId: review.userId,
      createdOnUtc: review.createdOnUtc
    } as IPublishReview;

    return this.#http.post(this.BASE_URL, publishReview, { withCredentials: true });
  }

  deleteUserReview(id: string) {
    return this.#http.delete(this.BASE_URL + id);
  }
}
