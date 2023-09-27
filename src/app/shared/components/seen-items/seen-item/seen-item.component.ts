import {Component, Input} from '@angular/core';
import {IProduct} from "../../../../core/models/product";
import {ISeenProductList} from "../../../../core/models/customer/seenProductList";
import {ISeenProduct} from "../../../../core/models/customer/seen-product";


@Component({
  selector: 'app-seen-item',
  templateUrl: './seen-item.component.html',
  styleUrls: ['./seen-item.component.scss']
})
export class SeenItemComponent {

  @Input() seenProduct: ISeenProduct;

  constructor() { }

}
