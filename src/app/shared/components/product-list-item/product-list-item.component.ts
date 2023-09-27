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

  constructor() { }

}
