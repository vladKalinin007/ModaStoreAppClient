import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { AuthService } from "./auth.service";
import { IUser } from "../models/user";
import { ReviewService } from "src/app/shared/services/review-service/review.service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, concatMap, switchMap, tap } from "rxjs";
import { IRegister } from "../models/identity/register.interface";
import { ILogin } from "../models/identity/login.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly #authService = inject(AuthService);
    readonly #reviewService = inject(ReviewService);
    readonly #httpClient = inject(HttpClient);

    API_URL: string = environment.apiUrl + 'user';

    #user: WritableSignal<IUser> = signal<IUser>(null);
    user = this.#user.asReadonly();

    registerUser(user: any): Observable<IUser> {

        const registerForm = { 
            displayName: user.displayName,
            userName: user.email,
            email: user.email,
            phone: user.phone,
            password: user.password,
        } as IRegister;

        return this.#httpClient.post<IUser>(this.API_URL, registerForm).pipe(
            concatMap((response: IUser) => {
                if (response) {
                    return this.loginUser({ email: registerForm.email, password: registerForm.password });
                } else {
                    throw new Error('Registration failed');
                }
            }),
            concatMap((loginResponse: any) => {
                if (loginResponse) {
                    return this.getUser();
                } else {
                    throw new Error('Login failed');
                }
            })
        );
    }

    loginUser(user?: any): Observable<IUser> {
        const loginForm = { username: user.email, password: user.password } as ILogin;
        return this.#authService.login(loginForm).pipe(
            switchMap((response: any) => {
            if (response) return this.getUser();
            else throw new Error('Login failed');
        }),
        );
    }

    getUser(): Observable<IUser> {
        return this.#httpClient.get<IUser>(this.API_URL, { withCredentials: true }).pipe(
            tap((user: IUser) => {
                console.dir(user);
                this.#user.set(user);
            }),
        );
    }

    logoutUser(): Observable<Object> {
        return this.#authService.logout().pipe(
            tap(() => {
                this.#user.set(null);
            }),
        );
    }

    updateUser() {

    }

    deleteUser() {

    }

    getAddress() {

    }

    setAddress() {
            
    }

    updateAddress() {

    }

    deleteAddress() {

    }

    setReview() {
    }

    getReviews() {
    }

    checkEmailExists(email: string): Observable<Object> {
        return this.#httpClient.get(this.API_URL + '/check-email-exists/' + email);
    }
}
    