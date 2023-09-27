import {Component, Input, OnInit} from '@angular/core';
import {IProductReview} from "../../../core/models/catalog/product-review";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input() review: IProductReview;
  @Input() isFeaturedReview: boolean;
  @Input() isReviewList: boolean;
  @Input() rating: number;

  constructor() { }

  ngOnInit() {
    this.rating = this.review.rating;
  }
}
