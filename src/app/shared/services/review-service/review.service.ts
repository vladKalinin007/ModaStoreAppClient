import { Injectable } from '@angular/core';
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

  url: string = environment.apiUrl + 'User/Reviews';

  constructor(private http: HttpClient, private productsService: ProductService) { }

  getUserReviews(): Observable<IProductReview[]> {
    return this.http.get<IProductReview[]>(this.url).pipe(
      switchMap((reviews: IProductReview[]) => {
        const productObservables = reviews.map(review => {
          return this.productsService.getProduct(review.productId).pipe(
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

  getFeaturedReviews() {
    return this.http.get(this.url + '/featured');
  }

  addUserReview(review: IProductReview) {
    return this.http.post(this.url, review);
  }

  deleteUserReview(id: number) {
    return this.http.delete(this.url + '/' + id);
  }


}
