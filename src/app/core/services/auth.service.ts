import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { ILogin } from "../models/identity/login.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly #httpClient: HttpClient = inject(HttpClient);

    API_URL: string = environment.apiUrl + 'authentication/';

    constructor() {}

    login(loginInfo: ILogin): Observable<Object> {
        return this.#httpClient.post(this.API_URL + 'login', loginInfo, { withCredentials: true });
    }

    logout(): Observable<Object> {
        return this.#httpClient.post(this.API_URL + 'logout', {}, { withCredentials: true });
    }
}