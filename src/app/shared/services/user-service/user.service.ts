import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { AuthService } from "../../../core/services/auth-service/auth.service";
import { IUser } from "../../../core/models/user";
import { ReviewService } from "src/app/shared/services/review-service/review.service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, concatMap, switchMap, tap } from "rxjs";
import { IRegister } from "../../../core/models/identity/register.interface";
import { ILogin } from "../../../core/models/identity/login.interface";
import { IAddress } from "../../../core/models/address";
import { IProductReview, IPublishReview } from "../../../core/models/catalog/product-review";
import { v4 as uuid } from 'uuid';
import { IProduct } from "../../../core/models/product";


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

    toggleLoginFunction: () => void;

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

    logoutUser(): Observable<Object> {
        return this.#authService.logout().pipe(
            tap(() => {
                this.#user.set(null);
            }),
        );
    }

    getUser(): Observable<IUser> {
        return this.#httpClient.get<IUser>(this.API_URL, { withCredentials: true }).pipe(
            tap((user: IUser) => {
                this.#user.set(user);
            }),
        );
    }

    updateUser(user: any) {
        console.dir(user);
        return this.#httpClient.put<IUser>(this.API_URL, user, { withCredentials: true });
    }

    deleteUser() {

    }

    getAddress() {
        return this.#httpClient.get<IAddress>(this.API_URL + '/address', { withCredentials: true });
    }

    setAddress() {
            
    }

    updateAddress(address: IAddress) {
        return this.#httpClient.put<IAddress>(this.API_URL + '/address', address, { withCredentials: true });
    }

    deleteAddress() {

    }

    addUserReview(review: IProductReview, product: IProduct) {
        const productReview = {
            id: uuid(),
            rating: review.rating || 5,
            comment: review.comment,
            userId: this.user().id,
            productId: product.id,
            createdOnUtc: new Date(),
            productName: product.name,
            userName: this.user().displayName,
            pictureUrl: product.pictures[0],
        } as IProductReview;
        
        return this.#reviewService.addUserReview(productReview);
    }

    getReviews() {
    }

    checkEmailExists(email: string): Observable<Object> {
        return this.#httpClient.get(this.API_URL + '/check-email-exists/' + email);
    }
}
    