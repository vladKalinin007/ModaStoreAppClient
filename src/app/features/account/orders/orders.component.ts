import {Component, OnInit} from '@angular/core';
import {IOrder} from "../../../core/models/order";
import {OrderService} from "../../../shared/services/order-service/order.service";
import {ProductService} from "../../../core/services/product.service/product.service";
import {IProduct} from "../../../core/models/product";
import {Observable} from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: IOrder[] = [];
  orderedProducts: IProduct[] = [];

  constructor(private orderService: OrderService, private productService: ProductService) {

  }

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe({
      next: (orders: IOrder[]) => {
        this.orders = orders;
        this.getOrderedProducts(orders[0]);
        console.log("orders for account", this.orders);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getOrderedProducts(order: IOrder)  {
    order.orderItems.forEach((item) => {
      console.log("ORDER-item-id", item.id)
      console.log("ORDER-item-productid", item.productId)
      this.productService.getProduct(item.id).subscribe({
        next: (product: IProduct) => {
          console.log("ORDER-product", product)
          this.orderedProducts.push(product);
          console.log("this ordered products", this.orderedProducts);
        },
        error: (error) => {
          console.log(error);
        }
      })
    })

  }
}
