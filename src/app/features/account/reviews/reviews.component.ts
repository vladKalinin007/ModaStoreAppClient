import {Component, OnInit, inject} from '@angular/core';
import {AccountService} from "../account.service";
import {IProductReview} from "../../../core/models/catalog/product-review";
import {ReviewService} from "../../../shared/services/review-service/review.service";
import {ProductService} from "../../../core/services/product.service/product.service";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  readonly #reviewService = inject(ReviewService);

  isAccountReviewList: boolean = true;
  userReviews$: Observable<IProductReview[]>;

  constructor() { }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.#reviewService.getUserReviews().subscribe({
      next: (reviews: IProductReview[]) => {
        this.userReviews$ = of(reviews);
      }
    })
  }
}
