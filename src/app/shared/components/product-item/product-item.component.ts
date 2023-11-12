import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {IProduct} from "../../../core/models/product";
import {BasketService} from "../../../features/basket/basket.service";
import {WishlistService} from "../../../features/wishlist/wishlist.service";
import {IWishlistItem} from "../../../core/models/customer/wishlistItem";
import {ActivatedRoute, Router} from "@angular/router";
import {IProductColor} from "../../../core/models/catalog/product-color";
import {IProductImage} from "../../../core/models/catalog/product-image";
import {Observable, of} from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() _product$: Observable<IProduct>;
  @Input() product: IProduct;
  @Input() isFavoritesIconVisible: boolean = true;
  @Input() isCaptionVisible: boolean;
  isWishlistItem: boolean;
  @Input() categoryName: string;
  @Output() productClicked: EventEmitter<string> = new EventEmitter<string>();

  wishedProducts$: Observable<IProduct[]>;

  productColors: IProductColor[];
  _productColors$: Observable<IProductColor[]>;
  productImages: IProductImage[];
  _productImages$: Observable<IProductImage[]>;
  imageIndex: number = 0;

  id: string;

  constructor(
    private basketService: BasketService,
    private wishlistService: WishlistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.productColors = this.product.colors;
    this._productColors$ = this._product$.pipe(
      map(product => product.colors)
    );
    this.productImages = this.product.pictures;
    this._productImages$ = this._product$.pipe(
      map(product => product.pictures)
    );
    this.wishedProducts$ = this.wishlistService.products$;
    console.log("WISHLIST IN PRODUCT ITEM:", this.wishedProducts$);
    this.onWishlistProductChanged();
  }

  onWishlistProductChanged(): void {
    this.wishedProducts$.subscribe(products => {
      let product: IProduct = products.find(p => p.id === this.product.id);

      console.log("WISHLIST FOR COMPONENT RESULT. product:", product);

      if (product) {
        this.product.isInWishlist = true;
      } else {
        this.product.isInWishlist = false;
      }
    }
    );
  }

  onProductClicked(productId: string) {
    let categoryName: string = this.activatedRoute.snapshot.paramMap.get('categoryName');

    if (categoryName === '') {
      categoryName = this.categoryName;
    }

    this.router.navigate(['shop', categoryName, productId]);
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product);
  }

  addItemToWishlist() {
    this.wishlistService.addItemToWishlist(this.product);
    console.log("ADD WISHLIST ITEM. this.product:", this.product);
  }

  removeItemFromWishlist() {
    console.log("REMOVE WISHLIST ITEM (COMPONENT). this.product:", this.product);
    this.wishlistService.removeItemFromWishlist(this.product);
  }

  setImageIndex(index: number) {
    this.imageIndex = index;
  }

}
