import {Component, Input, OnInit} from '@angular/core';
import {IBasket} from "../../../core/models/basket";
import {Observable} from "rxjs";
import {BasketService} from "../../basket/basket.service";
import {ToastrService} from "ngx-toastr";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {

  @Input() checkoutForm: FormGroup;

  basket$: Observable<IBasket>;

  constructor(
    private basketService: BasketService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  createPaymentIntent() {
    return this.basketService.createPaymentIntent()
      .subscribe({
      next: (response) => {
        this.toastr.success('Payment intent created');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.message);
      }
    })
  }


}
