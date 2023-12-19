import {Component, Input, ViewEncapsulation, inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountService} from "../../account/account.service";
import {BasketService} from "../../basket/basket.service";
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/shared/services/user-service/user.service';

@Component({
  selector: 'app-checkout-user-info',
  templateUrl: './checkout-user-info.component.html',
  styleUrls: ['./checkout-user-info.component.scss'],
  providers: [MessageService],
})
export class CheckoutUserInfoComponent {
  readonly #userService = inject(UserService);
  readonly #messageService = inject(MessageService);

  @Input() checkoutForm: FormGroup;

  constructor() { }

  updateUserInfo() {
    this.#userService.updateAddress(this.checkoutForm.get('addressForm').value).subscribe({
      next: () => {
        this.#messageService.add({ severity: 'success', summary: 'Success', detail: 'Address saved' });
      },
      error: err => {
        this.#messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      }
    });
  }
}
