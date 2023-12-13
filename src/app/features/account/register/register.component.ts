import { AuthenticationComponent } from './../components/authentication/authentication.component';
import {Component, EventEmitter, OnInit, Output, inject} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {of, switchMap, timer} from "rxjs";
import {map} from "rxjs/operators";
import {MatDialogRef} from "@angular/material/dialog";
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #router = inject(Router);
  readonly #userService = inject(UserService);
  readonly #toastrService = inject(ToastrService);
  readonly #dialogRef: MatDialogRef<AuthenticationComponent> = inject(MatDialogRef);
  
  @Output() registerMode = new EventEmitter<boolean>();

  registerForm: FormGroup;
  
  ngOnInit(): void {
    this.createRegisterForm();
  }

  toggleRegisterMode(): void {
    this.registerMode.emit(false);
  }

  createRegisterForm(): void {
    this.registerForm = this.#fb.group({ 
      displayName: [
        '', 
        [Validators.required]
      ],
      email: [
        '',
        [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        [this.validateEmailNottaken()]
      ],
      phone: [
        '', 
        // [Validators.required, Validators.pattern('0-9')]
      ],
      password: [
        '', 
        [Validators.required, Validators.minLength(4), Validators.maxLength(15)]
      ]
    })
  }

  onSubmit(): void {
    this.#userService.registerUser(this.registerForm.value).subscribe({
      next: () => {
        this.#router.navigateByUrl('/');
        this.closeDialog();
      },
      error: (error) => {
        console.log(error);
        this.#toastrService.error(
          'Registration Failed',
          error.error);
      }
    })
  }

  closeDialog(): void {
    this.#dialogRef.close();
  }

  validateEmailNottaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.#userService.checkEmailExists(control.value).pipe(
            map(res => {
              return res ? {emailExists: true} : null;
            })
          )
        }
      ))
    }
  }

}
