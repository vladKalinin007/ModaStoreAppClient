import {Injectable, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IWishlist, Wishlist} from "../../core/models/customer/wishlist";
import {BehaviorSubject, Observable} from "rxjs";
import {IWishlistItem} from "../../core/models/customer/wishlistItem";
import {IProduct} from "../../core/models/product";
import { ProductService } from '../../core/services/product.service/product.service';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  readonly #http: HttpClient = inject(HttpClient);
  readonly #productService: ProductService = inject(ProductService);
  readonly #storageService: StorageService = inject(StorageService);
  
  readonly #baseUrl: string = environment.apiUrl;

  readonly #products$ = new BehaviorSubject<IProduct[]>([]);
  readonly #wishlist$ = new BehaviorSubject<IWishlist>(null);

  wishlist$: Observable<IWishlist> = this.#wishlist$.asObservable();
  products$: Observable<IProduct[]> = this.#products$.asObservable();


  constructor() {
      const wishlistId: string = this.#storageService.getItem('wishlist_id');

      if (wishlistId) {

        this.getWishlist(wishlistId)
        .subscribe({
          next: (response: IProduct[]) => {
            this.#products$.next(response);
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      }
  }

  addProductToWishlist(product: IProduct) {
    const currentProducts = this.#products$.value;
    const isInWishlist = currentProducts.some(item => item.id === product.id);

    if (!isInWishlist) {
      this.#products$.next([...currentProducts, product]);
    }
  }

  removeProductFromWishlist(product: IProduct) {
    const currentProducts: IProduct[] = this.#products$.value;
    const isInWishlist: boolean = currentProducts.some(item => item.id === product.id);

    if (isInWishlist) {
      const updatedProducts: IProduct[] = currentProducts.filter(item => item.id !== product.id);
      const wishlistId: string = localStorage.getItem('wishlist_id');
      const url: string = this.#baseUrl + 'wishlist/' + wishlistId;
      this.#http.put(url, updatedProducts);
      this.#products$.next(updatedProducts);
    }
  }


  isInWishlist(productsToCheck: IProduct[]): IProduct[] {
    const currentProducts = this.#products$.value;
    const products = productsToCheck.map(product => {
      const isInWishlist = currentProducts.some(item => item.id === product.id);
      return {...product, isInWishlist};
    });
    this.#products$.next(products);
    return products;
  }

  wishlistedProducts(productsToCheck: IProduct[]) {
    const currentProducts = this.getCurrentProductsValue();
    const products = productsToCheck.map(product => {
      const isInWishlist = currentProducts.some(item => item.id === product.id);
      return {...product, isInWishlist};
    });
    this.#products$.next(products);
  }

  inWishlist(id: string): boolean {
    const currentProducts = this.#products$.value;
    const isInWishlist = currentProducts.some(item => item.id === id);
    return isInWishlist;
  }


  getCurrentWishlistValue(): IWishlist {
    return this.#wishlist$.value;
  }

  getCurrentProductsValue(): IProduct[] {
    return this.#products$.value;
  }

  createLocalWishlist(): IWishlist {
    const wishlist = new Wishlist();
    localStorage.setItem('wishlist_id', wishlist.id);
    return wishlist;
  } 

  deleteLocalWishlist(id: string) {
    this.#products$.next(null);
    localStorage.removeItem('wishlist_id');
  }


  getWishlist(id: string) {
    const url: string = this.#baseUrl + 'wishlist/' + id;
    return this.#http.get<IWishlist>(url)
    .pipe(
      switchMap(wishlist => {
        this.#wishlist$.next(wishlist);
        const productIds: string[] = wishlist.wishlistItems.map(item => item.id);
        const productObservables = productIds.map(productId =>
          this.#productService.getProduct(productId)
        );
        return forkJoin(productObservables);
      })
    );

  }

  addItemToWishlist(product: IProduct) {
    const currentProducts = this.#products$.value;
    const isInWishlist = currentProducts.some(item => item.id === product.id);

    if (!isInWishlist) {
      this.#products$.next([...currentProducts, product]);
    }

    const wishlistItem: IWishlistItem = this.toWishlistItem(product);
    const wishlist: IWishlist = this.getCurrentWishlistValue() ?? this.createLocalWishlist();
    wishlist.wishlistItems = this.addOrUpdateWishlistItems(wishlist.wishlistItems, wishlistItem);
    this.setWishlist(wishlist);
  }

  removeItemFromWishlist(product: IProduct) {

    const newProducts = this.#products$.value.filter(item => item.id !== product.id);
    this.#products$.next(newProducts);

    const wishlist: IWishlist = this.getCurrentWishlistValue();
    const wishlistItem: IWishlistItem = wishlist.wishlistItems.find(item => item.id === product.id);
    wishlist.wishlistItems = wishlist.wishlistItems.filter(item => item.id !== product.id);

    this.setWishlist(wishlist);
  }


  private addOrUpdateWishlistItems(wishlistItems: IWishlistItem[], wishlistItem: IWishlistItem): IWishlistItem[] {
  const index = wishlistItems.findIndex((item: IWishlistItem) => item.id === wishlistItem.id);

    if (index === -1) {
      wishlistItems.push(wishlistItem);
    } else {
      wishlistItems[index] = wishlistItem; // update
    }

    return wishlistItems;
  }


  toWishlistItem(item: IProduct): IWishlistItem {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      pictureUrl: item.pictureUrl,
      productType: item.productType,
      productBrand: item.productBrand
    }
  }

  setWishlist(wishlist: IWishlist) {
    const url = this.#baseUrl + 'wishlist';
    return this.#http.post(url, wishlist)
    .subscribe({
      next: (response: IWishlist) => {
        this.#wishlist$.next(response);
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }


  // deleteWishlist(id: string) {
  //   return this.#http.delete(this.#baseUrl + 'wishlist?id=' + id);
  // }

  // getWishlistItems(id: string) {
  //   return this.#http.get(this.#baseUrl + 'wishlist/items?id=' + id);
  // }

  // getWishlistItemCount(id: string) {
  //   return this.#http.get(this.#baseUrl + 'wishlist/count?id=' + id);
  // }


  // checkWishlistItemExists(id: string, productId: number) {
  //   return this.#http.get(this.#baseUrl + 'wishlist/exists?id=' + id + '&productId=' + productId);
  // }


}
