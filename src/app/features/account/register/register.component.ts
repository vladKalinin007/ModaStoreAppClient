import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AsyncValidatorFn, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {Router} from "@angular/router";
import {of, switchMap, timer} from "rxjs";
import {map} from "rxjs/operators";
import {MessageService} from "primeng/api";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  errors: string[] = [];
  registerForm: FormGroup;
  @Output() registerMode = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<RegisterComponent>,
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  toggleRegisterMode(): void {
    this.registerMode.emit(false);
  }

  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      displayName: ['', [Validators.required]],
      email: ['',
        [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        [this.validateEmailNottaken()]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
    })
  }

  onSubmit(): void {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        console.log("on submit work before ")
        this.router.navigateByUrl('/');
        this.closeDialog();
        console.log("on submit work after")
      },
      error: (error) => {
        console.log(error);
        this.errors = error.errors;
        console.log("On Submit doesn't work")
      }
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  validateEmailNottaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
              return res ? {emailExists: true} : null;
            })
          )
        }
      ))
    }
  }

}
