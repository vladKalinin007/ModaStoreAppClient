import {Component, OnInit} from '@angular/core';
import {AccountService} from "../account.service";
import {Observable} from "rxjs";
import {IUser} from "../../../core/models/user";
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  currentUser$: Observable<IUser>;

  constructor(private accountService: AccountService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {

  }


  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout(): void {
    this.accountService.logout();
  }

  confirmLogout(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to log out?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('logout')
        /*this.logout();*/
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have successfully logged out.'});
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
}
