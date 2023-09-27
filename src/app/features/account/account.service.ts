import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, of, ReplaySubject} from "rxjs";
import {IUser} from "../../core/models/user";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {IAddress} from "../../core/models/address";
import {IProductReview} from "../../core/models/catalog/product-review";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl: string = environment.apiUrl;
  // private _currentUserSource: ReplaySubject<IUser> = new ReplaySubject<IUser>(1);
  private _currentUserSource: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
  public currentUser$: Observable<IUser> = this._currentUserSource.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    // this.getUser();
  }

  // getUser(){
  //   console.log("getUser() called");
  //   this.httpClient.get<IUser>(this.baseUrl + 'User').subscribe({
  //     next: (user: IUser) => {
  //       if (user) {
  //         console.log("getUser() user", user);
  //         this._currentUserSource.next(user);
  //         console.log("getUser() currentUser$ in method", this.currentUser$);
  //       }
  //     },
  //     error: (error: any) => {
  //       console.log("getUser() ERROR LOADING USER")
  //       console.log(error);
  //     }
  //   })
  // }


  loadCurrentUser(token: string) {
    if (token === null) {
      this._currentUserSource.next(null);
      return of(null);
    }

    // отправляем запрос к API для получения данных пользователя
    return this.httpClient.get(this.baseUrl + 'User').pipe(
      map((user: IUser) => {
        if (user) {
          this._currentUserSource.next(user);
          console.log("currentUser$ in method", this.currentUser$);
        }
      })
    );
  }

  login(values: any) {
    return this.httpClient.post(this.baseUrl + 'authentication/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          this._currentUserSource.next(user);
          localStorage.setItem('token', user.token);
        }
      }
    ));
  }

  logout(): void {
    this._currentUserSource.next(null);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  register(values: any) {
    return this.httpClient.post(this.baseUrl + 'authentication/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          this._currentUserSource.next(user);
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
