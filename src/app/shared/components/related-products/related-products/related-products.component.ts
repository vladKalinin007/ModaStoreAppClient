import { Component, Input } from '@angular/core';
import {IProduct} from "../../../../core/models/product";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent {
  @Input() title: string;
  @Input() products$: Observable<IProduct[]>;
  @Input() category: string;
  @Input({required: true}) isLoading$: Observable<boolean> = of(true);
  @Input() type: string;
  @Input() quantity: string;
}
