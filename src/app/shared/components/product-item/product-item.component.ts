import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {IProduct} from "../../../core/models/product";
import {BasketService} from "../../../features/basket/basket.service";
import {WishlistService} from "../../../features/wishlist/wishlist.service";
import {IWishlistItem} from "../../../core/models/customer/wishlistItem";
import {ActivatedRoute, Router} from "@angular/router";
import {IProductColor} from "../../../core/models/catalog/product-color.interface";
import {IProductImage} from "../../../core/models/catalog/product-image";
import {Observable, of} from "rxjs";
import { map } from 'rxjs/operators';
import { IProductSize } from 'src/app/core/models/catalog/product-size.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;
  @Input() isFavoritesIconVisible: boolean = true;
  @Input() isCaptionVisible: boolean;
  isWishlistItem: boolean;
  @Input() categoryName: string;
  @Output() productClicked: EventEmitter<string> = new EventEmitter<string>();

  wishedProducts$: Observable<IProduct[]>;

  productColors: IProductColor[];
  productImages: string[];
  productSizes: IProductSize[];
  imageIndex: number = 0;

  id: string;

  constructor(
    private basketService: BasketService,
    private wishlistService: WishlistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.decomposeProduct();
    this.wishedProducts$ = this.wishlistService.products$;
    this.onWishlistProductChanged();
  }

  decomposeProduct() {
    this.productImages = this.product.pictures;
    this.productColors = this.product.colors;
    this.productSizes = this.product.sizes;
  }

  onWishlistProductChanged(): void {
    this.wishedProducts$.subscribe(products => {
      let product: IProduct = products.find(p => p.id === this.product.id);

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
