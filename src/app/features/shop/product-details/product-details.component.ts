import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../../core/models/product";
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbService} from "xng-breadcrumb";
import {BasketService} from "../../basket/basket.service";
import {ShopParams} from "../../../core/models/shopParams";
import {ProductService} from "../../../core/services/product.service/product.service";
import {HistoryService} from "../../../shared/services/history.service";

import {WishlistService} from "../../wishlist/wishlist.service";
import {Observable} from "rxjs";
import {ISeenProductList} from "../../../core/models/customer/seenProductList";
import {IProductImage} from "../../../core/models/catalog/product-image";
import {IProductReview} from "../../../core/models/catalog/product-review";
import {IProductColor} from "../../../core/models/catalog/product-color";
import {IProductSize} from "../../../core/models/catalog/product-size";
import {IProductRelated} from "../../../core/models/catalog/product-related";
import {SliderImage} from "../../../core/models/sliderImage";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  id: string;
  categoryName: string;
  product: IProduct;
  products: IProduct[];
  history$: Observable<ISeenProductList>
  sliderImage: SliderImage[];
  productImages: IProductImage[];
  productReviews: IProductReview[];
  productColors: IProductColor[];
  productSizes: IProductSize[];
  relatedProducts: IProductRelated[];

  shopParams: ShopParams = new ShopParams();
  ratingValue: number = 2;
  sidebarVisible: boolean;

  constructor(
    private shopService: ShopService,
    private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService,
    private productService: ProductService,
    private historyService: HistoryService,
    private wishlistService: WishlistService,
  ) {
    this.bcService.set('@productDetails', '');
  }

  ngOnInit(): void {
    this.getProductById();
    this.getProductList();
    this.history$ = this.historyService.history$;

  }

  getProductById() {
    const id : string = this.activateRoute.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe({
      next: (response) => {
        this.product = response;
        console.log("SIZES", this.product);
        this.toSliderImages();
        this.addProductToViewsHistory(response)
        this.bcService.set('@productDetails', this.product.name);
      },
      error: (error) => {
        console.log(error);
      }
    });
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

  addProductToViewsHistory(response: IProduct) {
    this.historyService.addItemToProductsViewsHistory(response);
  }

  addProductToBasket() {
    this.basketService.addItemToBasket(this.product);
  }

  addItemToWishList() {
    this.wishlistService.addItemToWishlist(this.product);
  }

  getProductsFromViewsHistory(id: string) {
    this.historyService.getItemsFromProductsViewsHistory().subscribe({
      next: (response) => {
        console.log("getProductsFromViewsHistory.response =", response);
      },
      error: (error) => {
        console.log("getProductsFromViewsHistory.error =", error);
      }
    })

  }

  getProductList() {
    this.productService
      .getProducts(this.shopParams)
      .subscribe({
        next: (response) => {
          this.products = response.data;
          console.log("Details.products =", this.products);

        },
        error: (error) => {
          console.log(error);
        }
      });
  }

}
