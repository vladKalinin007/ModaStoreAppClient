import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {IUser} from "../../core/models/user";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {IAddress} from "../../core/models/address";
import {IProductReview} from "../../core/models/catalog/product-review";


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private httpClient: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private baseUrl: string = environment.apiUrl;

  public _currentUser: WritableSignal<IUser> = signal<IUser>(null);

  loadCurrentUser(token: string) {

    if (token === null) {
      this._currentUser.set(null);
      return of(null);
    }

    return this.httpClient.get(this.baseUrl + 'User').pipe(
      map((user: IUser) => {
        if (user) {
          this._currentUser.set(user);
        }
      })
    );
  }

  login(values: any) {
    return this.httpClient.post(this.baseUrl + 'authentication/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          this._currentUser.set(user);
          localStorage.setItem('token', user.token);
        }
      }
    ));
  }

  logout(): void {
    this._currentUser.set(null);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  register(values: any) {
    return this.httpClient.post(this.baseUrl + 'authentication/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          this._currentUser.set(user);
          localStorage.setItem('token', user.token);
        }
      }
    ));
  }

  checkEmailExists(email: string) {
    return this.httpClient.get(this.baseUrl + 'User/Emailexists?email=' + email);
  }

  getUserAddress(): Observable<IAddress> {
    return this.httpClient.get<IAddress>(this.baseUrl + 'User/Address');
  }

  updateUserAddress(address: IAddress): Observable<IAddress> {
    return this.httpClient.put<IAddress>(this.baseUrl + 'User/Address', address);
  }

  createUserAddress(address: IAddress): Observable<IAddress> {
    return this.httpClient.post<IAddress>(this.baseUrl + 'account/address', address);
  }

  getUserReviews(): Observable<IProductReview[]> {
    return this.httpClient.get<IProductReview[]>(this.baseUrl + 'User/Reviews');
  }
}
