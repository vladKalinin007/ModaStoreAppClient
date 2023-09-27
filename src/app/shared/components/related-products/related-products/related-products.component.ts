import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../../../core/services/product.service/product.service";
import {IProduct} from "../../../../core/models/product";
import {ShopParams} from "../../../../core/models/shopParams";

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  products: IProduct[];

  @Input()
  category: string;

  shopParams: ShopParams = new ShopParams();

  fourProducts: IProduct[];


  constructor(private productService: ProductService) {

  }

  ngOnInit() {
    /*this.getProducts();*/
  }

  getProducts() {
    this.productService.getProducts(this.shopParams)
      .subscribe({
        next: (response) => {
          this.products = response.data;
          this.fourProducts = this.products.slice(0, 4);

        },
        error: (error) => {
          console.log("NO PRODUCT FOR CAROUSEL");
          console.log(error);
        }
      });
  }



}
