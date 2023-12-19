import {inject, Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import {AccountService} from "../../features/account/account.service";
import {map} from "rxjs/operators";
import { UserService } from '../../shared/services/user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  readonly #userService: UserService = inject(UserService);
  readonly #router: Router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    if (this.#userService.user()) {
      return true;
    } else {
      this.#router.navigate(['/']);
      this.#userService.toggleLoginFunction();
      return false;
    }
  }
}
 