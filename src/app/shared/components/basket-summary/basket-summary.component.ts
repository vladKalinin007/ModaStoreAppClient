import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BasketService} from "../../../features/basket/basket.service";
import {IBasket, IBasketItem} from "../../../core/models/basket";
import {Observable} from "rxjs";
import {IOrderItem} from "../../../core/models/order";
import {ISeenProduct} from "../../../core/models/customer/seen-product";

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {

  basket$: Observable<IBasket> = this.basketService.basket$;

  @Output() decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Input() isBasket: boolean = true;
  @Input() items: IBasketItem[] | IOrderItem[] | ISeenProduct[];
  @Input() isOrder: boolean = false;
  @Input() AmountInfoHidden: boolean;


  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  public decrementItemQuantity(item: IBasketItem) {
    this.decrement.emit(item);
  }

  public incrementItemQuantity(item: IBasketItem) {
    this.increment.emit(item);
  }

  removeBasketItem(item: IBasketItem) {
    this.remove.emit(item);
  }

}
