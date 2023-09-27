import { Component } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {

  isLoginMode: boolean = true;

  constructor() { }

  changeLoginMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

}
