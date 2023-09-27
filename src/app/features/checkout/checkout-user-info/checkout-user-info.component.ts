import {Component, Input, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountService} from "../../account/account.service";
import {BasketService} from "../../basket/basket.service";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-checkout-user-info',
  templateUrl: './checkout-user-info.component.html',
  styleUrls: ['./checkout-user-info.component.scss'],
  /*encapsulation: ViewEncapsulation.Emulated*/
})
export class CheckoutUserInfoComponent {

  @Input() checkoutForm: FormGroup;

  constructor(private accountService: AccountService,
              private messageService: MessageService,
  ) { }

  updateUserInfo() {
    this.accountService.updateUserAddress(this.checkoutForm.get('addressForm').value)
      .subscribe({
          next: () => {
            /*this.toastr.success('Address saved');*/
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Address saved' });
            console.log("saveUserAddress() SAVED")
          },
          error: err => {
            /*this.toastr.error(err.message);*/
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
            /*console.log(err);*/
            console.log("saveUserAddress() NOT SAVED")
          }
        }
      );
  }

}
