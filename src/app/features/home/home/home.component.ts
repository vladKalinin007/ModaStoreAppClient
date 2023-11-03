import {Component, OnInit, inject, signal} from '@angular/core';

import {IProduct} from "../../../core/models/product";
import {ICategory} from "../../../core/models/category";
import {ShopParams} from "../../../core/models/shopParams";
import {IProductImage} from "../../../core/models/catalog/product-image";
import {ISeenProductList} from "../../../core/models/customer/seenProductList";

import {ProductService} from "../../../core/services/product.service/product.service";
import {PictureService} from "../../../core/services/picture.service";
import {HistoryService} from "../../../shared/services/history.service";
import {WishlistService} from "../../wishlist/wishlist.service";
import {HomeService} from "../home.service";

import {cascade, fadeIn} from "../../../shared/animations/fade-in.animation";
import {Observable} from "rxjs";




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeIn,
    cascade
  ]
})
export class HomeComponent implements OnInit {

  private readonly _pictureService = inject(PictureService);
  private readonly _homeService = inject(HomeService);
  private readonly _productService = inject(ProductService);
  private readonly _historyService = inject(HistoryService);
  private readonly _wishlistService = inject(WishlistService);

  products: IProduct[];
  newProducts: IProduct[];
  bestSellersProducts: IProduct[]
  onSaleProducts: IProduct[];
  productImage: IProductImage[];
  product: IProduct;
  categories: ICategory[];

  isLoading: boolean = true;

  wishedProducts$: Observable<IProduct[]>;
  history$: Observable<ISeenProductList>
  seenProducts$: Observable<IProduct[]>;

  areBestsellersLoading = signal(true);
  areNewProductsLoading$: Observable<boolean>;
  areOnSaleProductsLoading = signal(true);
  areRecentlyViewedProductsLoading = signal(true);
  areCategoriesLoading = signal(true);
  areImagesLoading = signal(true);

  shopParams: ShopParams = new ShopParams();

  ngOnInit() {
    this.getCarouselPictures();
    this.loadProduct();
    this.getCategories();
    this.getRecentlyViewedProducts()
    this.getNewProducts();
    this.getBestSellersProducts();
    this.getOnSaleProducts();
  }

  getCategories() {
    this._homeService.getCategories()
      .subscribe(categories => {
      this.categories = categories;
      this.areCategoriesLoading.set(false);
    });
  }

  getProducts() {
    this._productService.getProducts(this.shopParams)
      .subscribe({
        next: (response) => {
          this.products = response.data;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  getBestSellersProducts(): void {
    this._productService.getBestsellers()
      .subscribe({
        next: (response) => {
          this.bestSellersProducts = response.data;
          this.areBestsellersLoading.set(false);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  getOnSaleProducts(): void {
    this._productService.getOnSaleProducts()
      .subscribe({
        next: (response) => {
          this.onSaleProducts = response.data;
          this.areOnSaleProductsLoading.set(false);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  getNewProducts(): void {
    this._productService.getNewProducts()
      .subscribe({
        next: (response) => {
          this.newProducts = response.data;
          // this.areNewProductsLoading.set(false);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  private markWishlistibility(products: IProduct[]): IProduct[] {
    return this._wishlistService.isInWishlist(products);
  }

  loadProduct() {
    this._productService.getProduct("87c12f75-8176-4ea9-8ee4-a117a2a27d1e").subscribe({
      next: (response) => {
        this.product = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getRecentlyViewedProducts() {
    this.history$ = this._historyService.history$;
    this.seenProducts$ = this._historyService.product$;
    this.areRecentlyViewedProductsLoading.set(false);
  }


  getCarouselPictures() {
    this._pictureService.getCarouselPictures().subscribe({
      next: (response: IProductImage[]) => {
        this.productImage = response;
        this.areImagesLoading.set(false);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}


