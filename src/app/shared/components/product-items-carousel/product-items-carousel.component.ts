import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IProduct} from "../../../core/models/product";
import {ProductService} from "../../../core/services/product.service/product.service";
import {ShopParams} from "../../../core/models/shopParams";
import {IPagination} from "../../../core/models/pagination";

@Component({
  selector: 'app-product-items-carousel',
  templateUrl: './product-items-carousel.component.html',
  styleUrls: ['./product-items-carousel.component.scss']
})
export class ProductItemsCarouselComponent implements OnInit {

  /*products: IProduct[];*/
  @Input() products: IProduct[];
  heading: string;
  shopParams: ShopParams = new ShopParams();
  totalCount: number;
  @ViewChild('search', {static: false}) searchTerm: ElementRef;

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.shopParams)
      .subscribe({
        next: (response: IPagination<IProduct>) => {
          this.products = response.data;

        },
        error: (error) => {
          console.log(error);
        }
      });
  }
}
