import { ICategory } from './../../core/models/category';
import {Injectable, inject} from '@angular/core';
import {Observable, map} from "rxjs";
import {CategoryService} from "../../core/services/category.service/category.service";
import { PictureService } from 'src/app/core/services/picture.service';
import { ProductService } from 'src/app/core/services/product.service/product.service';
import { HistoryService } from 'src/app/shared/services/history.service';
import { IProduct } from 'src/app/core/models/product';
import { ReviewService } from 'src/app/shared/services/review-service/review.service';
import { IProductReview } from 'src/app/core/models/catalog/product-review';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  readonly #categoryService = inject(CategoryService);
  readonly #pictureService = inject(PictureService);
  readonly #productService = inject(ProductService);
  readonly #historyService = inject(HistoryService);
  readonly #reviewService = inject(ReviewService);

  categories$: Observable<ICategory[]>;
  carouselPictures$: Observable<string[]>;
  bestsellerProducts$: Observable<IProduct[]>;
  newProducts$: Observable<IProduct[]>;
  onSaleProducts$: Observable<IProduct[]>;
  recentlyViewedProducs$: Observable<IProduct[]>;
  latestReviews$: Observable<IProductReview[]>; 

  constructor() {
    this.getCategories();
    this.getCarouselPictures();
    this.getBestsellers();
    this.getNewProducts();
    this.getOnSaleProducts();
    this.getRecentlyViewedProducts();
    this.getLatestReviews();
  }

  getCategories(): void {
    this.categories$ = this.#categoryService.categories$;
  }
  
  getCarouselPictures(): void {
    this.carouselPictures$ = this.#pictureService.carouselPictures$;
  }

  getBestsellers(): void {
    this.bestsellerProducts$ = this.#productService.getBestsellers(4).pipe(
      map(response => response.data)
    );
  }

  getNewProducts(): void {
    this.newProducts$ = this.#productService.getNewProducts(4).pipe(
      map(response => response.data)
    );
  }

  getOnSaleProducts(): void {
    this.onSaleProducts$ = this.#productService.getOnSaleProducts(4).pipe(
      map(response => response.data)
    );
  }

  getRecentlyViewedProducts(): void {
    this.recentlyViewedProducs$ = this.#historyService.product$;
  }

  getLatestReviews(): void {
    this.latestReviews$ = this.#reviewService.latestReviews$;
  }
}
