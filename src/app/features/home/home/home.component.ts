import {ChangeDetectionStrategy, Component, OnInit, inject} from '@angular/core';
import {IProduct} from "../../../core/models/product";
import {ICategory} from "../../../core/models/category";
import {HomeService} from "../home.service";
import {cascade, fadeIn} from "../../../shared/animations/fade-in.animation";
import {Observable, map, startWith} from "rxjs";
import { HomeModule } from '../home.module';
import { IProductReview } from 'src/app/core/models/catalog/product-review';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HomeModule],
  animations: [fadeIn, cascade]
})
export class HomeComponent implements OnInit {
  readonly #homeService = inject(HomeService);

  carouselPictures$: Observable<string[]>;
  categories$: Observable<ICategory[]>;
  productBestsellers$: Observable<IProduct[]>;
  productNew$: Observable<IProduct[]>;
  productOnSale$: Observable<IProduct[]>;
  recentlyViewedProducts$: Observable<IProduct[]>;
  latestReviews$: Observable<IProductReview[]>; 

  areBestsellersLoading$: Observable<boolean>;
  areNewProductsLoading$: Observable<boolean>;
  areOnSaleProductsLoading$: Observable<boolean>;
  areRecentlyViewedProductsLoading$: Observable<boolean>;
  areCategoriesLoading$: Observable<boolean>;
  areImagesLoading$: Observable<boolean>;
  areReviewsLoading$: Observable<boolean>;

  ngOnInit(): void {
    this.getCarouselPictures();
    this.getCategories();
    this.getRecentlyViewedProducts()
    this.getNewProducts();
    this.getBestSellersProducts();
    this.getOnSaleProducts();
    this.getLatestReviews();
  }

  getCategories(): void {
    this.categories$ = this.#homeService.categories$;
    this.areCategoriesLoading$ = this.categories$.pipe(
      map(categories => categories && categories.length > 0 ? false : true),
      startWith(true)
    );
  }

  getBestSellersProducts(): void {
    this.productBestsellers$ = this.#homeService.bestsellerProducts$;
    this.areBestsellersLoading$ = this.productBestsellers$.pipe(
      map(products => products ? false : true),
      startWith(true)
    );
  }

  getOnSaleProducts(): void {
    this.productOnSale$ = this.#homeService.onSaleProducts$;
    this.areOnSaleProductsLoading$ = this.productOnSale$.pipe(
      map(products => products ? false : true),
      startWith(true)
    );
  }

  getNewProducts(): void {
    this.productNew$ = this.#homeService.newProducts$;
    this.areNewProductsLoading$ = this.productNew$.pipe(
      map(products => products ? false : true),
      startWith(true)
    );
  }

  getRecentlyViewedProducts(): void {
    this.recentlyViewedProducts$ = this.#homeService.recentlyViewedProducs$;
    this.areRecentlyViewedProductsLoading$ = this.recentlyViewedProducts$.pipe(
      map(products => products ? false : true)
    );
  }

  getLatestReviews(): void {
    this.latestReviews$ = this.#homeService.latestReviews$;
    this.areReviewsLoading$ = this.latestReviews$.pipe(
      map(reviews => reviews && reviews.length > 0 ? false : true),
      startWith(true)
    );
  }

  getCarouselPictures(): void {
    this.carouselPictures$ = this.#homeService.carouselPictures$;
    this.areImagesLoading$ = this.carouselPictures$.pipe(
      map(pictures => pictures && pictures.length > 0 ? false : true),
      startWith(true)
    );
  } 
}


