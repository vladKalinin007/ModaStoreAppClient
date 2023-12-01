import {Component, EventEmitter, OnInit, Output, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class LoginComponent implements OnInit {
  readonly #toastrService = inject(ToastrService);
  readonly #messageService = inject(MessageService);
  readonly #dialogRef = inject(MatDialogRef<LoginComponent>);
  readonly #userService = inject(UserService);
  readonly #router = inject(Router);

  @Output() loginMode: EventEmitter<boolean> = new EventEmitter<boolean>();

  loginForm: FormGroup;
  errorMessage: string;
  errorVisible: boolean = false;
  
  constructor() {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(): void {
    this.#userService.loginUser(this.loginForm.value).subscribe({
      next: () => {
        this.#router.navigateByUrl('/');
        this.#dialogRef.close();
      },
      error: (error) => {
        console.log(error);
        this.errorVisible = true;
        setTimeout(() => this.errorVisible = false, 5000)
      }
    });
  }

  toggleLoginMode(): void {
    this.loginMode.emit(false);
  }
}
