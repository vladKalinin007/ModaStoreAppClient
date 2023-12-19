import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {IBasket} from "../../../core/models/basket";
import {BasketService} from "../../../features/basket/basket.service";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public baseUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private basketService: BasketService,
  ) { }


  createPaymentIntent() {
    return this.http.post(this.baseUrl + 'payment/' + this.basketService.getCurrentBasketValue().id, {})
      .pipe(
        map((basket: IBasket) => {
          this.basketService.basketSource.next(basket);
          console.log(basket)
        })
      )
  }
}
