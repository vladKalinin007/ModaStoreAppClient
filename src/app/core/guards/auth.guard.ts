import {inject, Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from "../../features/account/account.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  private _accountService: AccountService = inject(AccountService);
  private _router: Router = inject(Router);

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> {
  //   return this.accountService.currentUser$.pipe(
  //     map(auth => {
  //       if (auth) {
  //         return true;
  //       }
  //       this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
  //     })
  //   );
  // }

}
