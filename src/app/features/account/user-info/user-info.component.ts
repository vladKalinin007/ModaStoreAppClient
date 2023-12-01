import {Component, OnInit, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  readonly #userService = inject(UserService);
  readonly #messageService = inject(MessageService);
  readonly #fb = inject(FormBuilder);

  customerForm: FormGroup;
  addressForm: FormGroup;
  userForm: FormGroup;

  constructor() { }
 
  ngOnInit(): void {
    this.createAddressForm();
    this.createUserForm();
    this.getAddressFormValues();
    this.getUserFormValues();
  }

  createUserForm() {
    this.userForm = this.#fb.group({
      displayName: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required]
    });
  }

  createAddressForm() {
    this.addressForm = this.#fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      street: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zipcode: [null, Validators.required],
    });
  }

  getAddressFormValues() {
    this.#userService
      .getAddress()
      .subscribe({
        next: address => {
          if (address) {
            this.addressForm.patchValue(address);
          }
        },
        error: err => {
          console.log(err);
        }
      });
  }

  getUserFormValues() {
    this.#userService
      .getUser()
      .subscribe({
        next: user => {
          if (user) {
            this.userForm.patchValue(user);
          }
        },
        error: err => {
          console.log(err);
        }
      });
  }

  updateAddressInfo() {
    this.#userService.updateAddress(this.addressForm.value)
      .subscribe({
          next: () => {
            this.#messageService.add({ severity: 'success', summary: 'Success', detail: 'Address saved' });
          },
          error: err => {
            this.#messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
          }
        }
      );
  }

  updateUser() {
    this.#userService.updateUser(this.userForm.value)
      .subscribe({
          next: () => {
            this.#messageService.add({ severity: 'success', summary: 'Success', detail: 'User saved' });
          },
          error: err => {
            this.#messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
          }
        }
      );
  }
}
