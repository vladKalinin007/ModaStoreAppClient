import {Component, Input} from '@angular/core';
import {IProduct} from "../../../core/models/product";
import {fastCascade} from "../../animations/fade-in.animation";
import {IOrderItem} from "../../../core/models/order";

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
})
export class ProductListItemComponent {

  @Input() product: IProduct;
  @Input() type: 'common' | 'checkout' | 'review';

  constructor() { }

  calculateDiscount(oldPrice: number, newPrice: number): string {
    const discount = ((oldPrice - newPrice) / oldPrice) * 100;
    return discount.toFixed(0) + '%';
  }

}
