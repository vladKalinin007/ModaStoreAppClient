import {Component, Input, OnInit} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
 /* imports: [NgIf, MatSidenavModule],
  standalone: true*/
})
export class UserInfoComponent implements OnInit {

  checkoutForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressFormValues();
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, Validators.required],
      })
    });
  }

  getAddressFormValues() {
    this.accountService
      .getUserAddress()
      .subscribe({
        next: address => {
          if (address) {
            this.checkoutForm.get('addressForm').patchValue(address);
          }
        },
        error: err => {
          console.log(err);
        }
      });
  }

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
