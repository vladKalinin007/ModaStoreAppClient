import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Basket, IBasket, IBasketItem, IBasketTotals} from "../../core/models/basket";
import {map} from "rxjs/operators";
import {IProduct} from "../../core/models/product";
import {IDeliveryMethod} from "../../core/models/deliveryMethod";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  public baseUrl: string = environment.apiUrl;

  public basketSource: BehaviorSubject<IBasket> = new BehaviorSubject<IBasket>(null);
  public basket$: Observable<IBasket> = this.basketSource.asObservable();

  private basketTotalSource: BehaviorSubject<IBasketTotals> = new BehaviorSubject<IBasketTotals>(null);
  public basketTotal$: Observable<IBasketTotals> = this.basketTotalSource.asObservable();

  public shipping: number = 0;

  private shippingSource: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public shipping$ = this.shippingSource.asObservable();

  private http: HttpClient = inject(HttpClient);

  countBasketItems() {
    return this.basketSource.value.items.length;
  }


  createPaymentIntent() {
    return this.http.post(this.baseUrl + 'Payment/' + this.getCurrentBasketValue().id, {})
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          console.log(basket)
        })
      )
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shipping = deliveryMethod.price;
    this.shippingSource.next(this.shipping);
    const basket: IBasket = this.getCurrentBasketValue();
    basket.deliveryMethodId = deliveryMethod.id;
    basket.shippingPrice = deliveryMethod.price;
    this.calculateTotals();
    this.setBasket(basket);
  }

  getCurrentBasketValue(): IBasket {
    return this.basketSource.value;
  }

  getBasket(id: string) {
    const url: string = this.baseUrl + 'basket/' + id;

    return this.http.get(url)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          this.shipping = basket.shippingPrice;
          this.calculateTotals();
        })
      )
  }

  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + 'basket', basket)
      .subscribe({
        next: (response: IBasket) => {
          this.basketSource.next(response);
          this.calculateTotals();
        },
        error: error => {
          console.log(error);
        }
      })
  }

  addItemToBasket(item: IProduct, quantity: number = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  removeItemFromBasket(item: IBasketItem) {

    const basket: IBasket = this.getCurrentBasketValue();

    if (basket.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(i => i.id !== item.id);
      this.setBasket(basket);
    }
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  deleteLocalBasket(id: string) {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'Basket/' + basket.id)
      .subscribe({
        next: () => {
          console.log("BASKET TEST. basket.service.deleteBasket() called")
          localStorage.removeItem('basket_id');
          this.basketSource.next(null);
          this.basketTotalSource.next(null);
        },
        error: error => {
          console.log(error);
        }
      })
  }

  public calculateTotals() {
    const basket: IBasket = this.getCurrentBasketValue();
    const shipping: number = this.shipping;
    const subtotal: number = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total: number = subtotal + shipping;
    this.basketTotalSource.next({shipping, total, subtotal});
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[]  {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType,
    }
  }

}
