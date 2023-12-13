import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {IUser} from "../../core/models/user";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {IAddress} from "../../core/models/address";
import {IProductReview} from "../../core/models/catalog/product-review";
import { ReviewService } from 'src/app/shared/services/review-service/review.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private httpClient: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  readonly #reviewService = inject(ReviewService)

  userReviews$: Observable<IProductReview[]>;

  BASE_URL: string = environment.apiUrl;

  public _currentUser: WritableSignal<IUser> = signal<IUser>(null);

  loadCurrentUser(token: string) {

    if (token === null) {
      this._currentUser.set(null);
      return of(null);
    }

    return this.httpClient.get(this.BASE_URL + 'User').pipe(
      map((user: IUser) => {
        if (user) {
          this._currentUser.set(user);
        }
      })
    );
  }

  login(values: any) {
    return this.httpClient.post(this.BASE_URL + 'authentication/login', values).pipe(
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
    return this.httpClient.post(this.BASE_URL + 'authentication/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          this._currentUser.set(user);
          localStorage.setItem('token', user.token);
        }
      }
    ));
  }

  checkEmailExists(email: string) {
    return this.httpClient.get(this.BASE_URL + 'User/Emailexists?email=' + email);
  }

  getUserAddress(): Observable<IAddress> {
    return this.httpClient.get<IAddress>(this.BASE_URL + 'User/Address');
  }

  updateUserAddress(address: IAddress): Observable<IAddress> {
    return this.httpClient.put<IAddress>(this.BASE_URL + 'User/Address', address);
  }

  createUserAddress(address: IAddress): Observable<IAddress> {
    return this.httpClient.post<IAddress>(this.BASE_URL + 'account/address', address);
  }

  getUserReviews(): void {
    this.userReviews$ = this.httpClient.get<IProductReview[]>(this.BASE_URL + 'reviews');
  }

  toggleAccountFunction: () => void;
}
