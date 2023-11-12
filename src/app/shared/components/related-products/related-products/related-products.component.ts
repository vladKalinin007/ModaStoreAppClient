import {AfterViewInit, Component, Input, OnInit, signal} from '@angular/core';
import {ProductService} from "../../../../core/services/product.service/product.service";
import {IProduct} from "../../../../core/models/product";
import {ShopParams} from "../../../../core/models/shopParams";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  products$: Observable<IProduct[]>;

  @Input()
  category: string;

  @Input({required: true})
  isLoading$: Observable<boolean> = of(true);

  // shopParams: ShopParams = new ShopParams();

  // fourProducts: IProduct[];


  constructor(private productService: ProductService) {}

  ngOnInit() {}

}
