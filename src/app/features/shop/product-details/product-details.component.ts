import {Component, OnInit, Signal, inject} from '@angular/core';
import {IProduct} from "../../../core/models/product";
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {BasketService} from "../../basket/basket.service";
import {HistoryService} from "../../../shared/services/history-service/history.service";
import {WishlistService} from "../../wishlist/wishlist.service";
import {Observable, map, startWith} from "rxjs";
import {IProductImage} from "../../../core/models/catalog/product-image";
import {IProductReview} from "../../../core/models/catalog/product-review";
import {IProductColor} from "../../../core/models/catalog/product-color.interface";
import {IProductSize} from "../../../core/models/catalog/product-size.interface";
import {SliderImage} from "../../../core/models/sliderImage";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user-service/user.service';
import { IUser } from 'src/app/core/models/user';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  readonly #shopService: ShopService = inject(ShopService);
  readonly #activateRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #basketService: BasketService = inject(BasketService);
  readonly #historyService: HistoryService = inject(HistoryService);
  readonly #wishlistService: WishlistService = inject(WishlistService);
  readonly #fb: FormBuilder = inject(FormBuilder);
  readonly #userService: UserService = inject(UserService);

  id: string;
  categoryName: string;

  product: IProduct;

  reviews: FormGroup;
  
  sliderImage: SliderImage[];
  productImages: IProductImage[];
  productReviews: IProductReview[];
  productColors: IProductColor[];
  productSizes: IProductSize[];

  currentUser: Signal<IUser>;
  relatedProducts$: Observable<IProduct[]>;
  productReviews$: Observable<IProductReview[]>;
  recentlyViewedProducts$: Observable<IProduct[]>;

  areRelatedProductsLoading$: Observable<boolean>;
  areRecentlyViewedProductsLoading$: Observable<boolean>;

  ratingValue: number = 5;
  sidebarVisible: boolean;

  constructor() {}

  ngOnInit(): void {
    this.scrollToTop();
    this.getProductById();
    this.getViewsHistory();
    this.getCurrentUser();
    this.createReviewForm();
  }

  getProductById() {
    const id : string = this.#activateRoute.snapshot.paramMap.get('id');
    this.#shopService.getProductById(id).subscribe({
      next: (response) => {
        this.product = response;
        this.getRelatedProducts();
        this.getReviews();
        this.toSliderImages();
        this.addProductToViewsHistory(response)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getRelatedProducts() {
    this.relatedProducts$ = this.#shopService.getRelatedProducts(this.product.relatedProducts);
    this.areRelatedProductsLoading$ = this.relatedProducts$.pipe(
      map(products => products ? false : true),
      startWith(true)
    );
  }

  getReviews() {
    this.#shopService.getReviewsForProduct(this.product.id).subscribe({
      next: (response) => {
        this.productReviews = response;
      },
    })
    this.productReviews$ = this.#shopService.productReviews$;
  }
 
  getCurrentUser() {
    this.currentUser = this.#userService.user;
  }

  createReviewForm() {
    this.reviews = this.#fb.group({
      rating: ["", Validators.required],
      comment: ["", Validators.required]
    });
  }

  createReview() {
    const review = this.reviews.value as IProductReview;

    if (this.currentUser()) {
      this.#userService.addUserReview(review, this.product).subscribe({
        next: (response) => {
          this.reviews.reset();
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      this.#userService.toggleLoginFunction();
    }
  }

  getViewsHistory() {
    this.recentlyViewedProducts$ = this.#historyService.product$;
    this.areRecentlyViewedProductsLoading$ = this.recentlyViewedProducts$.pipe(
      map(products => products ? false : true)
    );
  }


  toSliderImages() {
    this.sliderImage = this.product.pictures.map(picture => {
      return {
        previewImageSrc: picture,
        thumbnailImageSrc: picture,
        alt: 'alt',
        title: 'title'
      };
    });
  }

  addProductToViewsHistory(product: IProduct) {
    this.#historyService.updateHistory(product.id);
  }

  addProductToBasket() {
    this.#basketService.addItemToBasket(this.product);
  }

  addItemToWishList() {
    this.#wishlistService.addItemToWishlist(this.product);
  }

  getProductsFromViewsHistory(id: string) {
    this.#historyService.getHistory().subscribe({
      next: (response) => {
        console.log("getProductsFromViewsHistory.response =", response);
      },
      error: (error) => {
        console.log("getProductsFromViewsHistory.error =", error);
      }
    })

  }

  calculateDiscount(oldPrice: number, newPrice: number): string {
    const discount = ((oldPrice - newPrice) / oldPrice) * 100;
    return discount.toFixed(0) + '%';
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  isMobile(): boolean {
    return window.innerWidth <= 480;
  }

}
