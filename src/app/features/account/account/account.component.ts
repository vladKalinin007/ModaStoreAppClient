import {Component, OnInit, Signal} from '@angular/core';
import {AccountService} from "../account.service";
import {IUser} from "../../../core/models/user";
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import {inject} from "@angular/core";
import { UserService } from 'src/app/shared/services/user-service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AccountComponent implements OnInit {

  readonly #userService: UserService = inject(UserService);
  readonly #accountService: AccountService = inject(AccountService);
  readonly #router = inject(Router);
  private confirmationService: ConfirmationService = inject(ConfirmationService);
  private messageService: MessageService = inject(MessageService);

  public currentUser: Signal<IUser>;

  isAccountVisible: boolean = false;

  constructor() {
    this.#accountService.toggleAccountFunction = this.changeAccounVisibility.bind(this);
  }

  ngOnInit(): void {
    this.currentUser = this.#userService.user;
    this.scrollToTop();
  }

  logout(): void {
    this.#userService.logoutUser().subscribe({
      next: () => {
        this.#router.navigateByUrl('/');
      },
      error: error => console.log(error)
    });

  }

  confirmLogout(): void {

    this.confirmationService.confirm({
    message: 'Are you sure you want to logout?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',

    accept: () => {
      this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have successfully logged out.'});
      this.logout();
    },

    reject: (type: any) => {
      switch (type) {
        case ConfirmEventType.REJECT:
          this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
          break;
        case ConfirmEventType.CANCEL:
          this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
          break;
      }
    }
    });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  changeAccounVisibility(): void {
    this.isAccountVisible = !this.isAccountVisible;
  }
}
